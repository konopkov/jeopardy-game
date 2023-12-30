import Image from "next/image";
import { FlexColumn, FlexRow } from "./flex";
import { Heading } from "./heading";

export type PlayerCardProps = {
  playerName: string;
  score: number;
};

export const PlayerCard = (props: PlayerCardProps) => {
  const { playerName, score } = props;

  return (
    <FlexRow className="flex items-center gap-4 border-solid border-2 border-white rounded-lg gap-8 p-4">
      <Image
        className="w-10 h-10"
        src={`https://joesch.moe/api/v1/${playerName}`}
        width={80}
        height={80}
        alt={playerName}
      />
      <FlexColumn>
        <Heading>{playerName}</Heading>
        <Heading>{score}</Heading>
      </FlexColumn>
    </FlexRow>
  );
};
