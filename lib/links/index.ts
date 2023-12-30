export const playGameLink = (id: string): string => {
  return `/games/${id}/play`;
};

export const joinGameLink = (id: string): string => {
  return `/games/${id}/join`;
};

export const editGameLink = (id: string): string => {
  return `/games/${id}/edit`;
};

export const signInLink = (): string => {
  return `/api/auth/signin`;
};

export const createGameLink = (): string => {
  return `/games/create`;
};

export const playerViewLink = (gameId: string, playerName: string): string => {
  const encodedPlayerName = encodeURIComponent(playerName);

  return `/games/${gameId}/player?playerName=${encodedPlayerName}`;
};

export const questionLink = (
  gameId: string,
  categoryId: number,
  price: number
) => {
  return `/games/${gameId}/questions?categoryId=${categoryId}&price=${price}`;
};
