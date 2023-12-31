"use client";
import { redirect } from "next/navigation";
import Pusher from "pusher-js";
import { useEffect, useState, useTransition } from "react";

import { resetBuzzerAction } from "@/lib/actions/buzzer";
import { correctAnswerAction, wrongAnswerAction } from "@/lib/actions/combined";
import { markAnsweredAction } from "@/lib/actions/games";
import { playGameLink } from "@/lib/links";
import { AnsweringEvent, PusherEvents } from "@/lib/pusher/events";
import { Aside } from "./ui/aside";
import { Button } from "./ui/buttons";
import { FlexColumn, FlexRow } from "./ui/flex";
import { Heading } from "./ui/heading";
import { Loading } from "./ui/icons/loading";
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
  const [wantToAnswer, setWantToAnswer] = useState(false);

  useEffect(() => {
    console.log("Creating pusher instance");
    const pusher = new Pusher(PUSHER_APP_KEY, {
      cluster: "eu",
    });

    const channel = pusher.subscribe(gameId);
    channel.bind(PusherEvents.ANSWERING, function (data: AnsweringEvent) {
      setWantToAnswer(false);
      setButtonsDisabled(false);
      setAnsweringPlayerName(data.playerName);
    });

    channel.bind(PusherEvents.CLEAR_ANSWERING, function (data: AnsweringEvent) {
      setWantToAnswer(false);
      setButtonsDisabled(false);
      setAnsweringPlayerName(EMPTY_ANSWERING_PLAYER);
    });

    channel.bind(
      PusherEvents.CLIENT_WANT_TO_ANSWER,
      function (data: AnsweringEvent) {
        setWantToAnswer(true);
      }
    );

    return () => {
      pusher.disconnect();
    };
  }, [gameId]);

  const handleCorrect = () => {
    setButtonsDisabled(true);
    startTransition(() => {
      correctAnswerAction({
        gameId,
        categoryId,
        price,
        answeringPlayerName,
      });

      redirect(playGameLink(gameId));
    });
  };

  const handleIncorrect = () => {
    setButtonsDisabled(true);
    startTransition(() => {
      wrongAnswerAction({
        gameId,
        categoryId,
        price,
        answeringPlayerName,
      });
    });
  };

  const handleReturn = () => {
    startTransition(() => {
      markAnsweredAction(gameId, categoryId, price, EMPTY_ANSWERING_PLAYER);

      console.log("Redirecting to", playGameLink(gameId));
      redirect(playGameLink(gameId));
    });
  };

  const handleSkip = () => {
    setButtonsDisabled(true);
    startTransition(() => {
      resetBuzzerAction(gameId);
    });
  };

  console.log({ wantToAnswer });

  return (
    <Aside>
      {answeringPlayerName ? (
        <FlexColumn>
          <FlexColumn>
            <Button>
              <Heading>Answering</Heading>
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
            <Button disabled={buttonsDisabled} onClick={handleSkip}>
              <Heading>Skip</Heading>
            </Button>
          </FlexColumn>
        </FlexColumn>
      ) : (
        <FlexColumn>
          <FlexRow>
            <Button onClick={handleReturn}>
              {wantToAnswer ? (
                <FlexRow className="justify-center">
                  <Loading />
                  <Heading>Answer</Heading>
                </FlexRow>
              ) : (
                <Heading>No answer</Heading>
              )}
            </Button>
          </FlexRow>
        </FlexColumn>
      )}
    </Aside>
  );
};
