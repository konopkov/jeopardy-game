export const PusherEvents = {
  ANSWERING: "ANSWERING",
  CLEAR_ANSWERING: "CLEAR_ANSWERING",
  WANT_TO_ANSWER: "WANT_TO_ANSWER",
  SCORE_CHANGED: "SCORE_CHANGED",
} as const;

export type AnsweringEvent = {
  playerName: string;
};

export type WantToAnswerEvent = {
  playerName: string;
};

export type ClearAnsweringEvent = {
  playerName: null;
};

export type ScoreChangedEvent = {
  playerName: string;
  score: number;
};
