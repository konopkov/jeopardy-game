"use client";

import { resetBuzzerAction } from "@/lib/actions/buzzer";
import { AnsweringEvent, PusherEvents } from "@/lib/pusher/events";

import Pusher from "pusher-js";
import { useEffect, useState, useTransition } from "react";
import { Button } from "./ui/buttons";

export type QuestionViewProps = {
  gameId: string;
  initialAnswering: string | null;
};

const PUSHER_APP_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY!;

export const QuestionView = (props: QuestionViewProps) => {
  const { gameId, initialAnswering } = props;

  const [_isPending, startTransition] = useTransition();
  const [answering, setAnswering] = useState(initialAnswering);

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

  const handleCorrect = () => {
    startTransition(() => {
      resetBuzzerAction(gameId);
    });
  };

  const handleIncorrect = () => {
    startTransition(() => {
      resetBuzzerAction(gameId);
    });
  };
  console.log({ answering });

  return (
    <div>
      {answering ? (
        <>
          <p>Answering: {answering}</p>
          <Button onClick={handleCorrect}>Correct</Button>
          <Button onClick={handleIncorrect}>Incorrect</Button>
        </>
      ) : null}
    </div>
  );
};
