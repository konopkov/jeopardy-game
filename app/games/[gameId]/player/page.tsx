export type GamePageParams = {
  gameId: string;
};

export type GamePageSearchParams = {
  playerName: string;
};

export default function GamePage({
  params,
  searchParams,
}: {
  params: GamePageParams;
  searchParams: GamePageSearchParams;
}) {
  const { playerName } = searchParams;

  return (
    <div>
      <p>Hello, {playerName}</p>
      <p>Buzzer here</p>
    </div>
  );
}
