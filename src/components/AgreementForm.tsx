"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AgreementFormDataType } from "@/lib/formDataTypes";

export default function AgreementForm({ id }: { id: string }) {
  const router = useRouter();
  const [agreement, setAgreement] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (agreement) {
      setAgreement(false);
    } else {
      setAgreement(true);
    }
    // console.log(agreement);
  }

  async function handleSubmission(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const agreementForm: AgreementFormDataType = {
      sessionID: id,
      firstAgreement:"",
      secondAgreement: agreement.toString(),
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
