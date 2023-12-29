import Link from "next/link";
import styles from "./question-card.module.css";

export type QuestionCardProps = {
  colNumber: number;
  rowNumber: number;
  text: string;
  gameId: string;
  price?: string;
  categoryId?: string;
};

export const getQuestionLink = (
  gameId: string,
  categoryId: string,
  price: string
) => {
  return `/games/${gameId}/questions?categoryId=${categoryId}&price=${price}`;
};

export const QuestionCard = (props: QuestionCardProps) => {
  const { colNumber, rowNumber, text, price, categoryId, gameId } = props;

  return (
    <>
      <Link
        href={
          categoryId && price ? getQuestionLink(gameId, categoryId, price) : "#"
        }
        className={styles.question}
      >
        <div
          style={{
            gridRow: rowNumber,
            gridColumn: colNumber,
          }}
        >
          {text}
        </div>
      </Link>
    </>
  );
};
