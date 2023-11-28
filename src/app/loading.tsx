import Image from "next/image";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
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
          <div className="container mx-auto flex flex-col justify-center mt-3">
            <div>
              <Image
                src="/Infinity_loading.gif"
                width={400}
                height={400}
                alt="loading animation"
                className="mx-auto"
              />
            </div>
            <div className="text-center">
              <h1>ページの読み込み中です...</h1>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
