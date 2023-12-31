import { Button } from "./buttons";
import { FlexColumn } from "./flex";
import { Input } from "./input";

type JoinGameFormProps = {
  action: any;
  gameId: string;
};

export const JoinGameForm = (props: JoinGameFormProps) => {
  return (
    <form
      action={props.action}
      className="mx-auto mb-0 mt-8 max-w-md space-y-4"
    >
      <FlexColumn>
        <Input type="hidden" name="game_id" value={props.gameId} />
        <Input
          type="text"
          name="player_name"
          placeholder="Player name"
          autoFocus={true}
        />
        <Button type="submit">Join</Button>
      </FlexColumn>
    </form>
  );
};
