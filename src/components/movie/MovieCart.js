import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../button/ButtonPrimary";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
const MovieCart = ({ info }) => {
  const navigate = useNavigate();

  return (
    <div className="movie-cart flex flex-col rounded-lg bg-slate-800 p-3 select-none">
      <img
        src={`https://image.tmdb.org/t/p/w500/${info.poster_path}`}
        alt=""
        className="w-full h-[250px] rounded-lg object-cover mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className=" text-sm font-bold">{info.title}</h3>
        <div className="flex items-center justify-between opacity-50 mb-10">
          <span>{new Date(info.release_date).getFullYear()}</span>
          <span>{info.vote_average}</span>
        </div>
        <ButtonPrimary onClick={() => navigate(`/movie/${info.id}`)}>
          Watch Now
        </ButtonPrimary>
      </div>
    </div>
  );
};

MovieCart.propTypes = {
  info: PropTypes.shape({
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.string,
  }),
};
function FallbackComponent() {
  return (
    <p className="bg-red-50 text-red-400">
      Something went wrong with this component
    </p>
  );
}
export default withErrorBoundary(MovieCart, {
  FallbackComponent,
});
