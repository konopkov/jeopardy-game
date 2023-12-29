import { Board } from "@/components/ui/board";

type GamePageProps = {
  params: {
    gameId: string;
  };
};

export default function GamePage({ params }: GamePageProps) {
  return (
    <div style={{ gridArea: "main" }}>
      <Board categories={5} questions={5} />
    </div>
  );
}
