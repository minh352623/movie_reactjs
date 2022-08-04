import React from "react";
import ButtonPrimary from "../button/ButtonPrimary";
import { useNavigate } from "react-router-dom";
const BannerItem = ({ info }) => {
  const navigate = useNavigate();
  // console.log(info);
  return (
    <div className="h-full w-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.2)] rounded-lg"></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${info.poster_path}`}
        alt=""
        className="w-full h-full object-cover  rounded-lg "
      />
      <div className="absolute left-5 bottom-5 w-full text-white  rounded-lg ">
        <h2 className="text-3xl font-bold mb-5">{info.original_title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="px-4 hover:bg-black hover:cursor-pointer py-2 border border-white rounded-lg">
            Adventure
          </span>
          <span className="px-4 hover:bg-black hover:cursor-pointer  py-2 border border-white rounded-lg">
            Adventure
          </span>
          <span className="px-4 hover:bg-black hover:cursor-pointer  py-2 border border-white rounded-lg">
            Adventure
          </span>
        </div>
        <ButtonPrimary
          className="py-3 px-6 max-w-xs flex justify-center items-center"
          onClick={() => navigate(`/movie/${info.id}`)}
        >
          Watch
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default BannerItem;
