"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import "swiper/css";
import "swiper/css/navigation";
import { MovieProps } from "@/models/interface";
import { Navigation } from "swiper/modules";
interface ItemList {
  items: MovieProps[]; // Movie object from the API response
}

export default function SliderItems({ items }: ItemList) {
  return (
    <div className="w-full">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={32}
        className="mySwiper"
        navigation={{ enabled: true }}
        modules={[Navigation]}
      >
        {items.map((movie, key: number) => {
          return (
            <SwiperSlide className="!w-fit" key={key}>
              <MovieCard cardType="carousel" movie={movie} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
