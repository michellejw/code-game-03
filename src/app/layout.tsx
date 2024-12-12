import type { Metadata } from "next";
import { Londrina_Shadow, Londrina_Solid, Inconsolata } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const londrinaShadow = Londrina_Shadow({
  weight: ['400'],
  subsets: ["latin"],
  variable: '--font-londrina-shadow',
});

const londrinaSolid = Londrina_Solid({
  weight: ['400'],
  subsets: ["latin"],
  variable: '--font-londrina-solid',
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: '--font-inconsolata',
});

export const metadata: Metadata = {
  title: "Code Challenge Scavenger Hunt",
  description: "A fun coding puzzle game for kids",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${londrinaShadow.variable} ${londrinaSolid.variable} ${inconsolata.variable} font-mono relative`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
