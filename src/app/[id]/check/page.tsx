import findFirstReaction from "@/lib/findFirstReaction";
import findSecondReaction from "@/lib/findSecondReaction";
import findThirdReaction from "@/lib/findThirdReaction";

export default async function Page({ params }: { params: { id: string } }) {
  //get answers from db
  let firstGame = await findFirstReaction(params.id);
  let secondGame = await findSecondReaction(params.id);
  let thirdGame = await findThirdReaction(params.id);

  //determin a distribution from offerer in 1st game
  let offerMoney: number;
  if (firstGame.firstCondition === "happy") {
    offerMoney = 750;
  } else if (firstGame.firstCondition === "angry") {
    offerMoney = 250;
  } else {
    offerMoney = 500;
  }

  return (
    <>
      <header className="border-b-2 border-black font-bold tracking-tight w-full">
        <div className="mx-3 sm:container sm:mx-auto">
          <nav className="flex justify-between items-center">
            <div>
              <h1 className="text-lg sm:text-4xl my-3">応用経済分析研究室</h1>
            </div>
          </nav>
        </div>
      </header>

      <main className="mx-3 sm:container sm:mx-auto flex-1">
        <div className="container mx-auto">
          <h1 className="my-5">これまでの回答</h1>
          <div className="textStyle">
            <p>以下がご自身の回答です。</p>
            <p className="text-sm mt-1 text-red-600">
              ※このページには戻るボタンがありません。確認が終わり次第タブを閉じていただいて構いません。
            </p>
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
                {firstGame.offer === "accept" ? "受け入れ" : "断り"}ました
              </span>
              。
            </p>
          </div>

          {secondGame === null ? null : (
            <div className="textStyle text-xl">
              <h3 className="underline underline-offset-4 mb-3">2回目の質問</h3>
              <p>
                1000円の分け方について、1回目の相手と
                <span className="font-semibold">
                  {secondGame.secondCondition === "new" ? "異なる" : "同じ"}
                </span>
                人に対して
              </p>
              <div>
                <p>相手の取り分 : {secondGame.secondDistribution}円</p>
                <p>自分の取り分 : {1000 - secondGame.secondDistribution}円</p>
              </div>
              <div className="mt-1">を提案しました。</div>
            </div>
          )}

          {thirdGame === null ? null : (
            <div className="textStyle text-xl">
              <h3 className="underline underline-offset-4 mb-3">3回目の質問</h3>
              <p>
                1000円の分け方について、1回目の相手と
                <span className="font-semibold">
                  {thirdGame.thirdCondition === "new" ? "異なる" : "同じ"}
                </span>
                人に対して
              </p>
              <div>
                <p>相手の取り分 : {thirdGame.thirdDistribution}円</p>
                <p>自分の取り分 : {1000 - thirdGame.thirdDistribution}円</p>
              </div>
              <div className="mt-1">を提案しました。</div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
