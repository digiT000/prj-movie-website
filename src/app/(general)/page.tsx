import React from "react";
import "../../styles/ItemList.css";
import TrendingSection from "@/components/section/TrendingSection";
import ItemsListSection from "@/components/section/ItemsListSection";
import SearchBar from "@/components/SearchBar";
import { SearchType } from "@/models/interface";
export default function Home() {
  return (
    <section className="flex flex-col gap-10 w-full">
      <SearchBar type={SearchType.movies} />
      <TrendingSection />
      <ItemsListSection />
    </section>
  );
}
