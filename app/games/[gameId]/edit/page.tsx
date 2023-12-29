import { Board } from "@/components/ui/board";
import { getGame } from "@/lib/db/games";

type EditGamePageProps = {
  params: {
    gameId: string;
  };
};

export default async function EditGamePage({ params }: EditGamePageProps) {
  const { gameId } = params;
  const game = await getGame(gameId);
  const categories = game?.categories!;

  return (
    <div style={{ gridArea: "main" }}>
      <Board categories={categories} questions={5} gameId={gameId} />
    </div>
  );
}
