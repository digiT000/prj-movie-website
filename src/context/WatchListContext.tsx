"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { MovieProps, WatchlistProps } from "@/models/interface";
import {
  addNewBookmark,
  getBookmark,
  removeBookmark,
} from "@/utils/profile.api";
import { useSession } from "next-auth/react";

interface WatchlistProviderProps {
  children: React.ReactNode;
}
interface WatchListContextType {
  watchList: WatchlistProps[];
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
  const { status } = useSession();

  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [watchList, setWatchList] = useState<WatchlistProps[]>([]); // Watchlist state

  // Fetch the watchlist from localStorage on component mount
  useEffect(() => {
    setLoading(true); // Start loading
    const fetchWatchList = async () => {
      try {
        if (status !== "authenticated") {
          return;
        }
        const response = await getBookmark();
        if (response.success) {
          setWatchList(response.data); // Set watchlist
          return;
        }
        setWatchList([]);
      } catch (error) {
        console.error("Error fetching watchlist from localStorage:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchWatchList();
  }, [status]);

  const addToWachList = async (movie: MovieProps) => {
    try {
      if (status !== "authenticated") {
        return;
      }
      const newBookmark = await addNewBookmark(movie);
      if (newBookmark.success) {
        setWatchList((prev) => [...prev, newBookmark.data]);
      } else {
        console.error("Error adding bookmark:", newBookmark.error);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };
  const removeFromWatchList = async (movieId: number) => {
    try {
      if (status !== "authenticated") {
        return;
      }
      const response = await removeBookmark(movieId);
      if (response.success) {
        setWatchList((prev) =>
          prev.filter((movie) => Number(movie.id) !== movieId)
        );
        return;
      } else {
        console.error("Error removing bookmark:", response.error);
        return; // Retry removing bookmark if failed for some reason (e.g., rate limit exceeded)
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return; // Retry removing bookmark if failed for some reason (e.g., rate limit exceeded)
    }
  };

  const isWatchList = (movieId: number) => {
    return watchList.some((movie) => Number(movie.id) === movieId);
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
