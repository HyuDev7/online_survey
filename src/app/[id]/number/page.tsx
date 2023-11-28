import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <header className="border-b-2 border-black font-bold tracking-tight w-full">
        <div className="mx-3 sm:container sm:mx-auto">
          <nav className="flex justify-between items-center">
            <div>
              <h1 className="text-lg sm:text-4xl my-3">応用経済分析研究室</h1>
            </div>
            <div className="buttons flex">
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
            </div>
          </nav>
        </div>
      </header>
      <main className="mx-3 sm:container sm:mx-auto flex-1">
        <div className="container mx-auto">
          <h1 className="text-3xl my-5">確認番号ページ</h1>
          <div className="textStyle">
            <p>以下が確認番号となります。</p>
            <p>
              ランサーズを通して謝礼をお渡しする際に必要となりますので、
              必ずお手元に番号のお控えを取るようにしてください。
            </p>
            <div className="text-3xl font-bold my-4">
              確認番号：{process.env.REWARD_NUMBER}
            </div>
            <div className="my-4">
              また、ご自身のメールアドレスへ確認番号を送りたい場合は、下にあるGoogle
              Formのリンクからフォームを開いてもらい、そちらで送り先のメールアドレスを入力すれば
              番号をお送りすることができます。
            </div>
            <a
              href="https://forms.gle/NqJ5HLe14GsZTjkE6"
              className="buttonStyle"
            >
              Google Formへはこちらから
            </a>
            <p className="mt-4">
              番号のお控えが終わり次第、こちらのタブを閉じてアンケートを終了していただいて構いません。
            </p>
            <p>この度はご協力いただきありがとうございました。</p>
          </div>
        </div>
      </main>
    </>
  );
}
