import { GameForm } from "@/components/ui/create-game-form";
import { createGameAction } from "@/lib/actions/games";

export default function CreateGamePage() {
  return <GameForm action={createGameAction} />;
}
