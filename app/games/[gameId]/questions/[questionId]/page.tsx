import styles from "./page.module.css";

const PRESENTATION_ID = "1K6wYV3s5Nce9fSsjrCYnZOa4L6kTspbZsvCspwUlah4";

export type QuestionPageParams = {
  gameId: string;
  questionId: string;
};

export type QuestionPAgeProps = {
  params: QuestionPageParams;
};

export default function QuestionPage({ params }: QuestionPAgeProps) {
  return (
    <div className={styles.container}>
      <p>{JSON.stringify(params, null, 2)}</p>

      <p>Answering: Player 1</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textTransform: "uppercase",
        }}
      >
        <button>Correct</button>
        <button>Incorrect</button>
        <button>Main menu</button>
      </div>
      <div className={styles.googleSlides}>
        <iframe
          src={`https://docs.google.com/presentation/d/${PRESENTATION_ID}/embed?rm=minimal&slide=id.p${2}`}
          width="1080"
          height="1024"
          style={{
            display: "flex",
          }}
        />
      </div>
    </div>
  );
}
