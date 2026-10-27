import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const davinci = Playfair_Display({
  variable: "--font-davinci",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const helveticaNow = Inter({
  variable: "--font-helvetica-now",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Structured — Renaissance Gallery on Putty Paper",
  description: "Real yield on Bitcoin. Structured treats finance as a gallery exhibition: restrained, authoritative, slightly precious.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${davinci.variable} ${helveticaNow.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#c4c3b6] text-[#000000] font-sans selection:bg-[#000000] selection:text-[#ffffff]">
        {children}
      </body>
    </html>
  );
}
