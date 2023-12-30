import { questionLink } from "@/lib/links";
import Link from "next/link";
import styles from "./question-card.module.css";

export type QuestionCardProps = {
  colNumber: number;
  rowNumber: number;
  text: string;
  gameId: string;
  price?: number;
  categoryId?: number;
  disabled?: boolean;
};

export const QuestionCard = (props: QuestionCardProps) => {
  const { colNumber, rowNumber, text, price, categoryId, gameId, disabled } =
    props;

  return (
    <>
      <Link
        href={
          categoryId && price && !disabled
            ? questionLink(gameId, categoryId, price)
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
