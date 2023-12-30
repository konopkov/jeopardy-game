"use server";

import Pusher from "pusher";
import { resetBuzzer, setBuzzerAnswering } from "../db/buzzer";
import { PusherEvents } from "../pusher/events";

const APP_ID = process.env.PUSHER_APP_ID!;
const SECRET = process.env.PUSHER_SECRET!;
const KEY = process.env.NEXT_PUBLIC_PUSHER_KEY!;

export const wantToAnswerAction = async (
  gameId: string,
  playerName: string
) => {
  const pusher = new Pusher({
    appId: APP_ID,
    key: KEY,
    secret: SECRET,
    cluster: "eu",
    useTLS: true,
  });

  const resp = await setBuzzerAnswering(gameId, playerName);
  if (resp) {
    pusher.trigger(gameId, PusherEvents.ANSWERING, { playerName });
  }
};

export const resetBuzzerAction = async (gameId: string) => {
  console.log("Creating pusher instance");
  const pusher = new Pusher({
    appId: APP_ID,
    key: KEY,
    secret: SECRET,
    cluster: "eu",
    useTLS: true,
  });

  console.log("Resetting buzzer");

  await resetBuzzer(gameId);
  pusher.trigger(gameId, PusherEvents.CLEAR_ANSWERING, { playerName: null });
};
