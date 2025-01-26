"use client";
import ContentFetch from "@/api/content";
import { MovieProps, SearchType } from "@/models/interface";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

interface SearcingProviderProps {
  children: React.ReactNode;
}

interface SearchingProps {
  searchString: string;
  searchType: SearchType;
}

export interface SearchResult {
  totalResults: number;
  movies: MovieProps[];
}

interface SearchingContextType {
  searchTerm: SearchingProps;
  searchResult: SearchResult | undefined;
  setSearchTerm: (searchTerm: SearchingProps) => void;
  searchingData: ({
    searchString,
    searchType,
  }: SearchingProps) => Promise<SearchResult>;
  setIsSearching: (isSearching: boolean) => void;
  isSearching: boolean;
  isLoadingSearching: boolean;
}

// Initialize the context

const SearchingContext = createContext<SearchingContextType | undefined>(
  undefined
);

// Custom hook to access the context

export const useSearchingContext = () => {
  const context = useContext(SearchingContext);

  if (!context) {
    throw new Error(
      "useSearchingContext must be used within a SearchingProvider"
    );
  }

  return context;
};

export function SearchingProvider({ children }: SearcingProviderProps) {
  const contentFetch = new ContentFetch();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<SearchingProps>({
    searchString: "",
    searchType: SearchType.movies, // Default search type
  });

  const {
    data: searchResult,
    isFetching: isLoadingSearching,
    isError,
    error,
  } = useQuery({
    queryKey: ["search", searchTerm.searchString, searchTerm.searchType],
    queryFn: () =>
      searchingData({
        searchString: searchTerm.searchString,
        searchType: searchTerm.searchType,
      }),
    enabled: searchTerm.searchString.trim() !== "",
    staleTime: 1000 * 60 * 2,
  });

  // The function to fetch data (simulate API call or use real API)
  const searchingData = async ({
    searchString,
    searchType,
  }: SearchingProps): Promise<SearchResult> => {
    switch (searchType) {
      case SearchType.all:
        return await contentFetch.searchAll(searchString);
      // case SearchType.movies:
      //   return { totalResults: 0, movies: [] };
      // case SearchType.tv:
      //   return { totalResults: 0, movies: [] };

      // case SearchType.bookmarks:
      //   return { totalResults: 0, movies: [] };

      default:
        throw new Error("Unknown search type");
    }
  };

  const value: SearchingContextType = {
    searchTerm,
    setSearchTerm,
    isLoadingSearching, // Updated to renamed state
    searchingData,
    searchResult,
    isSearching,
    setIsSearching,
  };

  return (
    <SearchingContext.Provider value={value}>
      {children}
    </SearchingContext.Provider>
  );
}
