import { Aside } from "@/components/ui/aside";
import { Board } from "@/components/ui/board";
import { getGame } from "@/lib/db/games";

type PlayGamePageProps = {
  params: {
    gameId: string;
  };
};

export default async function PlayGamePage({ params }: PlayGamePageProps) {
  const { gameId } = params;
  const game = await getGame(gameId);
  const categories = game?.categories!;

  return (
    <>
      <Aside />
      <Board categories={categories} questions={5} gameId={gameId} />
    </>
  );
}
