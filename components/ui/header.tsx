import Link from "next/link";

export type HeaderProps = {};

export const Header = (props: HeaderProps) => {
  const links = [
    { href: "/", label: "Join game" },
    { href: "/games", label: "My games" },
    // {
    //   href: "/games/f3cf64bc-fe40-4540-8dae-382d4d200c82/play",
    //   label: "Play game",
    // },
    // {
    //   href: "/games/f3cf64bc-fe40-4540-8dae-382d4d200c82/edit",
    //   label: "Edit game",
    // },
    // { href: "/games/123/questions/1", label: "Question view" },
    // { href: "/games/123/player?playerName=Player1", label: "Player view" },
  ];

  return (
    <header className="mb-20" style={{ gridArea: "header" }}>
      <nav>
        <ul className="flex items-center">
          {links.map(({ href, label }) => (
            <li key={href} className="px-4 text-2xl">
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
