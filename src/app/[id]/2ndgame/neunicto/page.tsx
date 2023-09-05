import SecondGameForm from "@/components/SecondGameForm";
import { validateSessionID } from "@/lib/validateSessionId";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  //read sessionId in url and validate it
  const sessionID =params.id;
  const validationResult = await validateSessionID(sessionID);
  if (!validationResult) {
    notFound();
  }

  return (
    <>
      <h1>hope you can see this continue condition page</h1>
      <SecondGameForm sessionId={sessionID} condition="continue" />
    </>
  );
}
