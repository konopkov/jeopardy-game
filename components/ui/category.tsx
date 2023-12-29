import { QuestionCard } from "./question-card";

type CategoryProps = {
  questions: number;
  row: number;
  categoryName: string;
};

export const Category = (props: CategoryProps) => {
  const { questions, row, categoryName } = props;

  const cells = Array.from({ length: questions - 1 }, (_, questionIndex) => {
    const questionNumber = questionIndex + 1;
    const cl = questionIndex + 2;
    const rn = row;
    const text = `question${questionNumber}`;

    return <QuestionCard key={cl} colNumber={cl} rowNumber={rn} text={text} />;
  });

  return (
    <>
      <QuestionCard colNumber={1} rowNumber={row} text={categoryName} />
      {cells}
    </>
  );
};
