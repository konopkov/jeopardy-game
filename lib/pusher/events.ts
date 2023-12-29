export const PusherEvents = {
  ANSWERING: "ANSWERING",
  WANT_TO_ANSWER: "WANT_TO_ANSWER",
} as const;

export type AnsweringEvent = {
  playerName: string;
};

export type WantToAnswerEvent = {
  playerName: string;
};
