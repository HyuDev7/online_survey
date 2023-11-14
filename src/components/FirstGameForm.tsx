"use client";
import RandomNavigateButton from "./RandomNavigateButton";
import { FirstFormDataType } from "@/lib/formDataTypes";
import { useState } from "react";
import ShowMoney from "./ShowMoney";

export default function FirstGameForm({
  money,
  condition,
  sessionId,
}: {
  money: string;
  condition: string;
  sessionId: string;
}): JSX.Element {
  //initialise form data
  const formData: FirstFormDataType = {
    sessionID: sessionId,
    firstGame: condition,
    offer: null,
    assessment: null,
  };
  const [responseBody, setResponseBody] = useState(formData);

  //function for handling input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setResponseBody({ ...responseBody, [name]: value });
  }

  return (
    <form>
      <div className="mt-5 mb-4 textStyle text-lg">
        <p>あなたは今回、「応答者」に選ばれました。</p>
        <p>相手の提案を受け入れる、または拒否することができます。</p>
        <p>
          ただし、
          <span className="underline underline-offset-4 mb-3">
            提案を拒否すると自身も相手も何も得られません
          </span>
          。
        </p>
        <p>相手は1000円のうち、あなたの取り分として{money}円を提案しました。</p>
        <p>この提案を受け入れますか？</p>
        <p>まず、以下の2つの選択肢から自身の考えに合うものを選んでください。</p>
      </div>

      <ShowMoney distribution={Number(money)} />

      <div className="flex flex-col">
        <div className="text-lg">
          <input
            type="radio"
            name="offer"
            value="accept"
            id="acceptOffer"
            onChange={handleChange}
            required
          />
          <label className="mr-3" htmlFor="acceptOffer">
            受け入れる
          </label>

          <input
            type="radio"
            name="offer"
            value="refuse"
            id="refuseOffer"
            onChange={handleChange}
          />
          <label htmlFor="refuseOffer">断る</label>
        </div>

        <div className="mt-7 mb-4 textStyle text-lg">
          <p>
            次にこの分け方についてどのように感じたか、最も当てはまるものを7つの選択肢の中から1つ選んでください。
          </p>
          <p>その後、「次へ進む」ボタンを押してください。</p>
        </div>

        <div className="mb-5 md:flex md:flex-row text-lg">
          <div className="assessment_radio_button flex md:flex-none text-left md:text-center mx-3">
            <div className="mr-1">
              <input
                type="radio"
                id="1"
                name="assessment"
                value="1"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="1">1(相手にとても有利)</label>
            </div>
          </div>

          <div className="assessment_radio_button flex md:flex-none text-left md:text-center mx-3">
            <div className="mr-1">
              <input
                type="radio"
                id="2"
                name="assessment"
                value="2"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="2">2(相手に有利)</label>
            </div>
          </div>

          <div className="assessment_radio_button flex md:flex-none text-left md:text-center mx-3">
            <div className="mr-1">
              <input
                type="radio"
                id="3"
                name="assessment"
                value="3"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="3">3(相手に少し有利)</label>
            </div>
          </div>

          <div className="assessment_radio_button flex md:flex-none text-left md:text-center mx-3">
            <div className="mr-1">
              <input
                type="radio"
                id="4"
                name="assessment"
                value="4"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="4">4(公平)</label>
            </div>
          </div>

          <div className="assessment_radio_button flex md:flex-none text-left md:text-center mx-3">
            <div className="mr-1">
              <input
                type="radio"
                id="5"
                name="assessment"
                value="5"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="5">5(自分に少し有利)</label>
            </div>
          </div>
          <div className="assessment_radio_button flex md:flex-none text-left md:text-center mx-3">
            <div className="mr-1">
              <input
                type="radio"
                id="6"
                name="assessment"
                value="6"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="6">6(自分に有利)</label>
            </div>
          </div>

          <div className="assessment_radio_button flex md:flex-none text-left md:text-center mx-3">
            <div className="mr-1">
              <input
                type="radio"
                id="7"
                name="assessment"
                value="7"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="7">7(自分にとても有利)</label>
            </div>
          </div>
        </div>

        <RandomNavigateButton
          formData={responseBody}
          buttonWord="次のページへ進む"
          grandParentPass={sessionId}
          parentpass={"2ndgame"}
          nextNum={2}
        />
      </div>
    </form>
  );
}
