export default async function AgreementForm({ id }: { id: string }) {
  //get answers from db
  let firstAnswers;
  let secondAnswers;

  console.log(process.env.NEXT_PUBLIC_Url);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_Url}/api/answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionID: id }),
    });

    if (!response.ok) {
      const message = `an error occurred : ${response.statusText}`;
      window.alert(message);
      return;
    }

    const res = await response.json();
    const { first: f_answers, second: s_answers } = res.answers;
    firstAnswers = f_answers;
    secondAnswers = s_answers;
  } catch (e) {
    console.dir(e);
  }

  //determin a distribution from offerer in 1st game
  let offerMoney = 0;
  if (firstAnswers.firstGame === "happy") {
    offerMoney = 750;
  } else if (firstAnswers.firstGame === "angry") {
    offerMoney = 250;
  }

  return (
    <>
      <h1 className="my-5">回答結果</h1>
      <div className="textStyle">
        <p>
          ご協力いただきありがとうございました。このページでは回答結果を見ることができます。
        </p>
        <p>以下が２回の質問における回答結果です。</p>
      </div>

      <div className="textStyle text-xl">
        <h3 className="underline underline-offset-4">１回目の質問</h3>
        <p>１回目の質問では相手は以下の分け方を提案しました。</p>
        <div>
          <p>相手の取り分 : {1000 - offerMoney}円</p>
          <p>自分の取り分 : {offerMoney}円</p>
        </div>
        <p>
          あなたはこの提案を
          <span className="underline underline-offset-4">
            {firstAnswers.offer === "accept" ? "受け入れ" : "断っ"}た
          </span>
          。
        </p>
      </div>

      <div className="textStyle text-xl">
        <h3 className="underline underline-offset-4">2回目の質問</h3>
        <p>
          1000円の分け方について、1回目と
          {secondAnswers.secondCondition === "new" ? "異なる" : "同じ"}
          相手に対して
        </p>
        <div>
          <p>相手の取り分 : {secondAnswers.secondDistribution}円</p>
          <p>自分の取り分 : {1000 - secondAnswers.secondDistribution}円</p>
        </div>
        を提案した。
      </div>
    </>
  );
}
