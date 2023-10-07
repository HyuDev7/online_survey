"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserIdType } from "@/lib/formDataTypes";

export default function AuthComp() {
  const router = useRouter();
  //check fail or not
  const [isFail, setIsFail] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const userId: UserIdType = { passCode: "" };
  const [userIdBody, setUserIdBody] = useState(userId);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // console.log(e.target);
    const { name, value } = e.target;
    setUserIdBody({ ...userIdBody, [name]: value });
    // console.log(userIdBody);
  }

  async function handleSubmission(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsPending(true);

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
        // console.log("your trial got failed");
        setIsPending(false);
        setIsFail(true);
        return;
      }

      const res = await response.json();
      const sessionId = res.sessionID;

      if (sessionId) {
        console.log("you are authorised!");
        router.push(`/${sessionId}/gamerule`);
      }
    } catch (e) {
      console.dir(e);
    }
  }

  return (
    <div className="container mx-auto text-center">
      <h1 className="my-3">実験のログイン</h1>
      <p className="max-w-md mx-auto text-lg">
        ランサーズの応募ページに記載のある、パスコードを入力してください(コピーアンドペーストで構いません)
      </p>
      <p className="mt-3 mx-auto max-w-md text-left text-sm">
        ※本実験へのログインをもって事前説明の内容を理解し、これに同意したとみなすことと
        させていただきます。
      </p>
      <form className="mt-3 flex flex-col">
        <div className="mb-2 mt-1">
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

        <div>
          <button onClick={handleSubmission} className="buttonStyle">
            送信
          </button>
        </div>
      </form>
    </div>
  );
}
