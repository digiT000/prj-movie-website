"use client";
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

interface SearchingContextType {
  searchTerm: SearchingProps;
  searchResult: MovieProps[] | undefined;
  setSearchTerm: (searchTerm: SearchingProps) => void;
  searchingData: ({
    searchString,
    searchType,
  }: SearchingProps) => Promise<MovieProps[]>;
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
  const [searchTerm, setSearchTerm] = useState<SearchingProps>({
    searchString: "",
    searchType: SearchType.movies, // Default search type
  });

  const {
    data: searchResult,
    isFetching: isSearching,
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
  }: SearchingProps): Promise<MovieProps[]> => {
    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(`Searching for ${searchType}: ${searchString}`);

    // Example logic for handling different search types (replace with API calls)
    switch (searchType) {
      case SearchType.movies:
        return mockSearchMovies(searchString); // Replace with actual API call
      case SearchType.tv:
        return mockSearchTV(searchString); // Replace with actual API call
      case SearchType.bookmarks:
        return mockSearchBookmarks(searchString); // Replace with actual API call
      default:
        throw new Error("Unknown search type");
    }
  };

  // Mock functions for search (replace with real API calls)
  const mockSearchMovies = (searchString: string): MovieProps[] => {
    console.log(`Mock searching movies with: ${searchString}`);
    return []; // Replace with mock data or API result
  };

  const mockSearchTV = (searchString: string): MovieProps[] => {
    console.log(`Mock searching TV with: ${searchString}`);
    return []; // Replace with mock data or API result
  };

  const mockSearchBookmarks = (searchString: string): MovieProps[] => {
    console.log(`Mock searching bookmarks with: ${searchString}`);
    return []; // Replace with mock data or API result
  };

  const value: SearchingContextType = {
    searchTerm,
    setSearchTerm,
    isSearching,
    searchingData,
    searchResult,
    isLoadingSearching: isSearching,
  };

  return (
    <SearchingContext.Provider value={value}>
      {children}
    </SearchingContext.Provider>
  );
}
