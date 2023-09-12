export default function Page() {

  return (
    <main>
      <div className="container mx-auto">
        <h1 className="my-3">確認番号ページ</h1>
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
            番号のお控えが終わり次第、こちらのタブを閉じて実験を終了していただいて構いません。
          </p>
          <p>この度はご協力いただきありがとうございました。</p>
        </div>
      </div>
    </main>
  );
}
