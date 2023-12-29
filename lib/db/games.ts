"use server";
import db from "@/lib/db/client";
import ShortUniqueId from "short-unique-id";

export type Category = {
  categoryId: number;
  name: string;
};

export type GameInput = {
  title: string;
  ownerId: string;
  presentationId: string;
  categories: Category[];
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

export const createCategories = async (
  gameId: string,
  categories: Category[]
) => {
  return await db.category.createMany({
    data: categories.map((category) => ({
      ...category,
      gameId,
    })),
  });
};

export const findGamesByOwnerId = async (ownerId: string) => {
  return await db.game.findMany({
    where: {
      ownerId,
    },
  });
};

export const getGame = async (id: string) => {
  return await db.game.findUnique({
    where: {
      id,
    },
    include: {
      categories: true,
      buzzer: true,
    },
  });
};
