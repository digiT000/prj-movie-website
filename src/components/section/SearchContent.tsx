"use client";
import SearchBar from "@/components/SearchBar";
import SearchResult from "@/components/section/SearchResult";
import { useSearchingContext } from "@/context/Searching";
import { SearchType } from "@/models/interface";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function SearchContent() {
  //   const { searchTerm } = useSearchingContext();
  const { setSearchTerm } = useSearchingContext();

  const searchParams = useSearchParams()!;

  const searchType = searchParams.get("type");
  const searchQuery = searchParams.get("q");
  const page = searchParams.get("page");

  useEffect(() => {
    setSearchTerm({
      searchString: searchQuery || "",
      page: Number(page) || 1,
      searchType: searchType as SearchType, // Default search type if not provided in the URL query parameters.
    });
  }, [searchQuery, page, searchType, setSearchTerm]);

  return (
    <>
      <SearchBar
        searchString={(searchQuery as string) || ""}
        type={searchType as SearchType}
      />

      <SearchResult />
    </>
  );
}
