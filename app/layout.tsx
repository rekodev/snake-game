import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snake Game",
  description: "CS50 Final Project by rekodev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="mx-auto flex w-full max-w-screen-lg flex-1 flex-col px-6 py-4">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
