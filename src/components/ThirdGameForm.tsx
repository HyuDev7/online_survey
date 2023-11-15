"use client";
import RandomNavigateButton from "./RandomNavigateButton";
import { ThirdFormDataType } from "@/lib/formDataTypes";
import { useState } from "react";

export default function ThirdGameForm({
  passedCondition,
  sessionId,
  passedGameType,
  desc,
  prevCondition,
}: {
  passedCondition: string;
  sessionId: string;
  passedGameType: string;
  desc: string;
  prevCondition:string;
}): JSX.Element {
  //initialise form data
  const formData: ThirdFormDataType = {
    sessionID: sessionId,
    thirdCondition: passedCondition,
    thirdGameType: passedGameType,
    thirdDistribution: null,
  };
  const [responseBody, setResponseBody] = useState(formData);

  //function for handling input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setResponseBody({ ...responseBody, [name]: value });
  }

  let prevOffer: number;
  // console.log(prevCondition);
  if (prevCondition === "cRAwf") {
    prevOffer = 250;
  } else if (prevCondition === "ral0P") {
    prevOffer = 500;
  } else {
    prevOffer = 750;
  }

  return (
    <form>
      <div className="textStyle my-5">
        <p>
          もう一度<span className="font-bold">提案者</span>
          としてお金の分け方を提案してください。
        </p>
        <p>1000円を自身と相手でどのように分けるかを決めることができます</p>
        <p>
          ただ、今回は
          <span className="underline underline-offset-4">
            応答者は提案者の
            <span className="font-bold">提案を断ることができません</span>
          </span>
          。
        </p>
        <p className="mb-3">
          つまり、提案した分配金額が
          <span className="font-semibold">そのまま実現します</span>。
        </p>
        <p>
          {/* {desc === "同じ" ? null : "ただし"} */}
          相手は１回目の質問であなたにお金を渡した人と
          <span className="underline underline-offset-4 font-bold">{desc}</span>
          人です。
        </p>

        {/* make find offer logic */}
        <p>またその際、あなたに<span className="font-semibold">{prevOffer}円</span>渡すことを提案していました。</p>

        <p className="mt-3">いくら相手にお金を渡しますか？</p>
        <p>
          渡す金額を以下の入力欄に0以上、1000以下の整数を半角数字で入力してください。
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

        <div className="text-xl mt-3">自分が受け取る金額：</div>
        <div className="text-xl">
          {1000 - Number(responseBody.thirdDistribution)}円
        </div>

        <RandomNavigateButton
          formData={responseBody}
          buttonWord="実験の事後説明へ移る"
          nextNum={4}
          grandParentPass={sessionId}
          parentpass="skip"
        />
      </div>
    </form>
  );
}
