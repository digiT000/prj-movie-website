"use client";
import SearchBar from "@/components/SearchBar";
import ItemsListSection from "@/components/section/ItemsListSection";
import { SearchType } from "@/models/interface";
import ContentFetch from "@/utils/content";
import { useSession } from "next-auth/react";
import React from "react";

export default function WatchList() {
  const { data, status } = useSession();
  const contentFetch = new ContentFetch();
  return (
    <section className="flex flex-col gap-10 w-full">
      <SearchBar type={SearchType.bookmarks} />
      <ItemsListSection
        usePagination={false}
        type={SearchType.tv}
        headers="Tv Show"
        fetchingData={() => contentFetch.fetchUserBookmark(status)}
      />
    </section>
  );
}
