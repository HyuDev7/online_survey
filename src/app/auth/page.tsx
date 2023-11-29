import AuthComp from "@/components/AuthComp";

export default function page() {
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
      <AuthComp />
    </>
  );
}
