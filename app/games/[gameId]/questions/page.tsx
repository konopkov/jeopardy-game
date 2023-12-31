import { QuestionView } from "@/components/question-view";
import { Aside } from "@/components/ui/aside";
import { Main } from "@/components/ui/main";
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

const getQuestionEmbeddedSlideUrl = (
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
  const buzzer = game?.buzzer;
  const players = game?.players ?? [];

  return (
    <>
      <Aside>
        <QuestionView
          gameId={gameId}
          categoryId={parseInt(categoryId)}
          price={parseInt(price)}
          initialAnswering={buzzer?.isAnswering ? buzzer?.playerName : null}
          players={players}
        />
      </Aside>
      <Main>
        <div className={styles.googleSlides}>
          <iframe
            src={getQuestionEmbeddedSlideUrl(
              game?.presentationId!,
              categoryId,
              price
            )}
            // width="1080"
            // height="1024"
          />
        </div>
      </Main>
    </>
  );
}
