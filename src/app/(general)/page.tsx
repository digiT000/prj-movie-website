"use client";
import React from "react";
import "../../styles/ItemList.css";
import TrendingSection from "@/components/section/TrendingSection";
import ItemsListSection from "@/components/section/ItemsListSection";
import SearchBar from "@/components/SearchBar";
import { SearchType } from "@/models/interface";
import { useSearchingContext } from "@/context/Searching";
export default function Home() {
  return (
    <section className="flex flex-col gap-10 w-full">
      <SearchBar type={SearchType.all} />
      <TrendingSection />
      <ItemsListSection />
    </section>
  );
}
