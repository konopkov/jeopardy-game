import { Button } from "./buttons";

export type DeleteGameFormProps = {
  gameId: string;
  action: any;
};

export const DeleteGameForm = (props: DeleteGameFormProps) => {
  const { gameId } = props;

  return (
    <form
      action={props.action}
      className="mx-auto mb-0 mt-8 max-w-md space-y-4"
    >
      <input type="hidden" name="game_id" value={gameId} />
      <Button type="submit">Delete Game</Button>
    </form>
  );
};
