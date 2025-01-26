"use client";
import SearchBar from "@/components/SearchBar";
import SearchResult from "@/components/section/SearchResult";
import { SearchType } from "@/models/interface";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function page() {
  //   const { searchTerm } = useSearchingContext();
  const searchParams = useSearchParams();
  const searchType = searchParams.get("search");
  const searchQuery = searchParams.get("q");

  console.log("RESULT", searchType, searchQuery);

  return (
    <section className="flex flex-col gap-10 w-full">
      <SearchBar type={SearchType.all} />
      <SearchResult />
    </section>
  );
}
