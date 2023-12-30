import { FlexColumn } from "./flex";
import { Heading, SubHeading } from "./heading";

export type PlayerCardProps = {
  playerName: string;
  score: number;
};

export const PlayerCard = (props: PlayerCardProps) => {
  const { playerName, score } = props;

  return (
    <FlexColumn>
      <Heading>{playerName}</Heading>
      <SubHeading>{score}</SubHeading>
    </FlexColumn>
  );
};
