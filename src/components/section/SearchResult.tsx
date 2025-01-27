"use client";
import "../../styles/ItemList.css";
import React from "react";
import SectionWrapper from "./SectionWrapper";
import { useSearchingContext } from "@/context/Searching";
import MovieCard from "../MovieCard";
import { MovieProps } from "@/models/interface";
import Pagination from "../Pagination";
import { useRouter } from "next/navigation";

export default function SearchResult() {
  const router = useRouter();
  const { searchResult, isLoadingSearching, searchTerm, setSearchTerm } =
    useSearchingContext();

  function handlePagination(page: number) {
    // Update the searchTerm with the new page value
    setSearchTerm({
      page,
      searchString: searchTerm.searchString,
      searchType: searchTerm.searchType,
    });
    const currentSearchParams = new URLSearchParams(window.location.search);
    currentSearchParams.set("page", String(page));
    router.replace(`?${currentSearchParams.toString()}`);
  }

  if (isLoadingSearching) {
    return <span>Loading...</span>;
  }

  return (
    <SectionWrapper>
      <h1 className="text-heading-L font-light">
        Found {searchResult?.totalResults} results for{" "}
        {`'${searchTerm.searchString}'`}
      </h1>
      <div className="items-grid">
        {isLoadingSearching ? (
          <span>Loading...</span>
        ) : (
          searchResult?.movies.map((movie: MovieProps) => {
            return <MovieCard key={movie.id} cardType="card" movie={movie} />;
          })
        )}
      </div>
      <Pagination
        className="w-full flex justify-center"
        currentPage={searchTerm.page}
        onPageChange={(page) => handlePagination(page)}
        pageSize={searchResult?.totalPages as number}
        totalCount={searchResult?.totalResults as number}
      />
    </SectionWrapper>
  );
}
