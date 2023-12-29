import { QuestionCard } from "./question-card";

type CategoryProps = {
  questions: number;
  row: number;
  categoryName: string;
  gameId: string;
};

export const Category = (props: CategoryProps) => {
  const { questions, row, categoryName, gameId } = props;
  const prices = Array.from({ length: questions }, (_, questionIndex) => {
    return (questionIndex + 1) * 100;
  });

  const cells = prices.map((price, questionIndex) => {
    const cl = questionIndex + 2;
    const rn = row;
    const text = `${price}`;

    return (
      <QuestionCard
        key={cl}
        colNumber={cl}
        rowNumber={rn}
        text={text}
        categoryId={row.toString()}
        price={price.toString()}
        gameId={gameId}
      />
    );
  });

  return (
    <>
      <QuestionCard
        colNumber={1}
        rowNumber={row}
        text={categoryName}
        gameId={gameId}
      />
      {cells}
    </>
  );
};
