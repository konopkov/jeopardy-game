import { JoinGameForm } from "@/components/ui/join-game-form";
import { joinGameAction } from "@/lib/actions/games";

export type JoinGamePageParams = {
  gameId: string;
};

export type JoinGamePageProps = {
  params: JoinGamePageParams;
};

const JoinGamePage = ({ params }: JoinGamePageProps) => {
  const { gameId } = params;

  return <JoinGameForm gameId={gameId} action={joinGameAction} />;
};

export default JoinGamePage;
