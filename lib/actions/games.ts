"use server";
import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";
import { resetBuzzer } from "../db/buzzer";
import { createAnswer, createCategories, createGame } from "../db/games";
import { createPlayer } from "../db/players";
import { createAllSlides, createPresentation } from "../google-slides";
import { homeLink, playerViewLink } from "../links";
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
  const playerName = formData.get("player_name") as string;

  await createPlayer(gameId, playerName);
  revalidatePath(`/games/${gameId}/play`);
  redirect(playerViewLink(gameId, playerName));
};

export const markAnsweredAction = async (
  gameId: string,
  categoryId: number,
  price: number,
  playerName: string
) => {
  await createAnswer(gameId, categoryId, price, playerName);
  revalidatePath(`/games/${gameId}/play`);
};
