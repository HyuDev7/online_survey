import ThirdGameForm from "@/components/ThirdGameForm";
import { validateSessionID } from "@/lib/validateSessionId";
import { notFound } from "next/navigation";
import findOffer from "@/lib/findOffer";

export default async function Page({ params }: { params: { id: string } }) {
  //read sessionId in url and validate it
  const sessionID = params.id;
  const validationResult = await validateSessionID(sessionID);
  if (!validationResult) {
    notFound();
  }

  const firstOffer = await findOffer(params.id);

  return (
    <ThirdGameForm
      sessionId={sessionID}
      desc="異なる"
      passedGameType="DG"
      passedCondition="new"
      prevCondition={firstOffer}
    />
  );
}
