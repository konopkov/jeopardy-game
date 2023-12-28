import {
  createPresentation,
  createTemplateSlide,
  getPresentationEditLink,
} from "@/lib/google-slides";
import { getUserSession } from "@/lib/session";
import Link from "next/link";

export default async function NewGamePage() {
  const user = await getUserSession();
  console.log({ user });

  if (!user) {
    return (
      <div>
        <p>
          <Link href="/api/auth/signin">Sign in</Link>
        </p>
      </div>
    );
  }

  console.log("user is authenticated");
  const gameId = "123214";
  const title = `Jeopardy Game ${gameId}`;

  const { presentationId } = await createPresentation({ title }, user);

  if (!presentationId) {
    return (
      <div>
        <p>Something went wrong</p>
        <p>
          <Link href="/api/auth/signin">Sign in again</Link>
        </p>
      </div>
    );
  }

  const data = {
    categoryId: 1,
    categoryName: "Category 1",
    price: 100,
    slideType: "question" as const,
  };
  await createTemplateSlide(presentationId, data, user);

  return (
    <div>
      <h1>New Game</h1>

      <p>Hello, {user.name}. Your google presentation is created</p>

      <Link
        rel="noopener noreferrer"
        target="_blank"
        href={getPresentationEditLink(presentationId)}
      >
        Edit manually
      </Link>
    </div>
  );
}
