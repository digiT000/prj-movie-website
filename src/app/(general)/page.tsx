import React from "react";
import MovieCard from "@/components/MovieCard";
import { movieData, trendingData } from "@/data/homepageDataDummy";
import "../../styles/ItemList.css";
import SliderItems from "@/components/SliderItems";
import TrendingSection from "@/components/section/TrendingSection";
import ItemsListSection from "@/components/section/ItemsListSection";

export default function Home() {
  return (
    <section className="flex flex-col gap-10 w-full">
      <TrendingSection />
      <ItemsListSection />
    </section>
  );
}
