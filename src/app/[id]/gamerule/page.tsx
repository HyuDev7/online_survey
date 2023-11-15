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
        <h1 className="text-3xl sm:text-4xl my-5">調査の事前説明</h1>
        <h4>【質問の概要】</h4>
        <div className="textStyle">
          <p>1000円を2人で分ける状況を考えてもらいます。</p>
          <p className="mb-3">
            2人は<span className="underline underline-offset-4">提案者</span>
            、もしくは
            <span className="underline underline-offset-4">応答者</span>
            として以下のルールに沿って分配額を決定します。
          </p>
          <ol className="list-decimal list-inside">
            <li>提案者が応答者に対し1000円をどう分けるかの提案する。</li>
            <li>応答者はその提案に対し、受け入れるか断るかを選択する。</li>
            <li>
              応答者が提案を受け入れた場合はその金額による分配が行われ，
              <span className="font-bold underline underline-offset-4">
                断った場合は提案者と応答者は共にお金を受け取ることはできない．
              </span>
            </li>
          </ol>
        </div>
        <h4>【質問について】</h4>
        <div className="textStyle">
          <p>
            上記の問題設定のもとゲームを複数回行います．質問文の説明に則って，提案者の場合は分配金額を半角数字入力し，
            応答者の場合は提示された分配に応じるかを選択してください．各ゲームにおいて，同じ相手,または違う相手と分配を行う可能性があります．
          </p>
        </div>
        <h4>【回答にあたって】</h4>
        <div className="textStyle">
          <p>
            一度送信した内容はその後、修正することはできませんのでご注意ください。
            また、実験開始から終了までの間、ブラウザの戻るボタンはご使用にならないでください。
            データが正常に送信・処理されない可能性があります。
            また、本調査は完全にオンライン上で行われており、参加者の匿名性は確保されています。
            提案者に選ばれた場合は相手にあげる金額を、半角数字で入力してください。
            応答者に選ばれた場合は画面に表示された提案を受け入れるか断るかを選んでください。
          </p>
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
