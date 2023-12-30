import { Aside } from "@/components/ui/aside";
import { Board } from "@/components/ui/board";
import { Main } from "@/components/ui/main";
import { PlayersPanel } from "@/components/ui/players-panel";
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
  const answers = game?.answers!;
  const players = game?.players!;

  return (
    <>
      <Aside>
        <PlayersPanel players={players} gameId={gameId} />
      </Aside>
      <Main>
        <Board
          categories={categories}
          questions={5}
          gameId={gameId}
          answers={answers}
        />
      </Main>
    </>
  );
}
