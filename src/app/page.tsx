import Link from "next/link";
import { insertIDs } from "@/lib/mongodb";
import SplitText from "@/components/SplitText";

export default function Page() {
  // insertIDs()

  const text1 = process.env.T_text1;

  const text2 = process.env.T_text2;

  const text3 = process.env.T_text3;

  const text4 = process.env.T_text4;

  return (
    <main>
      <div className="container mx-auto">
        <h1 className="my-3">実験を始めるにあたっての説明</h1>
        <div className="textStyle">
          <SplitText text={text1} />
        </div>
        <div className="textStyle">
          <SplitText text={text2} />
        </div>
        <div className="textStyle">
          <SplitText text={text3} />
        </div>
        <div className="textStyle">
          <SplitText text={text4} />
        </div>
        <Link className="inputStyle" href="/auth">
          実験のログイン
        </Link>
      </div>
    </main>
  );
}
