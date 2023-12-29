"use server";
import db from "@/lib/db/client";

export const setBuzzerAnswering = async (
  gameId: string,
  playerName: string
) => {
  return await db.buzzer.update({
    where: {
      gameId,
      isAnswering: false,
    },
    data: {
      isAnswering: true,
      playerName: playerName,
    },
  });
};

export const resetBuzzer = async (gameId: string) => {
  return await db.buzzer.upsert({
    where: {
      gameId,
    },
    update: {
      isAnswering: false,
      playerName: null,
    },
    create: {
      gameId,
      isAnswering: false,
      playerName: null,
    },
  });
};

export const getBuzzer = async (gameId: string) => {
  return await db.buzzer.findUnique({
    where: {
      gameId,
    },
  });
};
