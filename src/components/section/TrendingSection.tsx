"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import SectionWrapper from "./SectionWrapper";
import SliderItems from "../SliderItems";
import ContentFetch from "@/utils/content";

export default function TrendingSection() {
  const contentFetch = new ContentFetch();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["TRENDING"],
    queryFn: contentFetch.fetchTrending,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <SectionWrapper>
      <h1 className="text-heading-L font-light">Trending</h1>
      <SliderItems items={data} />
    </SectionWrapper>
  );
}
