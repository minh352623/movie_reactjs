import React, { Fragment, useEffect, useState } from "react";
import MovieList from "../components/movie/MovieList";
import useSWR from "swr";
import { fetcher } from "../config/config";
import MovieCart from "../components/movie/MovieCart";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
const itemsPerPage = 20;
const MoviePage = () => {
  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const filterDeboundce = useDebounce(filter, 500);
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=95f2419536f533cdaa1dadf83c606027&page=${nextPage}`
  );
  const { data, error } = useSWR(url, fetcher);
  const movies = data?.results || [];
  useEffect(() => {
    if (filterDeboundce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=95f2419536f533cdaa1dadf83c606027&query=${filterDeboundce}&page=${nextPage}`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=95f2419536f533cdaa1dadf83c606027&page=${nextPage}`
      );
    }
  }, [filterDeboundce, nextPage]);
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const loading = !data && !error;
  const { page, total_pages } = data || [];
  // console.log(page, total_pages);

  //phân trang

  // We start with an empty list of items.
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    if (!data && !data?.total_results) return;
    const endOffset = itemOffset + itemsPerPage;
    setPageCount(Math.ceil(data?.total_results / itemsPerPage));
  }, [itemOffset, data]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data?.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
  return (
    <Fragment>
      <div className="flex mb-10 gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Type here your search..."
            className="w-full p-3 bg-slate-800 rounded-lg text-white outline-none"
            onChange={handleChange}
          />
        </div>
        <button className="px-12 py-3 bg-primary text-white rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strok-width="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-r-transparent animate-spin mx-auto"></div>
      )}
      <div className="grid mb-10 grid-cols-4 gap-10 text-white">
        {!loading &&
          movies.length > 0 &&
          movies.map((movie) => (
            <MovieCart key={movie.id} info={movie}></MovieCart>
          ))}
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="pagination"
      />
    </Fragment>
  );
};

export default MoviePage;
