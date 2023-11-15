"use client";
import RandomNavigateButton from "./RandomNavigateButton";
import { SecondFormDataType } from "@/lib/formDataTypes";
import { useState } from "react";

export default function SecondGameForm({
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
  prevCondition: string;
}): JSX.Element {
  //initialise form data
  const formData: SecondFormDataType = {
    sessionID: sessionId,
    secondCondition: passedCondition,
    secondGameType: passedGameType,
    secondDistribution: null,
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
    <form className="">
      <div className="textStyle my-5">
        <p>
          あなたは今回、<span className="font-bold">提案者</span>
          に選ばれました。
        </p>
        <p>
          1000円を、自身と相手でどのように分けるかを自由に決めることができます。
        </p>
        {passedGameType === "UG" ? (
          <p>
            ただし、
            <span className="underline underline-offset-4">
              提案が断られると自身も相手も何も得られません
            </span>
            。
          </p>
        ) : (
          <>
            <p>
              ただし、
              <span className="underline underline-offset-4">
                応答者は提案者の提案を
                <span className=" font-semibold">断ることができません</span>
              </span>
              。
            </p>
            <p className="mb-3">
              つまり、提案した分配金額が
              <span className="font-semibold">そのまま実現します</span>。
            </p>
          </>
        )}

        <p className="mt-3">
          {/* {desc === "同じ" ? null : "ただし"} */}
          相手は先ほどあなたにお金を渡した人と
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
        <div className="text-lg">
          <label htmlFor="secondDistribution" className="text-lg">
            相手にいくら渡しますか？
          </label>
          <div className="mb-3">
            <input
              className="inputStyle max-w-md"
              type="number"
              name="secondDistribution"
              id="secondDistribution"
              min={0}
              max={1000}
              onChange={handleChange}
              required
            />
            円
          </div>

          <div className="mt-3">自分が受け取る金額：</div>
          <div className="">
            {1000 - Number(responseBody.secondDistribution)}円
          </div>
        </div>

        <RandomNavigateButton
          formData={responseBody}
          buttonWord="次へ進む"
          grandParentPass={sessionId}
          parentpass={"3rdgame"}
          nextNum={3}
        />
      </div>
    </form>
  );
}
