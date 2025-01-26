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

export interface SearchBarProps {
  searchString?: string;
  type: SearchType;
}
