"use client";
import { useRouter } from "next/navigation";

export default function FlowOfContentPage() {
  const router = useRouter();
  return (
    <div className="textStyle">
      実験を始めるにあたっての説明 → 実験のログイン → 実験の事前説明 →
      ご年齢・ご職業についての回答 → 実験① → 実験② → 実験の事後説明 →
      確認番号の提示(データ提供に同意した方のみ)
      <ul className="list-inside list-disc">
        <li>
          実験を始めるにあたっての説明ページ(本ページ)では実験全体の流れを説明しております。
        </li>
        <li>
          実験のログインページではパスコードを入力していただきます。これにより同一回答者様からの調査結果であることを保証します。
        </li>
        <li>
          実験の事前説明ではどのような実験が行われるか、また回答方法についても説明させていただきます。
        </li>
        <li>
          実験では回答者様のご年齢やご職業についてお聞きしたのち、実験①、実験②で質問にお答えいただきます。
        </li>
        <li>
          実験の事後説明では改めて、実験の概要やデータ提供の可否についてお聞きいたします。
        </li>
        <li>
          確認番号の提示は、事後説明でデータ提供に同意いただいた方のみ進めるページです。本ページで謝礼をお渡しするのに必要な確認番号を表示します。
          実験にお答えいただいた方でも本番号がなければ謝礼をお渡しすることができません。必ずお控えをお取りいただきますようお願いいたします。
        </li>
      </ul>
      <button
        className="inputStyle my-5"
        type="button"
        onClick={() => router.back()}
      >
        前のページへ戻る
      </button>
    </div>
  );
}
