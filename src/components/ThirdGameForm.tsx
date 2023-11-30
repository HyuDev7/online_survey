"use client";
import RandomNavigateButton from "./RandomNavigateButton";
import { ThirdFormDataType } from "@/lib/formDataTypes";
import { useState } from "react";
import Link from "next/link";
import findSecondReaction from "@/lib/findSecondReaction";

export default function ThirdGameForm({
  passedCondition,
  sessionId,
  passedGameType,
  desc,
  firstGame,
  secondGame,
}: {
  passedCondition: string;
  sessionId: string;
  passedGameType: string;
  desc: string;
  firstGame: {
    firstCondition: string;
    offer: string;
    assessment: string;
    assessmentOrder: boolean;
  };
  secondGame: {
    secondCondition: string;
    secondGameType: string;
    secondDistribution: string;
  };
}): JSX.Element {
  //initialise form data
  const formData: ThirdFormDataType = {
    sessionID: sessionId,
    thirdCondition: passedCondition,
    thirdGameType: passedGameType,
    thirdDistribution: null,
    thirdGameCreatedAt: null,
  };
  const [responseBody, setResponseBody] = useState(formData);

  //function for handling input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setResponseBody({ ...responseBody, [name]: value });
  }

  //about 1st game
  let prevOffer: number;
  let prevReact: string;
  const firstcond = firstGame.firstCondition;
  const firstReac = firstGame.offer;
  if (firstcond === "angry") {
    prevOffer = 250;
  } else if (firstcond === "neutral") {
    prevOffer = 500;
  } else {
    prevOffer = 750;
  }

  if (firstReac == "refuse") {
    prevReact = "断り";
  } else {
    prevReact = "受け入れ";
  }

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
                  href={`/${sessionId}/check`}
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
          <h1 className="text-3xl my-5">３回目の質問</h1>
          <form>
            <div className="textStyle my-5">
              <p>
                あなたは今回、<span className="font-bold">提案者</span>
                に選ばれました。
              </p>
              <p>
                1000円を、あなたと相手でどのように分けるかを自由に決めることができます。
              </p>
              {passedGameType === "UG" ? (
                <p>
                  ただし、
                  <span className="underline underline-offset-4">
                    提案が断られるとあなたも相手も何も得られません
                  </span>
                  。
                </p>
              ) : (
                <>
                  <p>
                    ただし、
                    <span className="underline underline-offset-4">
                      相手はあなたの提案を
                      <span className=" font-semibold">
                        断ることができません
                      </span>
                    </span>
                    (※最初の説明と異なりますのでご注意ください) 。
                  </p>
                  <p className="mb-3">
                    つまり、提案した分配金額が
                    <span className="font-semibold">そのまま実現します</span>。
                  </p>
                </>
              )}

              <p className="mt-3">
                相手は1回目、2回目の質問時と
                <span className="underline underline-offset-4 font-bold">
                  {desc}
                </span>
                人です。
              </p>

              {desc === "同じ" ? (
                <>
                  <p className="mt-3">
                    1回目には相手はあなたに
                    <span className="font-semibold">{prevOffer}円</span>
                    渡すことを提案しており、あなたはこの提案を
                    <span className="font-semibold">{prevReact}</span>
                    ました。
                  </p>
                  <p>
                    また、2回目にはあなたは相手に
                    <span className="font-semibold">
                      {secondGame.secondDistribution}円
                    </span>
                    渡すことを提案しました。
                  </p>
                </>
              ) : (
                <>
                  <p className="mt-3">
                    1回目の相手はあなたに
                    <span className="font-semibold">{prevOffer}円</span>
                    渡すことを提案しており、あなたはこの提案を
                    <span className="font-semibold">{prevReact}</span>
                    ました。
                  </p>
                  <p>
                    また、あなたは2回目の相手に
                    <span className="font-semibold">
                      {secondGame.secondDistribution}円
                    </span>
                    渡すことを提案しました。
                  </p>
                </>
              )}

              <p className="mt-3">いくら相手にお金を渡しますか？</p>
              <p>
                渡す金額を以下の欄に整数(0以上1000以下の半角数字)で入力してください。
              </p>
            </div>

            <div className="flex flex-col">
              <label htmlFor="thirdDistribution" className="text-xl">
                相手にいくら渡しますか？
              </label>
              <div>
                <input
                  className="inputStyle max-w-md text-xl"
                  type="number"
                  name="thirdDistribution"
                  id="thirdDistribution"
                  min={0}
                  max={1000}
                  onChange={handleChange}
                  required
                />
                円
              </div>

              <div className="text-xl mt-3">あなたが受け取る金額：</div>
              <div className="text-xl">
                {1000 - Number(responseBody.thirdDistribution)}円
              </div>

              <RandomNavigateButton
                formData={responseBody}
                buttonWord="次のページへ進む"
                nextNum={4}
                grandParentPass={sessionId}
                parentpass="assessment"
              />
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
