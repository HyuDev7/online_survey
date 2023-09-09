import Link from "next/link";
import { insertIDs } from "@/lib/mongodb";

export default function Page() {
  // insertIDs()

  return (
    <main>
      <div className="container mx-auto">
        <h1 className="my-3">経済学研究に用いる分配に関するアンケート調査</h1>
        <div className="textStyle">
          この度は実験へ参加してくださり、ありがとうございます。¥n
          本実験は工学院大学の研究室が実施する経済学研究に関わるアンケート調査です。¥n
          実験の概要とその流れについては「本実験の概要と流れについて」というページで説明しております。¥n
          下のボタンを押してページへお進みください。¥n
        </div>
        
        <Link className="inputStyle" href="/briefing">
          本実験の概要と流れについて
        </Link>
      </div>
    </main>
  );
}
