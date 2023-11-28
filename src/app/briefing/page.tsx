import Link from "next/link";
import SplitText from "@/components/SplitText";
import {
  B_text1,
  B_text2,
  B_text3,
  B_text4,
  B_text5,
  B_text6,
} from "@/lib/textlist";

export default function Page() {
  // insertIDs()

  return (
    <main>
      <div className="container mx-auto">
        <h1 className="my-3">実験を始めるにあたっての説明</h1>
        <div className="textStyle">
          <SplitText text={B_text1} />
        </div>
        <div className="textStyle">
          <SplitText text={B_text2} />
        </div>
        <div className="textStyle">
          <SplitText text={B_text3} />
        </div>
        <div className="textStyle">
          <SplitText text={B_text4} />
        </div>
        <div className="textStyle">
          <SplitText text={B_text5} />
        </div>
        <div className="textStyle">
          <SplitText text={B_text6} />
        </div>
        <Link className="inputStyle mt-3" href="/auth">
          実験のログイン
        </Link>
      </div>
    </main>
  );
}
