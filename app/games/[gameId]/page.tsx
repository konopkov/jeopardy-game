import styles from "./page.module.css";

type CategoryProps = {
  colNumber: number;
  rows?: number;
};
const Category = ({ colNumber, rows = 5 }: CategoryProps) => {
  const cells = Array.from({ length: rows }, (_, i) => (
    <div
      key={i}
      className={styles.question}
      style={{
        gridRow: i + 1,
        gridColumn: colNumber,
      }}
    >
      col{colNumber} row{i + 1}
    </div>
  ));

  return <>{cells}</>;
};

type GamePageProps = {
  params: {
    gameId: string;
  };
  searchParams: {
    playerName: string;
  };
};

export default function GamePage({ params, searchParams }: GamePageProps) {
  const { playerName } = searchParams;

  //   const { id } = params.match.params;
  //   const [game, setGame] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);

  //   useEffect(() => {
  //     const getGame = async () => {
  //       try {
  //         const response = await fetch(`${API_URL}/games/${id}`);
  //         const data = await response.json();
  //         setGame(data);
  //       } catch (error) {
  //         setError(error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     getGame();
  //   }, [id]);

  //   if (loading) return <div>Loading...</div>;
  //   if (error) return <div>Error!</div>;

  return (
    <>
      <div>{playerName}</div>
      <div className={styles.board}>
        <Category colNumber={1} />
        <Category colNumber={2} />
        <Category colNumber={3} />
        <Category colNumber={4} />
        <Category colNumber={5} />
      </div>
    </>
  );
}
