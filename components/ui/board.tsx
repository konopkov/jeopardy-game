import styles from "./board.module.css";
import { Category } from "./category";

export type BoardProps = {
  categories: number;
  questions: number;
  gameId: string;
};

export const Board = (props: BoardProps) => {
  const { categories, gameId, questions } = props;

  return (
    <div className={styles.board}>
      {Array.from({ length: categories }, (_, categoryIndex) => {
        const rowNum = categoryIndex + 1;
        const categoryNumber = categoryIndex + 1;

        return (
          <Category
            key={rowNum}
            row={rowNum}
            questions={questions}
            categoryName={`Category ${categoryNumber}`}
            gameId={gameId}
          />
        );
      })}
    </div>
  );
};
