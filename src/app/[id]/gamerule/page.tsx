import SplitText from "@/components/SplitText";
import { validateSessionID } from "@/lib/validateSessionId";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: { id: string } }) {
  const text1 = process.env.G_text1;

  const text2 = process.env.G_text2;

  const text3 = process.env.G_text3;

  const sessionID = params.id;
  const validationResult = await validateSessionID(sessionID);
  if (!validationResult) {
    notFound();
  }

  return (
    <main>
      <div className="container mx-auto">
        <h1 className="my-3">ゲームの説明</h1>
        <div className="textStyle">
          <SplitText text={text1} />
        </div>
        <div className="textStyle">
          <SplitText text={text2} />
        </div>
        <div className="textStyle">
          <SplitText text={text3} />
        </div>
        <Link className="inputStyle" href={`/${sessionID}/profile`}>
          回答者情報の入力
        </Link>
      </div>
    </main>
  );
}
