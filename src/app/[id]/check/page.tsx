import findFirstReaction from "@/lib/findFirstReaction";
import findSecondReaction from "@/lib/findSecondReaction";

export default async function Page({ params }: { params: { id: string } }) {
  console.log(params.id);
  //get answers from db
  let firstGame = await findFirstReaction(params.id);
  let secondGame = await findSecondReaction(params.id);

  //determin a distribution from offerer in 1st game
  let offerMoney: number;
  if (firstGame.firstGame === "happy") {
    offerMoney = 750;
  } else if (firstGame.firstGame === "angry") {
    offerMoney = 250;
  } else {
    offerMoney = 500;
  }

  return (
    <>
      <h1 className="my-5">回答結果</h1>
      <div className="textStyle">
        <p>ご協力いただきありがとうございました。</p>
        <p>以下がご自身の回答です。</p>
      </div>

      <div className="textStyle text-xl">
        <h3 className="underline underline-offset-4 mb-3">１回目の質問</h3>
        <p>１回目の質問では相手は以下の分け方を提案しました。</p>
        <div>
          <p>相手の取り分 :{1000 - offerMoney} 円</p>
          <p>自分の取り分 :{offerMoney} 円</p>
        </div>
        <p className="mt-1">
          あなたはこの提案を
          <span className="underline underline-offset-4">
            {firstGame.offer === "accept" ? "受け入れ" : "断っ"}た
          </span>
          。
        </p>
      </div>

      {secondGame === null ? null : (
        <div className="textStyle text-xl">
          <h3 className="underline underline-offset-4 mb-3">2回目の質問</h3>
          <p>
            1000円の分け方について、1回目と
            {secondGame.secondCondition === "new" ? "異なる" : "同じ"}
            相手に対して
          </p>
          <div>
            <p>相手の取り分 : {secondGame.secondDistribution}円</p>
            <p>自分の取り分 : {1000-secondGame.secondDistribution}円</p>
          </div>
          <div className="mt-1">を提案した。</div>
        </div>
      )}
    </>
  );
}
