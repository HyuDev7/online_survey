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
            {/* <div className="buttons flex">
                  <div className="text-center mx-1">
                    <Link
                      href={`/${params.id}/check`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="buttonStyle mb-0 min-w-full text-sm sm:text-xl p-0.5 font-normal"
                    >
                      回答の確認
                    </Link>
                    <p className="text-xs font-normal">
                      ※今までの回答が別タブで開きます
                    </p>
                  </div>

                  <div className="text-center mx-1">
                    <Link
                      href={`/description`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="buttonStyle mb-0 min-w-full text-sm sm:text-xl p-0.5 font-normal"
                    >
                      質問の事前説明
                    </Link>
                    <p className="text-xs font-normal">
                      ※事前説明が別タブで開きます
                    </p>
                  </div>
                </div> */}
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
