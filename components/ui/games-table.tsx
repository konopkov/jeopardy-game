import { getPresentationEditLink } from "@/lib/google-slides";
import { deleteGameLink, joinGameLink, playGameLink } from "@/lib/links";
import Link from "next/link";
import { FlexRow } from "./flex";

type Category = {
  id: string;
  name: string;
};

type Game = {
  id: string;
  presentationId: string;
  title: string;
  categories: Category[];
  createdAt: Date;
};

export type GamesListProps = {
  games: Game[];
};

const GameRow = (props: Game) => {
  const { id, title, createdAt, presentationId } = props;

  // to DD.MM.YYYY
  const formattedDate = createdAt
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    })
    .split("/")
    .join(".");

  return (
    <tr className="">
      <td>{formattedDate}</td>
      <td>{title}</td>
      <td>
        <FlexRow className="gap-4">
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href={playGameLink(id)}
          >
            Play
          </Link>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href={joinGameLink(id)}
          >
            Join
          </Link>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href={getPresentationEditLink(presentationId)}
          >
            Slides
          </Link>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href={deleteGameLink(id)}
          >
            Delete
          </Link>
        </FlexRow>
      </td>
    </tr>
  );
};

export const GamesList = (props: GamesListProps) => {
  const { games } = props;

  return (
    <div className="text-white">
      <div className="">
        <table>
          <thead>
            <tr>
              <th className="w-[100px]">Date</th>
              <th className="w-[300px]">Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <GameRow key={game.id} {...game} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
