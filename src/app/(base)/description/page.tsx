export default function Page() {
  return (
    <main>
      <div className="container mx-auto">
        <h1 className="text-3xl sm:text-4xl my-5">質問の事前説明</h1>
        <div className="textStyle">
          <p>本ページは質問の事前説明ページです。</p>
          <p className="text-sm mt-1 text-red-600">
            ※このページには戻るボタンがありません。確認が終わり次第タブを閉じていただいて構いません。
          </p>
        </div>

        <h4>【質問の概要】</h4>
        <div className="textStyle">
          <p>
            1000円を提案者と応答者の2人で、以下のルールに沿って分けるゲームを考えてもらいます。
          </p>

          <ol className="list-decimal list-inside mt-3">
            <li>提案者が応答者に対して1000円をどう分けるかを提案する。</li>
            <li>応答者はその提案に対して受け入れるか断るかを選択する。</li>
            <li>
              応答者が提案を受け入れた場合はその金額による分配が行われ、
              <span className="font-bold underline underline-offset-4">
                断った場合は提案者と応答者は共にお金を受け取ることはできない．
              </span>
            </li>
          </ol>
        </div>

        <h4>【質問について】</h4>
        <div className="textStyle">
          <p>
            上記の問題設定のもとゲームを複数回行います。
            各ゲームにおいて、回答者には提案者または応答者のどちらかの役割がランダムで与えられます。
            質問文の説明に則って、提案者の場合は分配金額を入力し、応答者の場合は提示された分配を受け入れるか断るかを選択してください。
          </p>
        </div>

        <h4>【回答上の注意】</h4>
        <div className="textStyle">
          <p>
            <span className="underline underline-offset-4">
              一度送信した内容はその後、修正することはできません
            </span>
            。 また、実験開始から終了までの間、
            <span className="underline underline-offset-4">
              ブラウザの戻るボタンはご使用にならないでください
            </span>
            。 データが正常に送信・処理されない可能性があります。
            本調査は完全にオンライン上で行われており、参加者の匿名性は確保されています。
          </p>
          <p>
            回答について、特定の正解などはありません。ご自身の考えに最も近い回答をしてください。
          </p>
        </div>
      </div>
    </main>
  );
}
