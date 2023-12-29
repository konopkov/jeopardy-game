import Link from "next/link";
import styles from "./question-card.module.css";

export type QuestionCardProps = {
  colNumber: number;
  rowNumber: number;
  text: string;
  gameId: string;
  price?: string;
  categoryId?: string;
  disabled?: boolean;
};

export const getQuestionLink = (
  gameId: string,
  categoryId: string,
  price: string
) => {
  return `/games/${gameId}/questions?categoryId=${categoryId}&price=${price}`;
};

export const QuestionCard = (props: QuestionCardProps) => {
  const { colNumber, rowNumber, text, price, categoryId, gameId, disabled } =
    props;

  return (
    <>
      <Link
        href={
          categoryId && price && !disabled
            ? getQuestionLink(gameId, categoryId, price)
            : "#"
        }
        className={disabled ? styles.questionDisabled : styles.question}
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
