"use client";
import ContentFetch from "@/utils/content";
import { MovieProps, SearchType } from "@/models/interface";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";

interface SearcingProviderProps {
  children: React.ReactNode;
}

interface SearchingProps {
  searchString: string;
  searchType: SearchType;
  page: number;
}

export interface SearchResult {
  totalResults: number;
  totalPages: number;
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
    page: 1,
  });

  const { data: searchResult, isPending: isLoadingSearching } = useQuery({
    queryKey: [
      "search",
      searchTerm.searchString,
      searchTerm.searchType,
      searchTerm.page,
    ],
    queryFn: () =>
      searchingData({
        searchString: searchTerm.searchString,
        searchType: searchTerm.searchType,
        page: searchTerm.page,
      }),
    enabled: searchTerm.searchString.trim() !== "",
    staleTime: 1000 * 60 * 2,
    placeholderData: keepPreviousData,
  });

  // The function to fetch data (simulate API call or use real API)
  const searchingData = async ({
    searchString,
    searchType,
    page,
  }: SearchingProps): Promise<SearchResult> => {
    switch (searchType) {
      case SearchType.all:
        return await contentFetch.searchAll(searchString, page);
      case SearchType.movies:
        return await contentFetch.searchMovies(searchString, page);
      case SearchType.tv:
        return await contentFetch.searchTvShow(searchString, page);

      // case SearchType.bookmarks:
      //   return { totalResults: 0, movies: [] };

      default:
        return { totalResults: 0, movies: [], totalPages: 0 };
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
