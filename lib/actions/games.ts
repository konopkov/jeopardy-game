"use server";
import { revalidatePath } from "next/cache";

import { resetBuzzer } from "../db/buzzer";
import { createGame } from "../db/games";
import { createAllSlides, createPresentation } from "../google-slides";
import { getUserSession } from "../session";

export const createGameAction = async (formData: FormData) => {
  console.log({ formData });
  const title = formData.get("title") as string;

  const user = await getUserSession();

  const response = await createPresentation({ title }, user);
  const presentationId = response.presentationId;

  const categories = [
    {
      id: "1",
      name: "Category 1",
    },
    {
      id: "2",
      name: "Category 2",
    },
    {
      id: "3",
      name: "Category 3",
    },
    {
      id: "4",
      name: "Category 4",
    },
    {
      id: "5",
      name: "Category 5",
    },
  ];
  await createAllSlides(presentationId, categories, user);

  const game = await createGame({ title, presentationId, ownerId: user.id });
  await resetBuzzer(game.id);

  revalidatePath(`/games`);
};
