import Link from "next/link";

import { GameForm } from "@/components/ui/create-game-form";
import { createGameAction } from "@/lib/actions/games";
import { findGamesByOwnerId } from "@/lib/db/games";
import { getPresentationEditLink } from "@/lib/google-slides";
import { editGameLink, playGameLink, signInLink } from "@/lib/links";
import { getUserSession } from "@/lib/session";

export default async function NewGamePage() {
  const user = await getUserSession();

  if (!user) {
    return (
      <div>
        <p>
          <Link href={signInLink()}>Sign in</Link>
        </p>
      </div>
    );
  }

  try {
    const userGames = await findGamesByOwnerId(user.id);

    return (
      <div>
        <p>Hello, {user.name}</p>

        <GameForm action={createGameAction} />

        <h2>Games</h2>

        {userGames.map((game) => (
          <div key={game.id}>
            <p>{game.title}</p>
            <p>{game.id}</p>
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href={getPresentationEditLink(game.presentationId)}
            >
              Edit presentation
            </Link>
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href={playGameLink(game.id)}
            >
              Play game
            </Link>
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href={editGameLink(game.id)}
            >
              Edit game
            </Link>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error(error);

    return (
      <div>
        <p>Something went wrong {(error as Error).message}</p>
        <p>
          <Link href={signInLink()}>Sign in again</Link>
        </p>
      </div>
    );
  }
}
