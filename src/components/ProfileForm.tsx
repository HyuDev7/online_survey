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
    profileCreatedAt: null,
  };

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
    <main className="mx-3 sm:container sm:mx-auto flex-1">
      <div className="container mx-auto">
        <h1 className="text-3xl my-5">ご年齢・性別の回答</h1>
        <form>
          <div className="mt-5">
            <label htmlFor="old">
              ご年齢を整数(半角数字)で入力してください
            </label>
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
      </div>
    </main>
  );
}
