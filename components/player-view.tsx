"use client";

import { Button } from "@/components/ui/buttons";
import { wantToAnswerAction } from "@/lib/actions/buzzer";
import { AnsweringEvent, PusherEvents } from "@/lib/pusher/events";

import Pusher from "pusher-js";
import { useEffect, useState, useTransition } from "react";
import { FlexColumn } from "./ui/flex";
import { Heading } from "./ui/heading";
import { PlayerCard } from "./ui/player-card";

export type PlayerViewProps = {
  playerName: string;
  score: number;
  gameId: string;
  initialAnswering: string | null;
};

const PUSHER_APP_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY!;

export const PlayerView = (props: PlayerViewProps) => {
  const { playerName, gameId, initialAnswering } = props;

  const [_isPending, startTransition] = useTransition();
  const [answering, setAnswering] = useState(initialAnswering);
  console.log("Rendering player view");

  useEffect(() => {
    console.log("Creating pusher instance");
    const pusher = new Pusher(PUSHER_APP_KEY, {
      cluster: "eu",
    });

    const channel = pusher.subscribe(gameId);
    channel.bind(PusherEvents.ANSWERING, function (data: AnsweringEvent) {
      setAnswering(data.playerName);
    });

    channel.bind(PusherEvents.CLEAR_ANSWERING, function (data: AnsweringEvent) {
      setAnswering("");
    });

    return () => {
      pusher.unsubscribe(gameId);
    };
  }, [gameId]);

  const answer = () => {
    startTransition(() => {
      wantToAnswerAction(gameId, playerName);
    });
  };

  return (
    <FlexColumn>
      <PlayerCard playerName={playerName} score={props.score} />
      {answering ? (
        <Button disabled>{answering} is answering</Button>
      ) : (
        <Button onClick={answer}>
          <Heading>Answer</Heading>
        </Button>
      )}
    </FlexColumn>
  );
};
