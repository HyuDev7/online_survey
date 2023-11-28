"use client";
import RandomNavigateButton from "./RandomNavigateButton";
import { AssessmentFormDataType } from "@/lib/formDataTypes";
import { useState } from "react";
import Link from "next/link";

export default function ContentAssessment({
  sessionId,
  assess_cond,
}: {
  sessionId: string;
  assess_cond: boolean;
}): JSX.Element {
  //initialise form data
  const formData: AssessmentFormDataType = {
    sessionID: sessionId,
    compAssessment: null,
    assessmentCreatedAt: null,
  };
  const [responseBody, setResponseBody] = useState(formData);

  //function for handling input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setResponseBody({ ...responseBody, [name]: value });
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
          <h1 className="text-3xl my-5">これまでの質問について</h1>
          <form>
            <div className="mt-5 mb-4 textStyle">
              <p>質問へのご回答、お疲れ様でした。</p>
              <p className="mb-3">
                最後に、これまでの質問についてのあなたの理解度について、以下の選択肢からお選びください。
              </p>
            </div>

            <div
              className={
                "mb-5 flex " + (assess_cond ? "flex-col" : "flex-col-reverse")
              }
            >
              <div className="assessment_radio_button flex mb-1">
                <div className="mr-1">
                  <input
                    type="radio"
                    id="1"
                    name="compAssessment"
                    value="1"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="1">1(完全に理解している)</label>
                </div>
              </div>

              <div className="assessment_radio_button flex mb-1">
                <div className="mr-1">
                  <input
                    type="radio"
                    id="2"
                    name="compAssessment"
                    value="2"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="2">2(まあまあ理解している)</label>
                </div>
              </div>

              <div className="assessment_radio_button flex mb-1">
                <div className="mr-1">
                  <input
                    type="radio"
                    id="3"
                    name="compAssessment"
                    value="3"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="3">3(あまり理解していない)</label>
                </div>
              </div>

              <div className="assessment_radio_button flex mb-1">
                <div className="mr-1">
                  <input
                    type="radio"
                    id="4"
                    name="compAssessment"
                    value="4"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="4">4(全く理解していない)</label>
                </div>
              </div>
            </div>

            <RandomNavigateButton
              formData={responseBody}
              buttonWord="次のページへ進む"
              grandParentPass={sessionId}
              parentpass={"fin"}
              nextNum={4}
            />
          </form>
        </div>
      </main>
    </>
  );
}
