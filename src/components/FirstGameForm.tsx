"use client";
import RandomNavigateButton from "./RandomNavigateButton";
import { FirstFormDataType } from "@/lib/formDataTypes";
import { useState } from "react";

export default function FirstGameForm({
  money,
  condition,
  sessionId,
}: {
  money: string;
  condition: string;
  sessionId:string;
}): JSX.Element {

  //initialise form data
  const formData: FirstFormDataType = {
    sessionID: sessionId,
    firstGame: condition,
    offer: null,
  };
  const [responseBody, setResponseBody] = useState(formData);

  //function for handling input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setResponseBody({ ...responseBody, [name]: value });
  }

  

  return (
    <form>
      <div className="my-3 textStyle text-xl">
        <p>あなたは今回のゲームで「応答者」に選ばれました。</p>
        <p>相手は1000円のうち、あなたの取り分として{money}円を提案しました。</p>
        <p>この提案を受け入れますか？</p>
        <p>
          以下の2つの選択肢から自身の考えに合うものを選び、「次のゲームを始める」ボタンを押してください。
        </p>
      </div>

      <div className="flex flex-col">
        <div>
          <input
            type="radio"
            name="offer"
            value="accept"
            id="acceptOffer"
            onChange={handleChange}
            required
          />
          <label className="mr-3" htmlFor="acceptOffer">受け入れる</label>

          <input
            type="radio"
            name="offer"
            value="refuse"
            id="refuseOffer"
            onChange={handleChange}
          />
          <label htmlFor="refuseOffer">断る</label>
        </div>

        <RandomNavigateButton
          formData={responseBody}
          buttonWord="次のゲームを始める"
          grandParentPass={sessionId}
          parentpass={"2ndgame"}
          childpass1={"nbXj6"}
          childpass2={"sO852"}
        />
      </div>
    </form>
  );
}
