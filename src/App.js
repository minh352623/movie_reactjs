import { Fragment, lazy, Suspense } from "react";
import { NavLink } from "react-router-dom";
import Banner from "./components/banner/Banner";
import Header from "./components/layout/Header";
// import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import "swiper/scss";
import Main from "./components/layout/Main";
// import MoviePage from "./pages/MoviePage";
// import MovieDetailPage from "./pages/MovieDetailPage";

//dimanyc import
const HomePage = lazy(() => import("./pages/HomePage"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));
const MoviePage = lazy(() => import("./pages/MoviePage"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route path="/movie" element={<MoviePage></MoviePage>}></Route>
            <Route
              path="/movie/:movieId"
              element={<MovieDetailPage></MovieDetailPage>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
