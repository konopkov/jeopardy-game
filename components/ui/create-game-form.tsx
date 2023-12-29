// <!--
//   Heads up! 👋

import { Button } from "./buttons";
import { Input } from "./input";

export type GameFormProps = {
  action: any;
};

export const GameForm = (props: GameFormProps) => {
  return (
    <form
      action={props.action}
      className="mx-auto mb-0 mt-8 max-w-md space-y-4"
    >
      <Input type="text" name="title" placeholder="Game title" />
      <Input type="text" name="category_1_name" placeholder="Category 1" />
      <Input type="text" name="category_2_name" placeholder="Category 2" />
      <Input type="text" name="category_3_name" placeholder="Category 3" />
      <Input type="text" name="category_4_name" placeholder="Category 4" />
      <Input type="text" name="category_5_name" placeholder="Category 5" />
      <Button type="submit">Create new game</Button>
    </form>
  );
};
