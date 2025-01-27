"use client";
import React from "react";
import TrendingSection from "@/components/section/TrendingSection";
import ItemsListSection from "@/components/section/ItemsListSection";
import SearchBar from "@/components/SearchBar";
import { SearchType } from "@/models/interface";
import ContentFetch from "@/api/content";
export default function Home() {
  const contentFetch = new ContentFetch();

  return (
    <section className="flex flex-col gap-10 w-full">
      <SearchBar type={SearchType.all} />
      <TrendingSection />
      <ItemsListSection
        type={SearchType.all}
        headers="Recommended for you"
        fetchingData={contentFetch.fetchPopular}
      />
    </section>
  );
}
