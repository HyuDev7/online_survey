import Link from "next/link";
import { insertIDs } from "@/lib/mongodb";
import SplitText from "@/components/SplitText";
import { T_text1, T_text2 } from "@/lib/textlist";

export default function Page() {
  // insertIDs()

  return (
    <main>
      <div className="container mx-auto">
        <h1 className="my-3">金銭分配に関するアンケート調査</h1>
        <div className="textStyle">
          <SplitText text={T_text1} />
        </div>
        <div className="textStyle">
          <SplitText text={T_text2} />
        </div>
        <div className="textStyle">
          下のボタンを押して実験のログインページへお進みください。
        </div>

        <Link className="inputStyle mt-3" href="/auth">
          実験のログイン
        </Link>
      </div>
    </main>
  );
}
