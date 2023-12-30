"use client";
import { redirect } from "next/navigation";
import Pusher from "pusher-js";
import { useEffect, useState, useTransition } from "react";

import { resetBuzzerAction } from "@/lib/actions/buzzer";
import { markAnsweredAction } from "@/lib/actions/games";
import {
  decrementScoreAction,
  incrementScoreAction,
} from "@/lib/actions/player";
import { playGameLink } from "@/lib/links";
import { AnsweringEvent, PusherEvents } from "@/lib/pusher/events";
import { Aside } from "./ui/aside";
import { Button } from "./ui/buttons";
import { FlexColumn, FlexRow } from "./ui/flex";
import { Heading } from "./ui/heading";
import { PlayerCard } from "./ui/player-card";

type Player = {
  playerName: string;
  score: number;
};

export type QuestionViewProps = {
  gameId: string;
  categoryId: number;
  price: number;
  initialAnswering: string | null;
  players: Player[];
};

const PUSHER_APP_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY!;
const EMPTY_ANSWERING_PLAYER = "";

export const QuestionView = (props: QuestionViewProps) => {
  const { gameId, initialAnswering, categoryId, price } = props;

  const [_isPending, startTransition] = useTransition();
  const [answeringPlayerName, setAnsweringPlayerName] = useState(
    initialAnswering ?? EMPTY_ANSWERING_PLAYER
  );
  const answeringPlayerScore =
    props.players.find((player) => player.playerName === answeringPlayerName)
      ?.score ?? 0;

  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  useEffect(() => {
    console.log("Creating pusher instance");
    const pusher = new Pusher(PUSHER_APP_KEY, {
      cluster: "eu",
    });

    const channel = pusher.subscribe(gameId);
    channel.bind(PusherEvents.ANSWERING, function (data: AnsweringEvent) {
      setButtonsDisabled(false);
      setAnsweringPlayerName(data.playerName);
    });

    channel.bind(PusherEvents.CLEAR_ANSWERING, function (data: AnsweringEvent) {
      setButtonsDisabled(false);
      setAnsweringPlayerName(EMPTY_ANSWERING_PLAYER);
    });

    return () => {
      pusher.unsubscribe(gameId);
    };
  }, [gameId]);

  const handleCorrect = () => {
    setButtonsDisabled(true);
    startTransition(() => {
      markAnsweredAction(gameId, categoryId, price, answeringPlayerName);
      incrementScoreAction(gameId, answeringPlayerName, price);
      resetBuzzerAction(gameId);
      redirect(playGameLink(gameId));
    });
  };

  const handleIncorrect = () => {
    setButtonsDisabled(true);
    startTransition(() => {
      decrementScoreAction(gameId, answeringPlayerName, price);
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
      {answeringPlayerName ? (
        <FlexColumn>
          <FlexRow>
            <Button>
              <Heading>Answering:</Heading>
            </Button>
            <PlayerCard
              playerName={answeringPlayerName}
              score={answeringPlayerScore}
            />
            <Button disabled={buttonsDisabled} onClick={handleCorrect}>
              <Heading>+{price}</Heading>
            </Button>
            <Button disabled={buttonsDisabled} onClick={handleIncorrect}>
              <Heading>-{price}</Heading>
            </Button>
          </FlexRow>
        </FlexColumn>
      ) : (
        <FlexColumn>
          <FlexRow>
            <Heading>Waiting players . . .</Heading>
            <Button onClick={handleReturn}>No answer</Button>
          </FlexRow>
        </FlexColumn>
      )}
    </Aside>
  );
};
