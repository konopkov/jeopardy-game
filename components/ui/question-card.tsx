import styles from "./question-card.module.css";

export type QuestionCardProps = {
  colNumber: number;
  rowNumber: number;
  text: string;
};

export const QuestionCard = (props: QuestionCardProps) => {
  const { colNumber, rowNumber, text } = props;

  return (
    <div
      className={styles.question}
      style={{
        gridRow: rowNumber,
        gridColumn: colNumber,
      }}
    >
      {text}
    </div>
  );
};
