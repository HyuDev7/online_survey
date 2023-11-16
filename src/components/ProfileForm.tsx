"use client";
import RandomNavigateButton from "./RandomNavigateButton";
import { ProfileFormDataType } from "@/lib/formDataTypes";
import { useState } from "react";

export default function ProfileForm({
  sessionId,
}: {
  sessionId: string;
}): JSX.Element {
  const formData: ProfileFormDataType = {
    sessionID: sessionId,
    old: null,
    sex: "",
  };

  // const text1 = `実験を開始する前に回答いただく方のご年齢と性別を¥n
  // 以下の入力欄にご年齢と生物学的性別を入力してください`;

  const [responseBody, setResponseBody] = useState(formData);

  function handleChange(
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;
    setResponseBody({ ...responseBody, [name]: value });
  }

  return (
    <main>
      <h1 className="text-3xl my-5">ご年齢・性別の回答</h1>
      <form>
      {/* <div className="my-4">
        <SplitText text={text1} />
      </div> */}
      <div className="mt-5">
        <label htmlFor="old">ご年齢を整数(半角数字)で入力してください</label>
        <div>
          <input
            className="inputStyle max-w-md"
            type="number"
            name="old"
            id="old"
            onChange={handleChange}
            required
          />
          歳
        </div>
      </div>

      <div className="my-2">
        <label htmlFor="sex">ご自身の性別を選んでください</label>
        <div>
          <select
            className="inputStyle max-w-md"
            name="sex"
            id="sex"
            onChange={handleChange}
            required
          >
            <option defaultChecked value="">
              性別
            </option>
            <option value="男性">男性</option>
            <option value="女性">女性</option>
            <option value="その他">その他</option>
          </select>
        </div>
      </div>

      <RandomNavigateButton
        buttonWord="実験開始"
        formData={responseBody}
        grandParentPass={sessionId}
        parentpass={"1stgame"}
        nextNum={1}
      />
    </form>
    </main>
    
  );
}
