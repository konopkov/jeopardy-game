import { decrementScore, incrementScore } from "../db/player";

export const incrementScoreAction = async (
  gameId: string,
  playerName: string,
  price: number
) => {
  await incrementScore(gameId, playerName, price);
  //   revalidatePath(`/games/${gameId}/play`);
};

export const decrementScoreAction = async (
  gameId: string,
  playerName: string,
  price: number
) => {
  await decrementScore(gameId, playerName, price);
  //   revalidatePath(`/games/${gameId}/play`);
};
