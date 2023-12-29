"use client";
import { redirect } from "next/navigation";
import Pusher from "pusher-js";
import { useEffect, useState, useTransition } from "react";

import { resetBuzzerAction } from "@/lib/actions/buzzer";
import { markAnsweredAction } from "@/lib/actions/games";
import { playGameLink } from "@/lib/links";
import { AnsweringEvent, PusherEvents } from "@/lib/pusher/events";
import { Aside } from "./ui/aside";
import { Button } from "./ui/buttons";
import { FlexColumn, FlexRow } from "./ui/flex";
import { Heading } from "./ui/heading";

export type QuestionViewProps = {
  gameId: string;
  categoryId: number;
  price: number;
  initialAnswering: string | null;
};

const PUSHER_APP_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY!;
const EMPTY_ANSWERING_PLAYER = "";

export const QuestionView = (props: QuestionViewProps) => {
  const { gameId, initialAnswering, categoryId, price } = props;

  const [_isPending, startTransition] = useTransition();
  const [answeringPlayer, setAnsweringPlayer] = useState(
    initialAnswering ?? EMPTY_ANSWERING_PLAYER
  );

  useEffect(() => {
    console.log("Creating pusher instance");
    const pusher = new Pusher(PUSHER_APP_KEY, {
      cluster: "eu",
    });

    const channel = pusher.subscribe(gameId);
    channel.bind(PusherEvents.ANSWERING, function (data: AnsweringEvent) {
      setAnsweringPlayer(data.playerName);
    });

    channel.bind(PusherEvents.CLEAR_ANSWERING, function (data: AnsweringEvent) {
      setAnsweringPlayer(EMPTY_ANSWERING_PLAYER);
    });

    return () => {
      pusher.unsubscribe(gameId);
    };
  }, [gameId]);

  const handleCorrect = () => {
    startTransition(() => {
      markAnsweredAction(gameId, categoryId, price, answeringPlayer);
      resetBuzzerAction(gameId);
      redirect(playGameLink(gameId));
    });
  };

  const handleIncorrect = () => {
    startTransition(() => {
      resetBuzzerAction(gameId);
    });
  };

  const handleReturn = () => {
    startTransition(() => {
      markAnsweredAction(gameId, categoryId, price, EMPTY_ANSWERING_PLAYER);
      redirect(playGameLink(gameId));
    });
  };

  return (
    <Aside>
      {answeringPlayer ? (
        <FlexColumn>
          <Heading>Answering: {answeringPlayer}</Heading>
          <FlexRow>
            <Button onClick={handleCorrect}>Correct</Button>
            <Button onClick={handleIncorrect}>Incorrect</Button>
          </FlexRow>
        </FlexColumn>
      ) : (
        <>
          <Heading>Waiting players . . .</Heading>
          <Button onClick={handleReturn}>No answer</Button>
        </>
      )}
    </Aside>
  );
};
