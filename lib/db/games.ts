"use server";
import db from "@/lib/db/client";
import ShortUniqueId from "short-unique-id";

export type GameInput = {
  title: string;
  ownerId: string;
  presentationId: string;
};

export const createGame = async (data: any) => {
  const shortId = new ShortUniqueId().randomUUID(6);
  console.log({
    ...data,
    shortId,
  });
  return await db.game.create({
    data: {
      ...data,
      shortId,
    },
  });
};

export const findGamesByOwnerId = async (ownerId: string) => {
  return await db.game.findMany({
    where: {
      ownerId,
    },
  });
};
