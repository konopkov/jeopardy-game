import { QuestionView } from "@/components/question-view";
import { getBuzzer } from "@/lib/db/buzzer";
import styles from "./page.module.css";

const PRESENTATION_ID = "1K6wYV3s5Nce9fSsjrCYnZOa4L6kTspbZsvCspwUlah4";

export type QuestionPageParams = {
  gameId: string;
  questionId: string;
};

export type QuestionPAgeProps = {
  params: QuestionPageParams;
};

export default async function QuestionPage({ params }: QuestionPAgeProps) {
  const { gameId } = params;
  const buzzer = await getBuzzer(gameId);

  return (
    <div className={styles.container}>
      <QuestionView
        gameId={gameId}
        initialAnswering={buzzer?.isAnswering ? buzzer?.playerName : null}
      />
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
