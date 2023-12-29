"use server";
import db from "@/lib/db/client";

export const createPlayer = async (gameId: string, playerName: string) => {
  return await db.player.create({
    data: {
      gameId,
      playerName,
      score: 0,
    },
  });
};
