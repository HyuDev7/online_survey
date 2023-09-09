import Link from "next/link";
import { insertIDs } from "@/lib/mongodb";
import SplitText from "@/components/SplitText";
import { T_text1, T_text2, T_text3, T_text4 } from "@/lib/textlist";

export default function Page() {
  // insertIDs()

  return (
    <main>
      <div className="container mx-auto">
        <h1 className="my-3">実験を始めるにあたっての説明</h1>
        <div className="textStyle">
          <SplitText text={T_text1} />
        </div>
        <div className="textStyle">
          <SplitText text={T_text2} />
        </div>
        <div className="textStyle">
          <SplitText text={T_text3} />
        </div>
        <div className="textStyle">
          <SplitText text={T_text4} />
        </div>
        <Link className="inputStyle" href="/auth">
          実験のログイン
        </Link>
      </div>
    </main>
  );
}
