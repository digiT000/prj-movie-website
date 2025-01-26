"use client";

import React from "react";
import SectionWrapper from "./SectionWrapper";
import { useSearchingContext } from "@/context/Searching";
import MovieCard from "../MovieCard";
import { MovieProps } from "@/models/interface";

export default function SearchResult() {
  const { searchResult, isLoadingSearching, searchTerm } =
    useSearchingContext();
  console.log(searchResult);

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
    </SectionWrapper>
  );
}
