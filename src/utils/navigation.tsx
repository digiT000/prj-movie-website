import { Home, Film, Tv, FileVideo } from "lucide-react";

interface NavLinkProps {
  link: NavMaps;
  label: string;
  icon: React.FC<any>; // LucideIcon type
}

export enum NavMaps {
  LOGIN = "/auth/login",
  REGSITER = "/auth/register",
  HOME = "/",
  MOVIES = "/movies",
  TV = "/tv-list",
  MOVIE_DETAILS = "/movies/:id",
  BOOKMARKS = "/profile/watch-list",
  PROFILE = "/profile",
}
export const navLinks: NavLinkProps[] = [
  { link: NavMaps.HOME, label: "Home", icon: Home },
  { link: NavMaps.MOVIES, label: "Movies", icon: Film },
  { link: NavMaps.TV, label: "TV", icon: Tv },
  { link: NavMaps.BOOKMARKS, label: "Watch List", icon: FileVideo },
];
