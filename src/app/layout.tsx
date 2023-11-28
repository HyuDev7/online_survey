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
          {children}

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
