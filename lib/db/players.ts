"use server";
import db from "@/lib/db/client";

export const createPlayer = async (gameId: string, playerName: string) => {
  return await db.$transaction(async (prisma) => {
    const existingPlayer = await prisma.player.findFirst({
      where: {
        gameId,
        playerName,
      },
    });

    if (existingPlayer) {
      return existingPlayer;
    }

    return await prisma.player.create({
      data: {
        gameId,
        playerName,
        score: 0,
      },
    });
  });
};
