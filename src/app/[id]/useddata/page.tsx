import SplitText from "@/components/SplitText";
import { G_text1, G_text2, G_text3 } from "@/lib/textlist";
import { validateSessionID } from "@/lib/validateSessionId";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: { id: string } }) {

    //page validation
  const sessionID = params.id;
  const validationResult = await validateSessionID(sessionID);
  if (!validationResult) {
    notFound();
  }

  return (
    <main>
      <div className="container mx-auto">
        <h1 className="my-3">データの使われ方について</h1>
        <div className="textStyle">
          <SplitText text={G_text1} />
        </div>
        <div className="textStyle">
          <SplitText text={G_text2} />
        </div>
        <div className="textStyle">
          <SplitText text={G_text3} />
        </div>
        <Link className="inputStyle" href={`/${sessionID}/gamerule`}>
          回答者情報の入力
        </Link>
      </div>
    </main>
  );
}
