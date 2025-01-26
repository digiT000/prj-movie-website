"use client";
import React, { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import MovieCard from "../MovieCard";
import ContentFetch from "@/api/content";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { MovieProps } from "@/models/interface";
import Pagination from "../Pagination";
import { useSearchParams, useRouter } from "next/navigation";

export default function ItemsListSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page");

  const contentFetch = new ContentFetch();
  const [currentPage, setCurrentPage] = useState<number>(Number(page) || 1);
  const { isPending, isError, data, error, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["POPULAR", currentPage],
      queryFn: () => contentFetch.fetchPopular(currentPage),
      placeholderData: keepPreviousData,
    });

  function handlePagination(page: number) {
    setCurrentPage(page);
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("page", String(page));
    router.replace(`?${newSearchParams.toString()}`);
  }

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <SectionWrapper>
      <h1 className="text-heading-L font-light">Recommended for you</h1>
      <div className="items-grid">
        {isFetching ? (
          <span> Loading...</span>
        ) : (
          data.movies.map((movie: MovieProps) => {
            return <MovieCard key={movie.id} cardType="card" movie={movie} />;
          })
        )}
      </div>
      <Pagination
        className="w-full flex justify-center"
        currentPage={currentPage}
        onPageChange={(page) => handlePagination(page)}
        pageSize={data.totalPages}
        totalCount={data.totalResults}
      />
    </SectionWrapper>
  );
}
