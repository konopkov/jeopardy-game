"use server";
import db from "@/lib/db/client";

export const incrementScore = async (
  gameId: string,
  playerName: string,
  price: number
) => {
  return await db.player.updateMany({
    where: {
      gameId,
      playerName,
    },
    data: {
      score: {
        increment: price,
      },
    },
  });
};

export const decrementScore = async (
  gameId: string,
  playerName: string,
  price: number
) => {
  return await incrementScore(gameId, playerName, -price);
};

export const findPlayerByName = async (gameId: string, playerName: string) => {
  return await db.player.findFirst({
    where: {
      gameId,
      playerName,
    },
  });
};
