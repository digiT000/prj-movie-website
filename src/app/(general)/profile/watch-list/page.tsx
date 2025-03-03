"use client";
import MovieCard from "@/components/MovieCard";
import SectionWrapper from "@/components/section/SectionWrapper";
import { useWatchListContext } from "@/context/WatchListContext";
import { MovieProps } from "@/models/interface";
import "../../../../styles/ItemList.css";
import React from "react";
import { useSession } from "next-auth/react";
import Button from "@/components/Button";
import Link from "next/link";
import { NavMaps } from "@/utils/navigation";
import { useRouter } from "next/navigation";

export default function WatchList() {
  const router = useRouter();
  const { movieList, tvList, loading } = useWatchListContext();
  const { status } = useSession();

  return status === "authenticated" ? (
    <section className="flex flex-col gap-10 w-full">
      <SectionWrapper>
        <h1 className="text-heading-L font-light">Bookmarked Movies</h1>
        <div className="items-grid">
          {loading ? (
            <span> Loading...</span>
          ) : (
            movieList.map((movie: MovieProps) => {
              return <MovieCard key={movie.id} cardType="card" movie={movie} />;
            })
          )}
        </div>
      </SectionWrapper>
      <SectionWrapper>
        <h1 className="text-heading-L font-light">Bookmarked TV Series</h1>
        <div className="items-grid">
          {loading ? (
            <span> Loading...</span>
          ) : (
            tvList.map((movie: MovieProps) => {
              return <MovieCard key={movie.id} cardType="card" movie={movie} />;
            })
          )}
        </div>
      </SectionWrapper>
    </section>
  ) : (
    <div className="w-full h-svh flex flex-col justify-center items-center max-w-[400px] mx-auto gap-10">
      <h1 className="text-heading-L font-light text-center">
        You need to be logged in to see your watchlist.
      </h1>
      <Button onClick={() => router.push(NavMaps.LOGIN)} type="button">
        Login Now
      </Button>
      <div className="text-center">
        <p>{`Don't have an account?`}</p>
        <Link className="text-red hover:text-dark_red" href={NavMaps.REGSITER}>
          Sign Up
        </Link>
      </div>
    </div>
  );
}
