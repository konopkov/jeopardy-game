"use server";
import { revalidatePath } from "next/cache";
import { createGame } from "../db/games";
import { createPresentation, createTemplateSlide } from "../google-slides";
import { getUserSession } from "../session";

export const createGameAction = async (formData: FormData) => {
  console.log({ formData });
  const title = formData.get("title") as string;

  const user = await getUserSession();

  const response = await createPresentation({ title }, user);
  const presentationId = response.presentationId;

  const templateSlideData = {
    categoryId: 1,
    categoryName: "Category 1",
    price: 100,
    slideType: "question" as const,
  };
  await createTemplateSlide(presentationId, templateSlideData, user);
  await createGame({ title, presentationId, ownerId: user.id });

  revalidatePath(`/games`);
};
