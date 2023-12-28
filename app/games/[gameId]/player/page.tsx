export type GamePageParams = {
  gameId: string;
};

export type GamePageSearchParams = {
  playerName: string;
};

export type GamePageProps = {
  params: GamePageParams;
  searchParams: GamePageSearchParams;
};

export default function GamePage({ params, searchParams }: GamePageProps) {
  const { playerName } = searchParams;

  return (
    <div>
      <p>Hello, {playerName}</p>
      <p>Buzzer here</p>
    </div>
  );
}
