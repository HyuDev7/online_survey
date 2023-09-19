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
        <p>あなたは1000円のうち{money}円もらえます。</p>
        <p>この提案に合意しますか？</p>
        <p>
          もしするのであれば、下の合意ボタンを選択したのち、ボタンを押してください
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
          <label className="mr-3" htmlFor="acceptOffer">合意する</label>

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
          buttonWord="2回目のゲームを始める"
          grandParentPass={sessionId}
          parentpass={"2ndgame"}
          childpass1={"nbXj6"}
          childpass2={"sO852"}
        />
      </div>
    </form>
  );
}
