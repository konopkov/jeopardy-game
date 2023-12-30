import Link from "next/link";

import { FlexColumn } from "@/components/ui/flex";
import { GamesList } from "@/components/ui/games-table";
import { Heading, SubHeading } from "@/components/ui/heading";
import { findGamesByOwnerId } from "@/lib/db/games";
import { createGameLink, signInLink } from "@/lib/links";
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
      <FlexColumn className="gap-8">
        <Heading>Hello, {<Link href={signInLink()}>{user.name}</Link>}</Heading>
        <Link href={createGameLink()}>Create new game</Link>
        <SubHeading>My games</SubHeading>
        <GamesList games={userGames} />
      </FlexColumn>
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
