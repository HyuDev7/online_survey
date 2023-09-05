import FirstGameForm from "@/components/FirstGameForm"
import { validateSessionID } from "@/lib/validateSessionId";
import { notFound } from "next/navigation";

export default async function page({params}:{params:{id:string}}) {
   //read sessionId in url and validate it
   const sessionID=params.id
   const validationResult = await validateSessionID(sessionID);
   if (!validationResult) {
     notFound();
   }

  return (
    <div>
      <h1>This is bad page</h1>
      <FirstGameForm sessionId={sessionID} condition="bad" money={"250"} />
    </div>
  );
}
