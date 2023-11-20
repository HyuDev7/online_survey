"use client";
import RandomNavigateButton from "./RandomNavigateButton";
import { AssessmentFormDataType } from "@/lib/formDataTypes";
import { useState } from "react";

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
    compAssessment:null,
    assessmentCreatedAt:null
  };
  const [responseBody, setResponseBody] = useState(formData);

  //function for handling input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setResponseBody({ ...responseBody, [name]: value });
  }

  return (
    <main>
      <h1 className="text-3xl my-5">これまでの質問について</h1>
      <form>
        <div className="mt-5 mb-4 textStyle">
          <p>質問へのご回答、お疲れ様でした。</p>
          <p>最後に質問の理解度についてお答えください。</p>
          <p className="mb-3">
            ご自身の質問の理解度について最も当てはまるものを以下の選択肢からお選びください。
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
              <label htmlFor="2">2(まぁまぁ理解している)</label>
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
    </main>
  );
}
