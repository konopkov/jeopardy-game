import { PlayerView } from "@/components/player-view";
import { getBuzzer } from "@/lib/db/buzzer";

export type GamePageParams = {
  gameId: string;
};

export type GamePageSearchParams = {
  playerName: string;
};

export type GamePageProps = {
  params: GamePageParams;
  searchParams: GamePageSearchParams;
};

export default async function GamePage({
  params,
  searchParams,
}: GamePageProps) {
  const { gameId } = params;
  const { playerName } = searchParams;
  const buzzer = await getBuzzer(gameId);

  return (
    <PlayerView
      playerName={playerName}
      gameId={gameId}
      initialAnswering={buzzer?.isAnswering ? buzzer?.playerName : null}
    ></PlayerView>
  );
}
