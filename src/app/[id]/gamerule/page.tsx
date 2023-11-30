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
    <>
      <header className="border-b-2 border-black font-bold tracking-tight w-full">
        <div className="mx-3 sm:container sm:mx-auto">
          <nav className="flex justify-between items-center">
            <div>
              <h1 className="text-lg sm:text-4xl my-3">応用経済分析研究室</h1>
            </div>
            {/* <div className="buttons flex">
                  <div className="text-center mx-1">
                    <Link
                      href={`/${params.id}/check`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="buttonStyle mb-0 min-w-full text-sm sm:text-xl p-0.5 font-normal"
                    >
                      回答の確認
                    </Link>
                    <p className="text-xs font-normal">
                      ※今までの回答が別タブで開きます
                    </p>
                  </div>

                  <div className="text-center mx-1">
                    <Link
                      href={`/description`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="buttonStyle mb-0 min-w-full text-sm sm:text-xl p-0.5 font-normal"
                    >
                      質問の事前説明
                    </Link>
                    <p className="text-xs font-normal">
                      ※事前説明が別タブで開きます
                    </p>
                  </div>
                </div> */}
          </nav>
        </div>
      </header>
      <main className="mx-3 sm:container sm:mx-auto flex-1">
        <div className="container mx-auto">
          <h1 className="text-3xl my-5">質問の事前説明</h1>
          <h4>【質問の概要】</h4>
          <div className="textStyle">
            <p>
              1000円を提案者と応答者の2人で、以下のルールに沿って分けるゲームを考えてもらいます。
            </p>
            <p className="text-sm text-red-600">
              ※ここでいうゲームとはルールに則った交渉のことを指します。
            </p>

            <ol className="list-decimal list-inside mt-3">
              <li>提案者が応答者に対して1000円をどう分けるかを提案する。</li>
              <li>応答者はその提案に対して受け入れるか断るかを選択する。</li>
              <li>
                応答者が提案を受け入れた場合はその金額による分配が行われ、
                <span className="font-bold underline underline-offset-4">
                  断った場合は提案者と応答者は共にお金を受け取ることはできない
                </span>。
              </li>
            </ol>
          </div>

          <h4>【質問について】</h4>
          <div className="textStyle">
            <p>
              上記の問題設定のもとゲームを3回行います。
              各ゲームにおいて、回答者には提案者または応答者のどちらかの役割がランダムで与えられます。
              質問文の説明に則って、提案者の場合は分配金額を入力し、応答者の場合は提示された分配を受け入れるか断るかを選択してください。
            </p>
          </div>

          <h4>【回答上の注意】</h4>
          <div className="textStyle">
            <p>
              一度送信した内容はその後、
              <span className="font-semibold">修正することはできません</span>。
              また、実験開始から終了までの間、ブラウザの戻るボタンは
              <span className="font-semibold">ご使用にならないでください</span>
              。 データが正常に送信・処理されない可能性があります。
              本調査は完全にオンライン上で行われており、参加者の匿名性は確保されています。
            </p>
            <p>
              回答について、特定の正解などはありません。ご自身の考えに最も近い回答をしてください。
            </p>
          </div>
          <div className="textStyle">
            それでは、まずは以下のボタンから回答される方のご年齢・性別を入力してください。
            その後、アンケートにお答えください。
          </div>

          <Link className="inputStyle" href={`/${sessionID}/profile`}>
            回答者情報の入力
          </Link>
        </div>
      </main>
    </>
  );
}
