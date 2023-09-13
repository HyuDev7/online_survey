"use client";
import RandomNavigateButton from "./RandomNavigateButton";
import { ProfileFormDataType } from "@/lib/formDataTypes";
import { useState } from "react";
import SplitText from "./SplitText";

export default function ProfileForm({
  sessionId,
}: {
  sessionId: string;
}): JSX.Element {
  const formData: ProfileFormDataType = {
    sessionID: sessionId,
    old: null,
    occupation: "学生",
  };

  const text1 = `実験を開始する前に回答いただく方のご年齢とご職業を¥n
  お聞きかせいただきたいと考えております。¥n
  以下の入力欄にご年齢とご職業を入力してください`;

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
    <form>
      <div className="my-2">
        <SplitText text={text1} />
      </div>

      <label htmlFor="old">ご年齢を入力してください</label>
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

      <div className="my-2">
        <label htmlFor="occupation">
          ご職業を以下の選択肢から1つ選んでください
        </label>
        <div>
          <select
            className="inputStyle max-w-md"
            name="occupation"
            id="occupation"
            onChange={handleChange}
            required
          >
            <option value="学生">学生</option>
            <option value="会社員">会社員</option>
            <option value="フリーター">フリーター</option>
            <option value="自営業">自営業</option>
          </select>
        </div>
      </div>

      <RandomNavigateButton
        buttonWord="実験開始"
        formData={responseBody}
        grandParentPass={sessionId}
        parentpass={"1stgame"}
        childpass1={"cRAwf"}
        childpass2={"wu89s"}
      />
    </form>
  );
}
