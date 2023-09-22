import Link from "next/link";
import { insertIDs } from "@/lib/mongodb";
import SplitText from "@/components/SplitText";
import { T_text } from "@/lib/textlist";

export default function Page() {
  // insertIDs()

  return (
    <main>
      <div className="container mx-auto">
        <h1 className="my-3">金銭分配に関するアンケート調査</h1>
        <div className="textStyle">
          <SplitText text={T_text} />
        </div>

        <Link className="inputStyle" href="/briefing">
          本実験の概要と流れについて
        </Link>
      </div>
    </main>
  );
}
