import Link from "next/link";
import SplitText from "@/components/SplitText";
import { T_text1, T_text2 } from "@/lib/textlist";

export default function Page() {
  return (
    <>
      <header className="border-b-2 border-black font-bold tracking-tight w-full">
        <div className="mx-3 sm:container sm:mx-auto">
          <nav className="flex justify-between items-center">
            <div>
              <h1 className="text-lg sm:text-4xl my-3">応用経済分析研究室</h1>
            </div>
          </nav>
        </div>
      </header>

      <main className="mx-3 sm:container sm:mx-auto flex-1">
        <div className="container mx-auto">
          <h1 className="text-3xl sm:text-4xl my-5">
            分配の考え方に関するアンケート調査
          </h1>
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
    </>
  );
}
