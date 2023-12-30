"use client";

import { Button } from "@/components/ui/buttons";
import { wantToAnswerAction } from "@/lib/actions/buzzer";
import {
  AnsweringEvent,
  ClearAnsweringEvent,
  PusherEvents,
  ScoreChangedEvent,
} from "@/lib/pusher/events";

import { Loading } from "@/components/ui/icons/loading";
import Pusher from "pusher-js";
import { useEffect, useState, useTransition } from "react";
import { FlexColumn, FlexRow } from "./ui/flex";
import { Heading, HeadingGray } from "./ui/heading";
import { PlayerCard } from "./ui/player-card";

export type PlayerViewProps = {
  playerName: string;
  score: number;
  gameId: string;
  initialAnswering: string | null;
};

const PUSHER_APP_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY!;

export const PlayerView = (props: PlayerViewProps) => {
  const { playerName, gameId, initialAnswering, score: initialScore } = props;

  const [_isPending, startTransition] = useTransition();
  const [answering, setAnswering] = useState(initialAnswering);
  const [score, setScore] = useState(initialScore);
  const [wantToAnswer, setWantToAnswer] = useState(false);
  console.log("Rendering player view");
  console.log({ wantToAnswer });

  useEffect(() => {
    console.log("Creating pusher instance");
    const pusher = new Pusher(PUSHER_APP_KEY, {
      cluster: "eu",
    });

    const channel = pusher.subscribe(gameId);
    channel.bind(PusherEvents.ANSWERING, function (data: AnsweringEvent) {
      setAnswering(data.playerName);
      setWantToAnswer(false);
    });

    channel.bind(
      PusherEvents.CLEAR_ANSWERING,
      function (data: ClearAnsweringEvent) {
        setAnswering("");
        setWantToAnswer(false);
      }
    );

    channel.bind(
      PusherEvents.SCORE_CHANGED,
      function (data: ScoreChangedEvent) {
        if (data.playerName === playerName) {
          setScore(data.score);
        }
      }
    );

    return () => {
      pusher.unsubscribe(gameId);
    };
  }, [gameId, playerName]);

  useEffect(() => {
    let pusher: Pusher;
    if (wantToAnswer) {
      console.log("Creating pusher instance");
      pusher = new Pusher(PUSHER_APP_KEY, {
        cluster: "eu",
      });

      const channel = pusher.subscribe(gameId);
      console.log("Triggering CLIENT_WANT_TO_ANSWER");
      channel.trigger(PusherEvents.CLIENT_WANT_TO_ANSWER, {
        playerName,
      });
    }

    return () => {
      console.log("Unsubscribing from pusher");
      pusher?.unsubscribe(gameId);
    };
  }, [wantToAnswer]);

  const handleAnswerClick = () => {
    setWantToAnswer(true);
    startTransition(() => {
      wantToAnswerAction(gameId, playerName);
    });
  };

  return (
    <FlexColumn>
      <PlayerCard playerName={playerName} score={score} />
      {answering ? (
        <Button disabled>
          <HeadingGray>{answering} is answering </HeadingGray>
        </Button>
      ) : (
        <Button onClick={handleAnswerClick}>
          {wantToAnswer ? (
            <FlexRow className="justify-center">
              <Loading />
              <Heading>Answer</Heading>
            </FlexRow>
          ) : (
            <Heading>Answer</Heading>
          )}
        </Button>
      )}
    </FlexColumn>
  );
};
