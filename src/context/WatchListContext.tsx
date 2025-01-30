"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { MovieProps } from "@/models/interface";
import { addNewBookmark } from "@/utils/profile.api";

interface WatchlistProviderProps {
  children: React.ReactNode;
}
interface WatchListContextType {
  watchList: MovieProps[];
  addToWachList: (movie: MovieProps) => Promise<void>; // Add `Promise<void>`
  removeFromWatchList: (movieId: number) => void;
  isWatchList: (movieId: number) => boolean;
  loading: boolean;
}
// Initialize the context
const WatchListContext = createContext<WatchListContextType | undefined>(
  undefined
);

// Custom hook to access the context
export const useWatchListContext = () => {
  const context = useContext(WatchListContext);
  if (!context) {
    throw new Error(
      "useWatchListContext must be used within a WatchListProvider"
    );
  }
  return context;
};

export function WatchListProvider({ children }: WatchlistProviderProps) {
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [watchList, setWatchList] = useState<MovieProps[]>([]); // Watchlist state

  // Fetch the watchlist from localStorage on component mount
  useEffect(() => {
    setLoading(true); // Start loading
    const fetchWatchList = async () => {
      try {
        const storedWatchList = localStorage.getItem("user_watchList");
        if (storedWatchList) {
          setWatchList(JSON.parse(storedWatchList)); // Parse and set watchlist
        }
      } catch (error) {
        console.error("Error fetching watchlist from localStorage:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchWatchList();
  }, []);

  const addToWachList = async (movie: MovieProps) => {
    try {
      const newBookmark = await addNewBookmark(movie);
      if (newBookmark.success) {
        setWatchList((prev) => [...prev, movie]);
      } else {
        console.error("Error adding bookmark:", newBookmark.error);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };
  const removeFromWatchList = (movieId: number) => {
    setWatchList((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isWatchList = (movieId: number) => {
    return watchList.some((movie) => movie.id === movieId);
  };

  const value: WatchListContextType = {
    watchList,
    addToWachList,
    removeFromWatchList,
    isWatchList,
    loading,
  };

  useEffect(() => {
    try {
      localStorage.setItem("user_watchList", JSON.stringify(watchList));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }, [watchList]);

  return (
    <WatchListContext.Provider value={value}>
      {children}
    </WatchListContext.Provider>
  );
}
