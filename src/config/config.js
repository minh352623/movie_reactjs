export const fetcher = (...args) => fetch(...args).then((res) => res.json());
const tmdbEnpoint = "https://api.themoviedb.org/3/movie";
const apiKey = "95f2419536f533cdaa1dadf83c606027";
export const tmdbAPI = {
  getMovieList: (type) => `${tmdbEnpoint}/${type}?api_key=${apiKey}`,
  getMovieDetail: (movieId) => `${tmdbEnpoint}/${movieId}?api_key=${apiKey}`,
  getMovieCredits: (movieId) =>
    `${tmdbEnpoint}/${movieId}/credits?api_key=${apiKey}`,
  getMovieTrailer: (movieId) =>
    `${tmdbEnpoint}/${movieId}/videos?api_key=${apiKey}`,
  getMovieSimilar: (movieId) =>
    `${tmdbEnpoint}/${movieId}/similar?api_key=${apiKey}`,
  getMoviePopular: (nextPage) =>
    `${tmdbEnpoint}/popular?api_key=${apiKey}&page=${nextPage}`,
};
