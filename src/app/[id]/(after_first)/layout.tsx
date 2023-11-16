import "../../../../public/styles/globals.css";
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
  params,
}: {
  children: React.ReactNode;
  params: {
    id: string;
  };
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="border-b-2 border-black font-bold tracking-tight w-full">
            <div className="mx-3 sm:container sm:mx-auto">
              <nav className="flex justify-between items-end">
                <div>
                  <h1 className="text-lg sm:text-4xl my-3">
                    応用経済分析研究室
                  </h1>
                </div>

                <div className="buttons flex">
                  <div className="text-center mx-1">
                    <Link
                      href={`/${params.id}/check`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="buttonStyle mb-0 min-w-full text-xl p-0.5 font-normal"
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
                      className="buttonStyle mb-0 min-w-full text-xl p-0.5 font-normal"
                    >
                      調査の事前説明
                    </Link>
                    <p className="text-xs font-normal">
                      ※事前説明が別タブで開きます
                    </p>
                  </div>
                </div>
              </nav>
            </div>
          </header>

          <div className="mx-3 sm:container sm:mx-auto flex-1">{children}</div>

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
