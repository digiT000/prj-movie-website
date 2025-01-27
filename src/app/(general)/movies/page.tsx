"use client";
import ContentFetch from "@/api/content";
import SearchBar from "@/components/SearchBar";
import ItemsListSection from "@/components/section/ItemsListSection";
import { SearchType } from "@/models/interface";
import React from "react";

export default function Movies() {
  const contentFetch = new ContentFetch();

  return (
    <section className="flex flex-col gap-10 w-full">
      <SearchBar type={SearchType.movies} />

      <ItemsListSection
        type={SearchType.movies}
        headers="Movies"
        fetchingData={contentFetch.fetchMovies}
      />
    </section>
  );
}
