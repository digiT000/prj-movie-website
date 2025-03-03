"use client";
import ContentFetch from "@/utils/content";
import SearchBar from "@/components/SearchBar";
import ItemsListSection from "@/components/section/ItemsListSection";
import { SearchType } from "@/models/interface";
import React, { Suspense } from "react";

export default function Movies() {
  const contentFetch = new ContentFetch();

  return (
    <section className="flex flex-col gap-10 w-full">
      <SearchBar type={SearchType.movies} />

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
          type={SearchType.movies}
          headers="Movies"
          fetchingData={contentFetch.fetchMovies}
        />
      </Suspense>
    </section>
  );
}
