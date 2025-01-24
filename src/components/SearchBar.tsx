"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useSearchingContext } from "@/context/Searching";
import { SearchBarProps } from "@/models/interface";

export default function SearchBar({ type }: SearchBarProps) {
  const [inputSearch, setInputSearch] = useState<string>("");
  const { setSearchTerm, searchingData } = useSearchingContext();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm({
      searchString: inputSearch,
      searchType: type,
    }); // Set the search term
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
