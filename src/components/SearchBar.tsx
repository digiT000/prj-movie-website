"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useSearchingContext } from "@/context/Searching";
import { SearchBarProps, SearchType } from "@/models/interface";
import { useRouter } from "next/navigation";

export default function SearchBar({ searchString, type }: SearchBarProps) {
  const router = useRouter();

  const { setSearchTerm, setIsSearching } = useSearchingContext();
  const [inputSearch, setInputSearch] = useState<string>(searchString || "");

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearching(true);
    setSearchTerm({
      searchString: inputSearch,
      searchType: type,
      page: 1,
    });

    // Delay navigation until router is ready
    if (router) {
      router.push(`/search?q=${inputSearch}&type=${type}&page=${1}`);
    } else {
      console.error("Router is not ready");
    }
  };

  const renderPlaceholder = () => {
    switch (type) {
      case SearchType.all:
        return "Search for movies or TV series";
      case SearchType.movies:
        return "Search for movies";
      case SearchType.tv:
        return "Search for TV series";
      case SearchType.bookmarks:
        return "Search for bookmarked shows";
      default:
        return "Search for movies or TV series";
    }
  };

  return (
    <form onSubmit={handleSearch} className="-mb-5 flex items-center gap-2">
      <Search />
      <input
        className="p-4 text-heading-XS bg-transparent border-b-2 border-b-transparent text-pure_white w-full focus-visible:border-pure_white focus-visible:border-opacity-50 focus-visible:border-b-2 focus-visible:outline-none"
        type="text"
        placeholder={renderPlaceholder()}
        value={inputSearch}
        onChange={(e) => setInputSearch(e.target.value)}
      />
    </form>
  );
}
