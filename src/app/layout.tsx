import "../../public/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "応用経済分析研究室",
  description: "卒業研究のためのサイトです",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="border-b-2 border-black font-bold tracking-tight w-full">
            <div className="mx-3 sm:container sm:mx-auto">
              <nav className="flex justify-between">
                <div>
                  <h1 className="text-lg sm:text-4xl my-3">応用経済分析研究室</h1>
                </div>
                <div>
                  <Link href="">
                    <h1 className="text-lg sm:text-4xl my-3 font-normal">実験の事前説明</h1>
                  </Link>
                </div>
              </nav>
            </div>
          </header>

          <div className="mx-3 sm:container sm:mx-auto flex-1">
            {children}
          </div>

          <footer className="mt-12 border-t-2 border-black w-full">
            <div className="mx-3 sm:container sm:mx-auto my-3">
              <div className="flex flex-row">
                <div>
                  <h3 className="font-bold">応用経済分析研究室</h3>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
