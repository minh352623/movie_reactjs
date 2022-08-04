import React, { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";
import { fetcher } from "../../config/config";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import useSWR from "swr";
import BannerItem from "./BannerItem";

const Banner = () => {
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=95f2419536f533cdaa1dadf83c606027`,
    fetcher
  );
  const banners = data?.results || [];
  console.log(banners);
  return (
    <section className="banner h-[600px] page-container pb-20 overflow-hidden">
      <Swiper grabCursor="true" slidesPerView={"auto"}>
        {banners.length > 0 &&
          banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <BannerItem info={banner}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Banner;
