import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCart from "./MovieCart";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config/config";
// https://api.themoviedb.org/3/movie/now_playing?api_key=95f2419536f533cdaa1dadf83c606027&language=en-US&page=1
const MovieList = ({ type = "now_playing" }) => {
  const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);

  const movies = data?.results || [];

  // console.log(movies);

  return (
    <div className="movie-list text-white">
      <Swiper grabCursor={true} spaceBetween={25} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCart info={item}></MovieCart>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
