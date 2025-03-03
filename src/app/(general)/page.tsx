"use client";
import React, { Suspense } from "react";
import TrendingSection from "@/components/section/TrendingSection";
import ItemsListSection from "@/components/section/ItemsListSection";
import SearchBar from "@/components/SearchBar";
import { SearchType } from "@/models/interface";
import ContentFetch from "@/utils/content";
export default function Home() {
  const contentFetch = new ContentFetch();

  return (
    <section className="flex flex-col gap-10 w-full">
      <SearchBar type={SearchType.all} />
      <TrendingSection />
      <Suspense
        fallback={
          <div className="min-h-screen w-full flex justify-center items-center ">
            <p className="text-xl text-center text-pure_white font-bold">
              Loading...
            </p>
          </div>
        }
      >
        <ItemsListSection
          type={SearchType.all}
          headers="Recommended for you"
          fetchingData={contentFetch.fetchPopular}
        />
      </Suspense>
    </section>
  );
}
