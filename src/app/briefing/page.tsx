import Link from "next/link";
import { insertIDs } from "@/lib/mongodb";
import SplitText from "@/components/SplitText";
import {
  B_text1,
  B_text2,
  B_text3,
  B_text4,
  B_text5,
  B_text6,
  B_text7,
} from "@/lib/textlist";
import FlowOfPage from "@/components/FlowOfPage";

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
        <div className="textStyle mb-0">
          <SplitText text={B_text6} />
        </div>
        <FlowOfPage />
        <div className="textStyle">
          <SplitText text={B_text7} />
        </div>
        <Link className="inputStyle" href="/auth">
          実験のログイン
        </Link>
      </div>
    </main>
  );
}
