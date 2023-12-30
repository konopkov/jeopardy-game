"use server";
import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";
import Pusher from "pusher";
import { resetBuzzer } from "../db/buzzer";
import {
  createAnswer,
  createCategories,
  createGame,
  deleteGame,
} from "../db/games";
import { createPlayer } from "../db/players";
import { createAllSlides, createPresentation } from "../google-slides";
import { homeLink, playerViewLink } from "../links";
import { APP_ID, KEY, SECRET } from "../pusher/config";
import { PusherEvents } from "../pusher/events";
import { getUserSession } from "../session";

export const createGameAction = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const category_1_name = formData.get("category_1_name") as string;
  const category_2_name = formData.get("category_2_name") as string;
  const category_3_name = formData.get("category_3_name") as string;
  const category_4_name = formData.get("category_4_name") as string;
  const category_5_name = formData.get("category_5_name") as string;

  const user = await getUserSession();

  const response = await createPresentation({ title }, user);
  const presentationId = response.presentationId;

  const categories = [
    {
      categoryId: 1,
      name: category_1_name,
    },
    {
      categoryId: 2,
      name: category_2_name,
    },
    {
      categoryId: 3,
      name: category_3_name,
    },
    {
      categoryId: 4,
      name: category_4_name,
    },
    {
      categoryId: 5,
      name: category_5_name,
    },
  ];
  await createAllSlides(presentationId, categories, user);

  const game = await createGame({
    title,
    presentationId,
    ownerId: user.id,
  });
  await createCategories(game.id, categories);

  await resetBuzzer(game.id);

  revalidatePath(`/games`);
  redirect(homeLink());
};

export const joinGameAction = async (formData: FormData) => {
  const gameId = formData.get("game_id") as string;
  const playerName = (formData.get("player_name") as string).trim();

  if (!gameId || !playerName) {
    throw new Error("Missing game ID or player name");
  }

  await createPlayer(gameId, playerName);

  console.log("Creating pusher instance");
  const pusher = new Pusher({
    appId: APP_ID,
    key: KEY,
    secret: SECRET,
    cluster: "eu",
    useTLS: true,
  });

  console.log("Resetting buzzer");

  await pusher.trigger(gameId, PusherEvents.JOIN_GAME, {
    playerName: playerName,
  });

  revalidatePath(`/games/[gameId]/play`, "page");
  redirect(playerViewLink(gameId, playerName));
};

export const markAnsweredAction = async (
  gameId: string,
  categoryId: number,
  price: number,
  playerName: string
) => {
  await createAnswer(gameId, categoryId, price, playerName);
  revalidatePath(`/games/[gameId]/play`, "page");
};

export const deleteGameAction = async (formData: FormData) => {
  const gameId = formData.get("game_id") as string;
  const user = await getUserSession();

  await deleteGame(gameId, user.id);

  revalidatePath(homeLink());
  redirect(homeLink());
};
