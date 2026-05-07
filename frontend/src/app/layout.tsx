import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "RecruitSmart LBS",
  description: "AI-powered recruitment pipeline scaffold for LBS MBA students"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="min-w-0 flex-1">
            <div className="mx-auto w-full max-w-7xl px-8 py-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
