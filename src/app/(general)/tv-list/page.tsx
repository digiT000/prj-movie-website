"use client";
import ContentFetch from "@/utils/content";
import SearchBar from "@/components/SearchBar";
import ItemsListSection from "@/components/section/ItemsListSection";
import { SearchType } from "@/models/interface";
import React from "react";

export default function Tv() {
  const contentFetch = new ContentFetch();

  return (
    <section className="flex flex-col gap-10 w-full">
      <SearchBar type={SearchType.tv} />

      <ItemsListSection
        type={SearchType.tv}
        headers="Tv Show"
        fetchingData={contentFetch.fetchTvShow}
      />
    </section>
  );
}
