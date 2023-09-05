import "../../public/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
            <div className="container mx-auto">
              <nav>
                <h1 className="my-2">応用経済分析研究室</h1>
              </nav>
            </div>
          </header>

          <div className="container mx-auto flex-1">{children}</div>

          <footer className="mt-12 border-t-2 border-black w-full">
            <div className="container mx-auto mt-2">
              <div className="flex flex-row">
                <div>
                  <h3 className="my-1 font-bold">応用経済分析研究室</h3>
                </div>
              </div>
            </div>
          </footer>

        </div>
      </body>
    </html>
  );
}
