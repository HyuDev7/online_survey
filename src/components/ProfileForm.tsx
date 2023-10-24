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
    sex:"",
    pref: "",
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
    console.log(responseBody)
  }

  return (
    <form>
      <div className="my-4">
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
        <label htmlFor="sex">
          ご自身の性別を選んでください
        </label>
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

      <div className="my-2">
        <label htmlFor="pref">
          ご職業を以下の選択肢から1つ選んでください
        </label>
        <div>
          <select
            className="inputStyle max-w-md"
            name="pref"
            id="pref"
            onChange={handleChange}
            required
          >
            <option value="" defaultChecked>
              都道府県
            </option>
            <option value="北海道">北海道</option>
            <option value="青森県">青森県</option>
            <option value="岩手県">岩手県</option>
            <option value="宮城県">宮城県</option>
            <option value="秋田県">秋田県</option>
            <option value="山形県">山形県</option>
            <option value="福島県">福島県</option>
            <option value="茨城県">茨城県</option>
            <option value="栃木県">栃木県</option>
            <option value="群馬県">群馬県</option>
            <option value="埼玉県">埼玉県</option>
            <option value="千葉県">千葉県</option>
            <option value="東京都">東京都</option>
            <option value="神奈川県">神奈川県</option>
            <option value="新潟県">新潟県</option>
            <option value="富山県">富山県</option>
            <option value="石川県">石川県</option>
            <option value="福井県">福井県</option>
            <option value="山梨県">山梨県</option>
            <option value="長野県">長野県</option>
            <option value="岐阜県">岐阜県</option>
            <option value="静岡県">静岡県</option>
            <option value="愛知県">愛知県</option>
            <option value="三重県">三重県</option>
            <option value="滋賀県">滋賀県</option>
            <option value="京都府">京都府</option>
            <option value="大阪府">大阪府</option>
            <option value="兵庫県">兵庫県</option>
            <option value="奈良県">奈良県</option>
            <option value="和歌山県">和歌山県</option>
            <option value="鳥取県">鳥取県</option>
            <option value="島根県">島根県</option>
            <option value="岡山県">岡山県</option>
            <option value="広島県">広島県</option>
            <option value="山口県">山口県</option>
            <option value="徳島県">徳島県</option>
            <option value="香川県">香川県</option>
            <option value="愛媛県">愛媛県</option>
            <option value="高知県">高知県</option>
            <option value="福岡県">福岡県</option>
            <option value="佐賀県">佐賀県</option>
            <option value="長崎県">長崎県</option>
            <option value="熊本県">熊本県</option>
            <option value="大分県">大分県</option>
            <option value="宮崎県">宮崎県</option>
            <option value="鹿児島県">鹿児島県</option>
            <option value="沖縄県">沖縄県</option>
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
