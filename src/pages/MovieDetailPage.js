import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";

import { fetcher, tmdbAPI } from "../config/config";
import MovieCart from "../components/movie/MovieCart";
const MovieDetailPage = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(tmdbAPI.getMovieDetail(movieId), fetcher);

  return (
    <Fragment>
      <div className="w-full h-[600px] mb-10 relative text-white page-container">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(
            https://image.tmdb.org/t/p/original/${data?.backdrop_path}
          )`,
          }}
        ></div>
        <div className="w-full max-w-[1000px] mx-auto h-[600px] -mt-[300px] relative z-10 pb-10">
          <img
            src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
            alt=""
            className="w-full h-full object-cover rounded-lg "
          />
        </div>
        <h1 className="text-center text-4xl font-bold pb-10">{data?.title}</h1>
        {data?.genres?.length > 0 && (
          <div className="flex items-center justify-center gap-x-5 pb-10">
            {data.genres.map((ganre) => (
              <span
                key={ganre.id}
                className="py-3 px-6 border-primary border rounded-lg font-bold text-primary"
              >
                {ganre.name}
              </span>
            ))}
          </div>
        )}
        <p className="text-center text-sm pb-10 leading-8 max-w-[700px] mx-auto">
          {data?.overview}
        </p>
        <MovieCredit></MovieCredit>
        <MovieVideo></MovieVideo>
        <MovieSimilar></MovieSimilar>
      </div>
    </Fragment>
  );
};

function MovieCredit() {
  const { movieId } = useParams();
  const { data, error } = useSWR(tmdbAPI.getMovieCredits(movieId), fetcher);
  const { cast } = data || [];
  if (!data) return null;
  return (
    <div className="py-10">
      <h2 className="text-center text-3xl pb-10">Casts</h2>
      <div className="grid grid-cols-4 gap-5 pb-10">
        {cast.length > 0 &&
          cast.slice(0, 4).map((item) => {
            if (item.profile_path) {
              return (
                <div key={item.id} className="cast-item">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${item?.profile_path}`}
                    className="w-full h-[350px] object-cover rounded-lg mb-3"
                    alt=""
                  />
                  <h3 className="text-xl font-medium">{item.name}</h3>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

function MovieVideo() {
  const { movieId } = useParams();
  const { data, error } = useSWR(tmdbAPI.getMovieTrailer(movieId), fetcher);
  return (
    <div className="py-10">
      <h3 className="text-center text-3xl font-bold mb-10">Trailer</h3>
      <div className="flex flex-col gap-10">
        {data?.results?.slice(0, 2).map((item) => (
          <div key={item.id}>
            <h3 className="mb-5 text-xl font-medium p-3 bg-secondery inline-block rounded-lg">
              {item.name}
            </h3>
            <div className="w-full aspect-video" key={item.id}>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${item.key}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-fill"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieSimilar() {
  const { movieId } = useParams();
  const { data, error } = useSWR(tmdbAPI.getMovieSimilar(movieId), fetcher);
  if (!data) return null;
  const { results } = data;
  console.log(data);
  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium mb-10">Similar</h2>
      <div className="movie-list text-white">
        <Swiper grabCursor={true} spaceBetween={25} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCart info={item}></MovieCart>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieDetailPage;
