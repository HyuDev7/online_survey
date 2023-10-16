import SplitText from "@/components/SplitText";
import { G_text1, G_text2, G_text3 } from "@/lib/textlist";
import { validateSessionID } from "@/lib/validateSessionId";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: { id: string } }) {

  const sessionID = params.id;
  const validationResult = await validateSessionID(sessionID);
  if (!validationResult) {
    notFound();
  }

  return (
    <main>
      <div className="container mx-auto">
        <h1 className="my-5">質問の事前説明</h1>
        <h4>【質問の概要】</h4>
        <div className="textStyle">
          <SplitText text={G_text1} />
        </div>
        <h4>【質問について】</h4>
        <div className="textStyle">
          <SplitText text={G_text2} />
        </div>
        <h4>【回答上の注意】</h4>
        <div className="textStyle">
          <SplitText text={G_text3} />
        </div>
        <div className="textStyle">
          それでは、まずは以下のボタンから回答される方のご年齢・性別・現在住んでいる都道府県を入力してください。
          その後、アンケートにお答えください。
        </div>
        <Link className="inputStyle" href={`/${sessionID}/profile`}>
          回答者情報の入力
        </Link>
      </div>
    </main>
  );
}
