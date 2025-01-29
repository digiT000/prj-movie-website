"use client";
import { Outfit } from "next/font/google";
import "../globals.css";
import "../../styles/Sidebar.css";
import SideBar from "@/components/SideBar";
import { WatchListProvider } from "@/context/WatchListContext";
import { SearchingProvider } from "@/context/Searching";
import NavigationBar from "@/components/NavigatioBar";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

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
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <SearchingProvider>
              <WatchListProvider>
                <div className="sidebar min-h-screen">
                  <NavigationBar />
                  <SideBar />
                  <main className="pt-5 pr-5 pb-5 max-w-full mx-auto flex-1 overflow-x-auto w-full">
                    {children}
                  </main>
                </div>
              </WatchListProvider>
            </SearchingProvider>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
