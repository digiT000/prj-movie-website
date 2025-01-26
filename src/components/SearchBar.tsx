"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useSearchingContext } from "@/context/Searching";
import { SearchBarProps } from "@/models/interface";
import { useRouter } from "next/navigation";

export default function SearchBar({ searchString, type }: SearchBarProps) {
  const router = useRouter();

  const { setSearchTerm, setIsSearching, searchTerm } = useSearchingContext();
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

  return (
    <form onSubmit={handleSearch} className="-mb-5 flex items-center gap-2">
      <Search />
      <input
        className="p-4 text-heading-XS bg-transparent border-b-2 border-b-transparent text-pure_white w-full focus-visible:border-pure_white focus-visible:border-opacity-50 focus-visible:border-b-2 focus-visible:outline-none"
        type="text"
        placeholder="Search for movies or TV series"
        value={inputSearch}
        onChange={(e) => setInputSearch(e.target.value)}
      />
    </form>
  );
}
