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
      <h1 className="my-3">this is debreifing page</h1>
      <div className="textStyle mt-3">
        <p>ご協力いただきありがとうございました。</p>
        <p>タブを閉じてご退出ください。</p>
      </div>
    </div>
  );
}
