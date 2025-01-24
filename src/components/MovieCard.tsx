"use client";
import { useWatchListContext } from "@/context/WatchListContext";
import { MovieProps } from "@/models/interface";
import { Circle, Film, Tv } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ButtonBookmark from "./ButtonBookmark";

interface MovieCardProps {
  cardType: "card" | "carousel";
  movie: MovieProps;
}

export default function MovieCard({ cardType, movie }: MovieCardProps) {
  const { isWatchList, loading } = useWatchListContext();

  const isActive = isWatchList(movie.id);

  const movieTypeRender = () => {
    switch (movie.movieType) {
      case "movie":
        return (
          <div className="flex items-center gap-1">
            <Film size={12} /> Movie
          </div>
        );
      case "tv":
        return (
          <div className="flex items-center gap-1">
            <Tv size={12} /> Tv Series
          </div>
        );
      default:
        return null;
    }
  };

  switch (cardType) {
    case "card":
      return (
        <div className="flex flex-col gap-2">
          {/* Poster Image */}
          <div className="relative">
            <Link href={`/movies/${movie.id}`} className="block">
              <Image
                alt={movie.title}
                src={movie.poster}
                width={500}
                height={500}
                className="aspect-3/2 object-cover rounded-lg min-h-[180px] "
              />
            </Link>
            {loading ? (
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-greyish_blue transition-colors animate-pulse"></div>
            ) : (
              <ButtonBookmark
                isActive={isActive}
                movie={movie}
                key={movie.id}
              />
            )}
          </div>
          <div>
            <div className="text-body-S flex items-center gap-2 opacity-75">
              <span>{movie.year}</span>
              <Circle width={3} height={3} className="bg-pure_white" />
              <span>{movieTypeRender()}</span>
            </div>
            <h2 className="text-heading-XS font-medium">{movie.title}</h2>
          </div>
        </div>
      );
    case "carousel":
      return (
        <div className="flex flex-col gap-2 w-[470px] min-h-[270px]">
          {/* Poster Image */}
          <div className="relative h-full">
            <Link href={`/movies/${movie.id}`} className="block">
              <Image
                alt={movie.title}
                src={movie.poster}
                width={500}
                height={500}
                className="aspect-3/2 object-cover rounded-lg min-h-[180px] "
              />
            </Link>
            {loading ? (
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-greyish_blue transition-colors animate-pulse"></div>
            ) : (
              <ButtonBookmark
                isActive={isActive}
                movie={movie}
                key={movie.id}
              />
            )}
            <div className="absolute bottom-0 p-4 w-full">
              <div className="text-body-S flex items-center gap-2 opacity-75">
                <span>{movie.year}</span>
                <Circle width={3} height={3} className="bg-pure_white" />
                <span>{movieTypeRender()}</span>
              </div>
              <h2 className="text-heading-XS font-medium">{movie.title}</h2>
            </div>
          </div>
        </div>
      );
  }
}
