import { QuestionView } from "@/components/question-view";
import { getBuzzer } from "@/lib/db/buzzer";
import { getGame } from "@/lib/db/games";
import styles from "./page.module.css";

export type QuestionPageParams = {
  gameId: string;
};

export type QuestionPageSearchParams = {
  categoryId: string;
  price: string;
};

export type QuestionPageProps = {
  params: QuestionPageParams;
  searchParams: QuestionPageSearchParams;
};

export const getQuestionEmbeddedSlideUrl = (
  presentationId: string,
  categoryId: string,
  priceId: string
) => {
  return `https://docs.google.com/presentation/d/${presentationId}/embed?rm=minimal&slide=id.category_${categoryId}_price_${priceId}_question`;
};

export default async function QuestionPage({
  params,
  searchParams,
}: QuestionPageProps) {
  const { gameId } = params;
  const { categoryId, price } = searchParams;

  const game = await getGame(gameId);
  console.log({ game });

  const buzzer = await getBuzzer(gameId);
  console.log({ buzzer });

  return (
    <div className={styles.container}>
      <QuestionView
        gameId={gameId}
        initialAnswering={buzzer?.isAnswering ? buzzer?.playerName : null}
      />
      <div className={styles.googleSlides}>
        <iframe
          src={getQuestionEmbeddedSlideUrl(
            game?.presentationId!,
            categoryId,
            price
          )}
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
