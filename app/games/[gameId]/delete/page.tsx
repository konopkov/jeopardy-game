import { DeleteGameForm } from "@/components/ui/delete-game-form";
import { deleteGameAction } from "@/lib/actions/games";

type DeleteGamePageProps = {
  params: {
    gameId: string;
  };
};

export default function DeleteGamePage(props: DeleteGamePageProps) {
  const { gameId } = props.params;

  return <DeleteGameForm action={deleteGameAction} gameId={gameId} />;
}
