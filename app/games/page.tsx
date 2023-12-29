import { createGameAction } from "@/lib/actions/games";
import { findGamesByOwnerId } from "@/lib/db/games";
import { getPresentationEditLink } from "@/lib/google-slides";
import { getUserSession } from "@/lib/session";
import Link from "next/link";

export default async function NewGamePage() {
  const user = await getUserSession();
  console.log({ user });

  if (!user) {
    return (
      <div>
        <p>
          <Link href="/api/auth/signin">Sign in</Link>
        </p>
      </div>
    );
  }

  try {
    const userGames = await findGamesByOwnerId(user.id);

    return (
      <div>
        <p>Hello, {user.name}</p>

        <form action={createGameAction}>
          <input type="text" name="title" placeholder="Game title" />
          <button type="submit">Create new game</button>
        </form>

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
          <Link href="/api/auth/signin">Sign in again</Link>
        </p>
      </div>
    );
  }
}
