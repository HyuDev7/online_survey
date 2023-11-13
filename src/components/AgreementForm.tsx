"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AgreementFormDataType } from "@/lib/formDataTypes";

export default function AgreementForm({ id }: { id: string }) {
  const router = useRouter();
  const [agreement, setAgreement] = useState(false);
  const [example, setExample] = useState("");

  //check fail or not, init state
  const [isFail, setIsFail] = useState(false);
  const [isPending, setIsPending] = useState(false);

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
    setIsPending(true);
    setIsFail(false);

    const agreementForm: AgreementFormDataType = {
      sessionID: id,
      firstAgreement: "",
      secondAgreement: agreement.toString(),
      example: example,
    };

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
        setIsPending(false);
        setIsFail(true);
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
        <p>
          ご協力いただきありがとうございました。本ページはアンケート調査の事後説明ページです。
          改めて調査の目的を説明したのち、データの提供について同意するかをお答えいただければと思います。
        </p>
      </div>

      <div className="textStyle">
        <h3>【調査の目的について】</h3>
        <p>
          調査の事前説明でも述べたとおり、本アンケートの目的はお金の分配に関する調査を行うことです。
          ですが正確には初めに提示された金額がその後の分配行動にどのような影響を及ぼすかを調べることが本アンケートの主目的となります。
          そのため、1回目の質問時には全ての参加者に応答役が割り当てられており、金額の異なる3通りの分配額が提示されていました。
          また、2回目の質問ではその後の分配行動を調査するため、参加者全員が提案者役に割り当てられています。
          従って、実験の事前説明のうち「役割の振り分けは各ゲーム時にランダムに行われる」という点は実際とは異なる説明でした。
          1回目のゲームで提示される金額は250円と500円、750円の3通りしかなく、調査実施者側で設定したものとなっております。
          こちらも実験の事前説明で説明したものとは異なっております。
        </p>
      </div>

      <div className="textStyle">
        <p>
          提示された金額の違いがその後の分配行動にどう影響するか、回答者の自然な反応を調査するために、
          事実はと異なる説明を行いました。ご理解いただければ幸いです。
        </p>
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
        <p>
          以上の内容を踏まえた上で、データの提供について同意いただけるのであれば、下のチェックボックスをクリックし、
          「確認番号表示」ボタンを押してください。ページを移動したのち、確認番号が画面に表示されます。
          また、データの提供について同意いただけない際は、直接このページのタブを閉じていただいて構いません。
          その場合、すでにアンケートに回答いただいている場合でも謝礼をお渡しすることはできず、お答えいただいた内容は削除されます。
          ご理解いただければ幸いです。
          改めまして、この度は調査にご参加いただきありがとうございました。
        </p>
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
        <>
          <button onClick={handleSubmission} className="buttonStyle">
            確認番号ページ
          </button>
          {isPending && <p className="text-sm">しばらくお待ちください...</p>}
          {isFail && (
            <p className="text-sm text-red-600">
              予期せぬエラーが発生いたしました。もう一度お試しください
            </p>
          )}
        </>
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
