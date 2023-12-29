import Link from "next/link";

export type HeaderProps = {};

export const Header = (props: HeaderProps) => {
  const links = [{ href: "/games", label: "My games" }];

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
