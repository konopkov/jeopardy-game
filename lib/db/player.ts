"use server";
import db from "@/lib/db/client";

export const incrementScore = async (
  gameId: string,
  playerName: string,
  price: number
) => {
  const [result1, result2] = await db.$transaction([
    db.player.updateMany({
      where: {
        gameId,
        playerName,
      },
      data: {
        score: {
          increment: price,
        },
      },
    }),
    db.player.findMany({
      where: {
        gameId,
        playerName,
      },
    }),
  ]);

  console.log({ result1, result2 });

  return result2;
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
