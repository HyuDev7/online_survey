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
      <AgreementForm id={sessionID} />
    </div>
  );
}
