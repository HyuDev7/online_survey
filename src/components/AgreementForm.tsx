"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AgreementFormDataType } from "@/lib/formDataTypes";
import SplitText from "./SplitText";
import { D_text1, D_text2, D_text3, D_text4 } from "@/lib/textlist";

export default function AgreementForm({ id }: { id: string }) {
  const router = useRouter();
  const [agreement, setAgreement] = useState(false);
  const [example, setExample] = useState("");

  function handleChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    if (event.target.name === "agreement") {
      agreement ? setAgreement(false) : setAgreement(true);
    }

    if (event.target.name === "example") {
      setExample(event.target.value);
    }
  }

  async function handleSubmission(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const agreementForm: AgreementFormDataType = {
      sessionID: id,
      firstAgreement: "",
      secondAgreement: agreement.toString(),
      example: example,
    };

    console.log(agreementForm);

    try {
      const response = await fetch("/api/secondagree", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agreementForm),
      });

      if (!response.ok) {
        const message = `an error occurred : ${response.statusText}`;
        window.alert(message);
        return;
      }

      const res = await response.json();

      const sessionID = id;
      router.push(`/${sessionID}/number`);
    } catch (e) {
      console.dir(e);
    }
  }

  return (
    <>
      <div className="textStyle">
        <SplitText text={D_text1} />
      </div>

      <div className="textStyle">
        <h3>【調査の目的について】</h3>
        <SplitText text={D_text2} />
      </div>

      <div className="textStyle">
        <SplitText text={D_text3} />
      </div>

      <div className="textStyle">
        調査に関して何か不審に思った点や、コメントなどがあれば下の欄にご記入ください。
        <div>
          <textarea
            id="example"
            name="example"
            rows={5}
            cols={40}
            className="inputStyle"
            onChange={handleChange}
          ></textarea>
        </div>
      </div>

      <h3>【データ提供の可否について】</h3>
      <div className="textStyle">
        <SplitText text={D_text4} />
      </div>

      <div>
        <input
          type="checkbox"
          id="agreement"
          name="agreement"
          onChange={handleChange}
          value="agree"
        />
        <label htmlFor="agreement">データを提供する</label>
      </div>
      {/* I want to rewrite this conditional rendering*/}
      {agreement ? (
        <button onClick={handleSubmission} className="buttonStyle">
          確認番号ページ
        </button>
      ) : (
        <>
          <button
            onClick={handleSubmission}
            className="buttonStyle disabled:bg-gray-600 disabled:text-white"
            disabled
          >
            確認番号ページ
          </button>
          <p className="text-sm text-red-600">
            番号を確認するためにはデータを提供するにチェックをつけてください。
          </p>
        </>
      )}
    </>
  );
}
