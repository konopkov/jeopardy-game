import { PlayerView } from "@/components/player-view";
import { getBuzzer } from "@/lib/db/buzzer";
import { findPlayerByName } from "@/lib/db/player";

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
  const player = await findPlayerByName(gameId, playerName);
  const score = player?.score ?? 0;

  return (
    <PlayerView
      playerName={playerName}
      score={score}
      gameId={gameId}
      initialAnswering={buzzer?.isAnswering ? buzzer?.playerName : null}
    ></PlayerView>
  );
}
