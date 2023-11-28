import FirstGameForm from "@/components/FirstGameForm";
import findOrder from "@/lib/findOrder";
import { validateSessionID } from "@/lib/validateSessionId";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  //read sessionId in url and validate it
  const sessionID = params.id;
  const validationResult = await validateSessionID(sessionID);
  if (!validationResult) {
    notFound();
  }

  const assessCond = await findOrder(sessionID);

  return (
    <FirstGameForm
      sessionId={sessionID}
      condition="angry"
      money={"250"}
      assess_cond={assessCond}
    />
  );
}
