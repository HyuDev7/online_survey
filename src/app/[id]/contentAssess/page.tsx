import { validateSessionID } from "@/lib/validateSessionId";
import { notFound } from "next/navigation";
import ContentAssessment from "@/components/ContentAssessment";
import findOrder from "@/lib/findOrder";

export default async function Home({ params }: { params: { id: string } }) {
  const sessionID = params.id;
  const validationResult = await validateSessionID(sessionID);
  if (!validationResult) {
    notFound();
  }

  const assessCond = await findOrder(sessionID);

  return <ContentAssessment sessionId={sessionID} assess_cond={assessCond} />;
}
