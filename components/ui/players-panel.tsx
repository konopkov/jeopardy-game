import { FlexRow } from "./flex";
import { PlayerCard, PlayerCardProps } from "./player-card";

export type playersPanelProps = {
  players: PlayerCardProps[];
};

export const PlayersPanel = (props: playersPanelProps) => {
  const { players } = props;

  return (
    <FlexRow>
      {players.map((player) => (
        <PlayerCard key={player.playerName} {...player} />
      ))}
    </FlexRow>
  );
};