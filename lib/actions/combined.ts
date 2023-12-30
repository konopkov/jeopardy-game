import { resetBuzzerAction } from "./buzzer";
import { markAnsweredAction } from "./games";
import { decrementScoreAction, incrementScoreAction } from "./player";

type AnswerActionData = {
  gameId: string;
  categoryId: number;
  price: number;
  answeringPlayerName: string;
};

export const correctAnswerAction = async (data: AnswerActionData) => {
  const { gameId, categoryId, price, answeringPlayerName } = data;

  await markAnsweredAction(gameId, categoryId, price, answeringPlayerName);
  await incrementScoreAction(gameId, answeringPlayerName, price);
  await resetBuzzerAction(gameId);
};

export const wrongAnswerAction = async (data: AnswerActionData) => {
  const { gameId, categoryId, price, answeringPlayerName } = data;

  await decrementScoreAction(gameId, answeringPlayerName, price);
  await resetBuzzerAction(gameId);
};
