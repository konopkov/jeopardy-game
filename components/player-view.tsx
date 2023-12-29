"use client";

import { wantToAnswerAction } from "@/lib/actions/buzzer";
import { AnsweringEvent, PusherEvents } from "@/lib/pusher/events";

import Pusher from "pusher-js";
import { useEffect, useState, useTransition } from "react";

export type PlayerViewProps = {
  playerName: string;
  gameId: string;
  initialAnswering: string | null;
};

const PUSHER_APP_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY!;

export const PlayerView = (props: PlayerViewProps) => {
  const { playerName, gameId, initialAnswering } = props;

  const [_isPending, startTransition] = useTransition();
  const [answering, setAnswering] = useState(initialAnswering);

  useEffect(() => {
    console.log("Creating pusher instance");
    const pusher = new Pusher(PUSHER_APP_KEY, {
      cluster: "eu",
    });

    const channel = pusher.subscribe(gameId);
    channel.bind(PusherEvents.ANSWERING, function (data: AnsweringEvent) {
      console.log({ data });
      setAnswering(data.playerName);
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
    <div>
      <p>Hello, {playerName}</p>
      {answering ? (
        <>
          <p>Answering: {answering}</p>
          <button disabled>Answer (disabled)</button>
        </>
      ) : (
        <button onClick={answer}>Answer</button>
      )}
    </div>
  );
};