import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "@/pages/home/HomePage";
import Movies from "@/pages/movies/MoviesPage";
import Movie from "@/pages/movie/MoviePage";
import CinemasPage from "@/pages/cinemas/CinemasPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/movies" element = {<Movies />} />
          <Route path = "/movie/:title" element = {<Movie />} />
          <Route path = "/cinemas/:movie" element = {<CinemasPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
