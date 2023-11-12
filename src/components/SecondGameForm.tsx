"use client";
import RandomNavigateButton from "./RandomNavigateButton";
import { SecondFormDataType } from "@/lib/formDataTypes";
import { useState } from "react";

export default function SecondGameForm({
  passedCondition,
  sessionId,
  passedGameType,
  desc,
}: {
  passedCondition: string;
  sessionId: string;
  passedGameType: string;
  desc: string;
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

  return (
    <form>
      <div className="textStyle my-5 text-lg">
        <p>あなたは今回、「提案者」に選ばれました。</p>
        <p>1000円を、自身と相手でどのように分けるかを決めることができます。</p>
        {passedGameType === "UG" ? null : (
          <>
            <p>
              ただし、
              <span className="font-bold">
                応答者は提案者の提案を断ることができません。
              </span>
            </p>
            <p className="underline underline-offset-4 mb-3">
              つまり、提案した分配金額がそのまま実現します。
            </p>
          </>
        )}

        <p>
          {desc === "同じ" ? null : "ただし"}
          相手は先ほどあなたにお金を渡した人と<span className="underline underline-offset-4">{desc}</span>人です。
        </p>
        <p>いくら相手にお金を渡しますか？</p>
        <p>
          渡す金額を以下の入力欄に0以上、1000以下の整数を半角数字で入力してください。
        </p>
      </div>

      <div className="flex flex-col">
        <label htmlFor="secondDistribution">相手にいくら渡しますか？</label>
        <div>
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

        <div className="text-xl">自分が受け取る金額：</div>
        <div className="text-xl">{1000-Number(responseBody.secondDistribution)}円</div>

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
