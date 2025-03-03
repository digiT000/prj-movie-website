// "use client";
import { Outfit } from "next/font/google";
import "../globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} bg-dark_blue text-pure_white antialiased font-sans`}
      >
        <main className="px-5 max-w-screen-xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
