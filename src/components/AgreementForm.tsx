"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AgreementFormDataType } from "@/lib/formDataTypes";
import SplitText from "./SplitText";
import { D_text1, D_text2, D_text3 } from "@/lib/textlist";

export default function AgreementForm({ id }: { id: string }) {
  const router = useRouter();
  const [agreement, setAgreement] = useState(false);
  const [notice, setNotice] = useState(false);
  const [example, setExample] = useState("");

  function handleChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    if (event.target.name === "agreement") {
      agreement ? setAgreement(false) : setAgreement(true);
    }

    if (event.target.name === "notice") {
      notice ? setNotice(false) : setNotice(true);
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
      notice: notice.toString(),
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
        <h3>【実験の目的について】</h3>
        <SplitText text={D_text2} />
      </div>

      <div className="textStyle">
        また、上記の設定について調査中にお気づきになっていた際は、下の「気づいた」欄にチェックを入れ、どの部分でお気づきになられたかを
        お答えいただければ幸いです。
        <div className="my-3">
          <input
            type="checkbox"
            id="notice"
            name="notice"
            onChange={handleChange}
            value="notice"
          />
          <label htmlFor="notice">気づいた</label>
        </div>
        <div>
          <label htmlFor="example">
            どの部分でお気づきなられたかをご記入ください
          </label>
        </div>
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
      <p>
        以上のことを踏まえた上で再びデータ提供の可否についてお聞きしたいと思います。
      </p>
      <div className="textStyle">
        <SplitText text={D_text3} />
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
