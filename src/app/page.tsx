import Link from "next/link";
import { insertIDs } from "@/lib/mongodb";
import SplitText from "@/components/SplitText";
import { T_text1, T_text2, T_text3, T_text4 } from "@/lib/textlist";

export default function Page() {
  // insertIDs()

  return (
    <main>
      <div className="container mx-auto">
        <h1 className="my-3">経済学研究に用いる分配に関するアンケート調査</h1>
        <div className="textStyle">
          この度は実験へ参加してくださり、ありがとうございます。
          本実験は工学院大学の研究室が実施する経済学研究に関わるアンケート調査です。
          実験の概要とその流れについては「本実験の概要と流れについて」というページで説明しております。
          下のボタンを押してページへお進みください。
        </div>
        
        <Link className="inputStyle" href="/briefing">
          本実験の概要と流れについて
        </Link>
      </div>
    </main>
  );
}
