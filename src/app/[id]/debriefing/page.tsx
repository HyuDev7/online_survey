import AgreementForm from "@/components/AgreementForm";
import SplitText from "@/components/SplitText";
import { validateSessionID } from "@/lib/validateSessionId";
import { notFound } from "next/navigation";
import { D_text1, D_text2, D_text3 } from "@/lib/textlist";

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
      <div>
        <div className="textStyle">
          <SplitText text={D_text1} />
        </div>

        <div className="textStyle">
          <h3>【実験の目的について】</h3>
          <SplitText text={D_text2} />
        </div>

        <div className="textStyle">
          <h3>【データ提供の可否について】</h3>
          <p>
            以上のことを踏まえた上で再びデータ提供の可否についてお聞きしたいと思います。
          </p>
          <div className="testStyle">
            <SplitText text={D_text3} />
          </div>
        </div>
        <AgreementForm id={sessionID} />
      </div>
    </div>
  );
}
