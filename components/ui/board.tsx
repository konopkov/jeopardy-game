import styles from "./board.module.css";
import { Category } from "./category";

export type Category = {
  categoryId: number;
  name: string;
  gameId: string;
};

export type BoardProps = {
  categories: Category[];
  questions: number;
  gameId: string;
};

export const Board = (props: BoardProps) => {
  const { categories, gameId, questions } = props;
  console.log({ categories });

  return (
    <div className={styles.board}>
      {categories.map((category) => {
        const rowNum = category.categoryId;

        return (
          <Category
            key={rowNum}
            row={rowNum}
            questions={questions}
            categoryName={category.name}
            gameId={gameId}
          />
        );
      })}
    </div>
  );
};
