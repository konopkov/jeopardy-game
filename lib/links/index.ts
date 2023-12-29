export const playGameLink = (id: string): string => {
  return `/games/${id}/play`;
};

export const editGameLink = (id: string): string => {
  return `/games/${id}/edit`;
};

export const signInLink = (): string => {
  return `/api/auth/signin`;
};

export const getPlayerViewLink = (
  gameId: string,
  playerName: string
): string => {
  return `/games/${gameId}/play?playerName=${playerName}`;
};
