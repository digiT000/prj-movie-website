import { SearchResult } from "@/context/Searching";
import { MovieProps, ReturnPagination } from "@/models/interface";
import axios, { AxiosError } from "axios";
import { getBookmark } from "./profile.api";

const API_KEY = process.env.NEXT_PUBLIC_API_MOVIE_KEY;
axios.defaults.baseURL = "https://api.themoviedb.org/3";

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

const mappedResponse = (movieData: any) => {
  const mappedMovies: MovieProps[] = movieData.map((movie: any) => ({
    id: movie?.id,
    title: movie?.title || movie?.name,
    year:
      Number(movie.release_date?.split("-")[0]) ||
      Number(movie.first_air_date?.split("-")[0]) ||
      0,
    poster: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
      : movie.poster
      ? movie.poster
      : "/noImage.JPG",
    movieType: movie.media_type,
  }));
  return mappedMovies;
};

class ContentFetch {
  async fetchTrending() {
    const timeWindow = "week";
    const params = { language: "en-US" };
    try {
      const response = await axios.get(`/trending/all/${timeWindow}`, {
        params: params,
        headers: headers,
      });

      const movieData = response.data.results;
      return mappedResponse(movieData);
    } catch (error: any) {
      console.error("Error fetching trending movies:", error);
      return []; // Return empty array on error
    }
  }

  async fetchPopular(page: number = 1): Promise<ReturnPagination> {
    const params = { language: "en-US", page: page };
    try {
      const response = await axios.get(`/movie/popular`, {
        params: params,
        headers: headers,
      });
      const movieData = response.data.results;
      const totalPages = response.data.total_pages;
      const totalResults = response.data.total_results;
      const movies = mappedResponse(movieData).map((movie) => ({
        ...movie,
        movieType: "movie", // ✅ Assigning movieType manually
      }));
      return { totalPages, movies, totalResults };
    } catch (error: any) {
      console.error("Error fetching trending movies:", error);
      return { totalPages: 1, movies: [], totalResults: 0 }; // Return empty array on error
    }
  }

  async fetchMovies(page: number = 1): Promise<ReturnPagination> {
    const params = { language: "en-US", page: page };
    try {
      const response = await axios.get(`/movie/top_rated`, {
        params: params,
        headers: headers,
      });
      const movieData = response.data.results;
      const totalPages = response.data.total_pages;
      const totalResults = response.data.total_results;
      // ✅ Add `movieType` manually to each movie object
      const movies = mappedResponse(movieData).map((movie) => ({
        ...movie,
        movieType: "movie", // ✅ Assigning movieType manually
      }));

      return { totalPages, movies, totalResults };
    } catch (error: any) {
      console.error("Error fetching trending movies:", error);
      return { totalPages: 1, movies: [], totalResults: 0 }; // Return empty array on error
    }
  }

  async fetchTvShow(page: number = 1): Promise<ReturnPagination> {
    const params = { language: "en-US", page: page };
    try {
      const response = await axios.get(`/tv/top_rated`, {
        params: params,
        headers: headers,
      });
      const movieData = response.data.results;
      const totalPages = response.data.total_pages;
      const totalResults = response.data.total_results;
      const movies = mappedResponse(movieData).map((movie) => ({
        ...movie,
        movieType: "tv", // ✅ Assigning movieType manually
      }));
      return { totalPages, movies, totalResults };
    } catch (error: any) {
      console.error("Error fetching trending movies:", error);
      return { totalPages: 1, movies: [], totalResults: 0 }; // Return empty array on error
    }
  }

  async searchAll(query: string, page: number = 1): Promise<SearchResult> {
    const params = {
      language: "en-US",
      query: query,
      page: page,
      include_adult: "false",
    };
    try {
      const response = await axios.get(`/search/multi`, {
        params: params,
        headers: headers,
      });
      const movieData = response.data.results.filter(
        (result: any) =>
          result.media_type === "movie" || result.media_type === "tv"
      );
      const totalPages = response.data.total_pages;
      const totalResults: number = response.data.total_results;
      const movies = mappedResponse(movieData);

      // return { totalPages, movies, totalResults };
      return { totalResults, movies, totalPages };
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      // return { totalPages: 1, movies: [], totalResults: 0 }; // Return empty array on error
      return { totalPages: 1, totalResults: 0, movies: [] };
    }
  }

  async searchMovies(
    query: string,
    page: number = 1
  ): Promise<ReturnPagination> {
    const params = {
      language: "en-US",
      query: query,
      page: page,
      include_adult: "false",
    };
    try {
      const response = await axios.get(`/search/movie`, {
        params: params,
        headers: headers,
      });
      const movieData = response.data.results;
      const totalPages = response.data.total_pages;

      const totalResults = response.data.total_results;
      const movies = mappedResponse(movieData);

      return { totalPages, movies, totalResults };
    } catch (error: any) {
      console.error("Error fetching trending movies:", error);
      return { totalPages: 1, movies: [], totalResults: 0 }; // Return empty array on error
    }
  }
  async searchTvShow(
    query: string,
    page: number = 1
  ): Promise<ReturnPagination> {
    const params = {
      language: "en-US",
      query: query,
      page: page,
      include_adult: "false",
    };
    try {
      const response = await axios.get(`/search/tv`, {
        params: params,
        headers: headers,
      });
      const movieData = response.data.results;
      const totalPages = response.data.total_pages;

      const totalResults = response.data.total_results;
      const movies = mappedResponse(movieData);

      return { totalPages, movies, totalResults };
    } catch (error: any) {
      console.error("Error fetching trending movies:", error);
      return { totalPages: 1, movies: [], totalResults: 0 }; // Return empty array on error
    }
  }

  async fetchUserBookmark(
    authenticated: "authenticated" | "loading" | "unauthenticated"
  ) {
    if (authenticated === "authenticated") {
      console.log("Authenticated");
      try {
        const response = await getBookmark();
        console.log(response);
        const movieData = response.data;

        const movies = mappedResponse(movieData);

        return { totalPages: 1, movies, totalResults: 0 };
      } catch (error: any) {
        console.error("Error fetching trending movies:", error);
        return { totalPages: 1, movies: [], totalResults: 0 }; // Return empty array on error
      }
    } else {
      console.log("tes");
      return { totalPages: 1, movies: [], totalResults: 0 }; // Return empty array on error
    }
  }
}
export default ContentFetch;
