import type { Metadata } from "next";
import { Overlock } from 'next/font/google';
import "./globals.css";

const overlock = Overlock({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-overlock',
});

export const metadata: Metadata = {
  title: "Best Way",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${overlock.variable}`}
    >
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}