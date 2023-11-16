import FirstGameForm from "@/components/FirstGameForm";
import { validateSessionID } from "@/lib/validateSessionId";
import { notFound } from "next/navigation";
import findOrder from "@/lib/findOrder";

export default async function page({ params }: { params: { id: string } }) {
  //read sessionId in url and validate it
  const sessionID = params.id;
  const validationResult = await validateSessionID(sessionID);
  if (!validationResult) {
    notFound();
  }

  const assessCond = await findOrder(sessionID);

  return (
    <div>
      <FirstGameForm
        sessionId={sessionID}
        condition="neutral"
        money={"500"}
        assess_cond={assessCond}
      />
    </div>
  );
}
