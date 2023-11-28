import ThirdGameForm from "@/components/ThirdGameForm";
import { validateSessionID } from "@/lib/validateSessionId";
import { notFound } from "next/navigation";
import findFirstReaction from "@/lib/findFirstReaction";
import findSecondReaction from "@/lib/findSecondReaction";

export default async function Page({ params }: { params: { id: string } }) {
  //read sessionId in url and validate it
  const sessionID = params.id;
  const validationResult = await validateSessionID(sessionID);
  if (!validationResult) {
    notFound();
  }

  const firstCond = await findFirstReaction(params.id);
  const secondCond = await findSecondReaction(params.id);

  return (
    <ThirdGameForm
      sessionId={sessionID}
      desc="同じ"
      passedGameType="UG"
      passedCondition="continue"
      firstGame={firstCond}
      secondGame={secondCond}
    />
  );
}
