"use server";

import { incrementScore } from "../db/player";

import { revalidatePath } from "next/cache";
import Pusher from "pusher";
import { APP_ID, KEY, SECRET } from "../pusher/config";
import { PusherEvents } from "../pusher/events";

export const incrementScoreAction = async (
  gameId: string,
  playerName: string,
  price: number
) => {
  console.log("Incrementing score");
  const resp = await incrementScore(gameId, playerName, price);
  const newScore = resp[0].score;

  console.log("Creating pusher instance");
  const pusher = new Pusher({
    appId: APP_ID,
    key: KEY,
    secret: SECRET,
    cluster: "eu",
    useTLS: true,
  });

  console.log("Publishing score change");
  await pusher.trigger(gameId, PusherEvents.SCORE_CHANGED, {
    playerName: playerName,
    score: newScore,
  });

  revalidatePath(`/games/[gameId]/play`, "page");
  revalidatePath(`/games/[gameId]/questions`, "page");

  return;
};

export const decrementScoreAction = async (
  gameId: string,
  playerName: string,
  price: number
) => {
  console.log("Decrementing score");

  await incrementScoreAction(gameId, playerName, -price);

  return;
};
