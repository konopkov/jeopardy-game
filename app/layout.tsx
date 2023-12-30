import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Header } from "@/components/ui/header";

import "./globals.css";
import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jeopardy!",
  description: "Play Jeopardy! with your friends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} p-10 h-screen w-screen ${styles.page}`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
