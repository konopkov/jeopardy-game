"use client";

import Pusher from "pusher-js";
import { useEffect, useState } from "react";

import { KEY } from "@/lib/pusher/config";
import { JoinGameEvent, PusherEvents } from "@/lib/pusher/events";
import { FlexColumn } from "./flex";
import { PlayerCard, PlayerCardProps } from "./player-card";

export type playersPanelProps = {
  gameId: string;
  players: PlayerCardProps[];
};

export const PlayersPanel = (props: playersPanelProps) => {
  const { players: initialPlayers, gameId } = props;

  const [players, setPlayers] = useState(initialPlayers);

  useEffect(() => {
    console.log("Creating pusher instance");
    const pusher = new Pusher(KEY, {
      cluster: "eu",
    });

    const channel = pusher.subscribe(gameId);
    channel.bind(PusherEvents.JOIN_GAME, function (data: JoinGameEvent) {
      setPlayers((players) => [
        ...players,
        {
          playerName: data.playerName,
          score: 0,
        },
      ]);
    });

    return () => {
      pusher.unsubscribe(gameId);
    };
  }, [gameId]);

  return (
    <FlexColumn className="gap-4">
      {players.map((player) => (
        <PlayerCard key={player.playerName} {...player} />
      ))}
    </FlexColumn>
  );
};
