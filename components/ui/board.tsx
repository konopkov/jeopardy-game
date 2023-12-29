import styles from "./board.module.css";
import { Category } from "./category";

export type Category = {
  categoryId: number;
  name: string;
  gameId: string;
};

export type Answer = {
  categoryId: number;
  price: number;
  playerName: string;
};

export type BoardProps = {
  categories: Category[];
  questions: number;
  gameId: string;
  answers: Answer[];
};

export const Board = (props: BoardProps) => {
  const { categories, gameId, questions, answers } = props;

  return (
    <div className={styles.board}>
      {categories.map((category) => {
        const rowNum = category.categoryId;
        const categoryId = category.categoryId;

        const answeredPrices = answers
          .filter((answer) => answer.categoryId === categoryId)
          .map((answer) => answer.price);

        return (
          <Category
            key={rowNum}
            row={rowNum}
            questions={questions}
            categoryName={category.name}
            gameId={gameId}
            answeredPrices={answeredPrices}
          />
        );
      })}
    </div>
  );
};
