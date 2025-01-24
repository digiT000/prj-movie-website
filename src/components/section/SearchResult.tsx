import React from "react";
import SectionWrapper from "./SectionWrapper";

export default function SearchResult() {
  return (
    <SectionWrapper>
      <h1 className="text-heading-L font-light">Recommended for you</h1>
      <div className="items-grid">
        {isFetching ? (
          <span> Loading...</span>
        ) : (
          data.movies.map((movie: MovieProps) => {
            return <MovieCard key={movie.id} cardType="card" movie={movie} />;
          })
        )}
      </div>
    </SectionWrapper>
  );
}
