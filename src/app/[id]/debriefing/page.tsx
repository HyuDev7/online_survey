import AgreementForm from "@/components/AgreementForm";
import { validateSessionID } from "@/lib/validateSessionId";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  //read sessionId in url and validate it
  const sessionID = params.id;
  const validationResult = await validateSessionID(sessionID);
  if (!validationResult) {
    notFound();
  }

  return (
    <div>
      <h1 className="my-3">実験の事後説明</h1>
      <div className="textStyle mt-3">
        <p>
          ご協力いただきありがとうございました。本ページは実験の事後説明のページです。
          改めて実験の目的を説明したのち、データの提供について同意するかをお答えいただければと思います。
        </p>
        <div className="textStyle">
          <h3>【実験の目的について】</h3>
          <p>
            実験の事前説明でも述べたとおり、本アンケートの目的は"お金の分配"に関する調査を行うことです。
            ですが正確には"初めに提示された金額"が"その後の分配行動"にどのような影響を及ぼすかを調べることが本実験の主目的となります。
            そのため、実験の参加者には金額の異なる分配額の提示が1回目のアンケートでは行われておりました。
            つまり、ずべての参加者が1回目のゲームでは部下役に割り当てられています。
            また、2回目のゲームでは"その後の分配行動"を調査するため、参加者全員が上司役に割り当てられています。
            従って、実験の事前説明のうち「役割の振り分けは各ゲーム時にランダムに行われる」という点は実際とは異なる説明でした。
            また、1回目のゲームで提示される金額は「250円」と「750円」の2通りしかなく、実験実施者側で設定したものとなっております。
            さらにこのため、2回目のゲームで回答者が提示した金額が他の参加者に提示されることはございません。
            こちらも実験の事前説明で説明したものとは異なっております。
            提示された金額の違いがその後の分配行動にどう影響するか、回答者の自然な反応を調査するために、事実はと異なる説明を行いました。
            この場を借りて謝罪させていただくとともに、ご理解いただければ幸いです。
          </p>
        </div>
        <div className="textStyle">
          <h3>【データ提供の可否について】</h3>
          <p>
            以上のことを踏まえた上で再びデータ提供の可否についてお聞きしたいと思います。
          </p>
          <p>
            もし、データの提供について同意いただけるのであれば、下のチェックボックスをクリックし(クリックするとチェックマークが付きます)、
            確認番号の表示ボタンを押してください。ページを移動したのち、確認番号が画面に表示されます。
          </p>
        </div>
        <AgreementForm id={sessionID} />
      </div>
    </div>
  );
}
