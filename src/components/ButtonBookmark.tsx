import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import { useWatchListContext } from "@/context/WatchListContext";
import { MovieProps } from "@/models/interface";

interface BookmarkProps {
  isActive: boolean;
  movie: MovieProps; // Movie object from the API response
}

export default function ButtonBookmark({ isActive, movie }: BookmarkProps) {
  const { addToWachList, removeFromWatchList } = useWatchListContext();
  const [isDisable, setIsDisable] = useState<boolean>(false);

  async function handleBookmark(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation(); // Prevent the Link from being triggered
    if (isActive) {
      removeFromWatchList(movie.id);
    } else {
      setIsDisable(true);
      await addToWachList(movie);
      setIsDisable(false);
    }
  }

  const activeStyle = isActive
    ? "text-transparent fill-pure_white group-hover:fill-red"
    : "text_pure_white group-hover:text-dark_blue";
  return (
    <button
      onClick={handleBookmark}
      disabled={isDisable}
      className="group absolute top-4 right-4 p-2 bg-dark_blue bg-opacity-50 rounded-full hover:bg-opacity-100 hover:bg-pure_white transition-all duration-300 ease-in-out"
    >
      <Bookmark
        className={`w-4 h-4  transition-colors duration-300 ease-in-out ${activeStyle}`}
      />
    </button>
  );
}
