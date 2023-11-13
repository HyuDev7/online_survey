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
      <AgreementForm id={sessionID} />
    </div>
  );
}
