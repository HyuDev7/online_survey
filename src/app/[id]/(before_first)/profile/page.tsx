import ProfileForm from "@/components/ProfileForm";
import { validateSessionID } from "@/lib/validateSessionId";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: { id: string } }) {
  //read sessionId in url and validate it 
  const sessionID = params.id;
  const validationResult = await validateSessionID(sessionID)
  if(!validationResult){
    notFound()
  }

  return (
    <main>
      <div className="container mx-auto">
        <ProfileForm sessionId={sessionID} />
      </div>
    </main>
  );
}
