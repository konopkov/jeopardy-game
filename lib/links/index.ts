export const playGameLink = (id: string): string => {
  return `/games/${id}/play`;
};

export const editGameLink = (id: string): string => {
  return `/games/${id}/edit`;
};

export const signInLink = (): string => {
  return `/api/auth/signin`;
};

export const playerViewLink = (gameId: string, playerName: string): string => {
  const encodedPlayerName = encodeURIComponent(playerName);

  return `/games/${gameId}/player?playerName=${encodedPlayerName}`;
};
