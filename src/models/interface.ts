export enum SearchType {
  movies = "movies",
  tv = "tv",
  bookmarks = "bookmarks",
  all = "all", // This will include all types of search results (movies, tv, and bookmarks)
}

export interface MovieProps {
  id: number;
  title: string;
  year: number;
  poster: string;
  movieType: string;
}

// ✅ Correct syntax: Using `extends` to inherit properties from `MovieProps`
export interface WatchlistProps extends MovieProps {
  bookmarkId: string;
}

export interface SearchBarProps {
  searchString?: string;
  type: SearchType;
}
export interface ReturnPagination {
  totalPages: number;
  movies: MovieProps[];
  totalResults: number;
}

// ----------------------------------------------------------------
// AUTH INTERFACE
export interface UserProps {
  name: string;
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  name: string | null;
  email: string;
  password: string | null;
  image: string | null;
}
