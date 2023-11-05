"use client";
import RandomNavigateButton from "./RandomNavigateButton";
import { SecondFormDataType } from "@/lib/formDataTypes";
import { useState } from "react";

export default function SecondGameForm({
  condition,
  sessionId,
  desc,
}: {
  condition: string;
  sessionId: string;
  desc:string;
}): JSX.Element {
  
  //initialise form data
  const formData: SecondFormDataType = {
    sessionID: sessionId,
    secondGame: condition,
    distribution: null,
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
        <p>{desc==="同じ"?null:"ただし"}相手は先ほどあなたにお金を渡した人と{desc}人です。</p>
        <p>いくら相手にお金を渡しますか？</p>
        <p>渡す金額を以下の入力欄に0以上、1000以下の整数を半角数字で入力してください。</p>
      </div>

      <div className="flex flex-col">
        <label htmlFor="distribution">相手にいくら渡しますか？</label>
        <div>
          <input
            className="inputStyle max-w-md"
            type="number"
            name="distribution"
            id="distribution"
            onChange={handleChange}
            required
          />
          円
        </div>

        <RandomNavigateButton
          formData={responseBody}
          buttonWord="次へ進む"
          grandParentPass={sessionId}
          parentpass={"3rdgame"}
          childpass1={desc==="同じ"?"e1TZi":"rS1p2"}
          childpass2={desc==="同じ"?"e1TZi":"rS1p2"}
        />
      </div>
    </form>
  );
}
