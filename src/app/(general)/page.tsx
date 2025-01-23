import React from "react";
import MovieCard from "@/components/MovieCard";
import { movieData, trendingData } from "@/data/homepageDataDummy";
import "../../styles/ItemList.css";
import SliderItems from "@/components/SliderItems";

export default function Home() {
  return (
    <section className="flex flex-col gap-10 ">
      <section className="flex flex-col gap-4">
        <h1 className="text-heading-L font-light">Trending</h1>
        <SliderItems items={movieData} />
      </section>
      <section className="flex flex-col gap-4">
        <h1 className="text-heading-L font-light">Recommended for you</h1>
        <div className="items-grid">
          {movieData.map((movie) => {
            return <MovieCard key={movie.id} cardType="card" movie={movie} />;
          })}
        </div>
      </section>
    </section>
  );
}
