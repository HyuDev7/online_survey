"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserIdType, AgreementFormDataType } from "@/lib/formDataTypes";

export default function AuthComp() {
  const router = useRouter();

  //check fail or not
  const [isFail, setIsFail] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  const userId: UserIdType = { passCode: "" };

  const [userIdBody, setUserIdBody] = useState(userId);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (name !== "firstAgreement") {
      setUserIdBody({ ...userIdBody, [name]: value });
      return;
    }

    if (isAgree) {
      setIsAgree(false);
    } else {
      setIsAgree(true);
    }
  }

  async function handleSubmission(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsPending(true);
    setIsFail(false);

    try {
      const response = await fetch("/api/passCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userIdBody),
      });

      if (!response.ok) {
        const message = `an error occurred : ${response.statusText}`;
        setIsPending(false);
        setIsFail(true);
        setIsAgree(false);
        return;
      }

      const res = await response.json();
      const sessionId = res.sessionID;

      //make first agreement body, and send it
      const FirstAgreementContent: AgreementFormDataType = {
        sessionID: sessionId,
        firstAgreement: isAgree.toString(),
        secondAgreement: "false",
        example: "",
        firstCreatedAt: new Date(),
        secondCreatedAt: null,
      };

      const agreeRes = await fetch("/api/agree", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FirstAgreementContent),
      });

      if (sessionId) {
        router.push(`/${sessionId}/gamerule`);
      }
    } catch (e) {
      console.dir(e);
    }
  }

  return (
    <main className="mx-3 sm:container sm:mx-auto flex-1">
      <div className="container mx-auto text-center">
        <h1 className="my-5">実験のログイン</h1>
        <p className="max-w-md mx-auto text-lg">
          ランサーズの応募ページに記載のあるパスコードを入力してください
        </p>
        <form className="mt-3 flex flex-col">
          <div className="mb-1 mt-1">
            <label htmlFor="passCode">パスコード: </label>
            <input
              type="text"
              className="inputStyle"
              name="passCode"
              placeholder="パスコードを入力してください"
              id="passCode"
              onChange={handleChange}
            />
          </div>

          {/* if passcode validation fail, show warning text */}
          {isPending && <p className="text-sm">しばらくお待ちください...</p>}
          {isFail && (
            <p className="text-sm text-red-600">
              パスコードが間違っています。もう一度お試しください
            </p>
          )}

          <div className="mt-3">
            <input
              type="checkbox"
              id="firstAgreement"
              name="firstAgreement"
              onChange={handleChange}
              checked={isAgree}
            />
            <label htmlFor="firstAgreement">
              募集ページの内容を理解し、それに同意する
            </label>
          </div>

          <div>
            {isAgree ? (
              <button onClick={handleSubmission} className="buttonStyle">
                送信
              </button>
            ) : (
              <>
                <button
                  onClick={handleSubmission}
                  className="buttonStyle disabled:bg-gray-600 disabled:text-white"
                  disabled
                >
                  送信
                </button>
                <p className="text-sm text-red-600">
                  ログインするためには同意ボタンにチェックをつけてください。
                </p>
              </>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
