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
    <div className="">
      <div className="textStyle">
        <p>
          ご協力いただきありがとうございました。本ページはアンケート調査の事後説明ページです。
          改めて調査の目的を説明したのち、データ提供の同意についてお答えいただければと思います。
        </p>
      </div>

      <div className="textStyle">
        <h3 className="mb-1">【調査の目的について】</h3>
        <p>
          調査の事前説明でも述べたとおり、本アンケートの目的はお金の分配に関する調査を行うことです。
          正確には初めに提示された金額がその後の分配行動にどのような影響を及ぼすかを調べることが本アンケートの主目的となります。
        </p>
        <p>
          そのため、1回目の質問時には全ての参加者に
          <span className="font-bold">応答役</span>
          が割り当てられており、
          <span className="underline underline-offset-4">
            250円と500円、750円の3通り
          </span>
          の分配額がランダムに提示されていました。
          また2回目、回答者によっては3回目の質問ではその後の分配行動を調査するため、回答者全員が
          <span className="font-bold">提案者</span>に割り当てられています。
          これらは実験の事前説明で説明したものとは異なっております。
        </p>
      </div>

      <div className="textStyle">
        <p>
          提示された金額の違いがその後の分配行動にどう影響するか、回答者の自然な反応を調査するために、
          事実はと異なる説明を行いました。ご理解いただければ幸いです。
        </p>
      </div>

      <div className="textStyle">
        調査に関してコメントや、不審に思った点などがあれば下の欄にご記入ください。
        <div className="mt-1">
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

      <h3 className="mb-1">【データ提供の可否について】</h3>
      <div className="textStyle">
        <p>
          以上を踏まえた上で、データの提供に同意していただけるのであれば、
          <span className="underline underline-offset-4">
            確認番号ページボタン
          </span>
          を押してください。ページを移動したのち、確認番号が画面に表示されます。
        </p>
        <p>
          また、
          <span className="underline underline-offset-4">
            データの提供に同意していただけない場合は、ページのタブを閉じていただいて構いません
          </span>
          。 その場合、すでにアンケートに回答いただいている場合でも
          <span className="font-semibold">謝礼をお渡しすることはできず</span>
          、お答えいただいた内容は
          <span className="font-semibold">削除</span>されます。
          ご理解いただければ幸いです。
        </p>
        <p>改めまして、この度は調査にご参加いただきありがとうございました。</p>
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
    </div>
  );
}
