import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-rubik',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Solve9 - Smart Open-Source Sudoku for Mobile",
  description: "A fully-featured, ad-free Sudoku mobile app with intelligent puzzle generation, dark mode, hints, auto-complete, and beautiful animations. 100% open source.",
  keywords: ["sudoku", "mobile app", "open source", "puzzle game", "android", "ios"],
  authors: [{ name: "Solve9 Team" }],
  openGraph: {
    title: "Solve9 - Smart Open-Source Sudoku",
    description: "A fully-featured, ad-free Sudoku mobile app. 100% open source.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${rubik.variable}`} suppressHydrationWarning>
      <meta name="apple-mobile-web-app-title" content="Solve9" />
      <body className="font-rubik antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
