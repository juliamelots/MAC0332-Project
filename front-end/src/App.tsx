import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@/pages/home/HomePage";
import Movies from "@/pages/movies/MoviesPage";
import Movie from "@/pages/movie/MoviePage";

import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/movies" element = {<Movies />} />
          <Route path = "/movie" element = {<Movie />} /> {/* TODO: Add movie ID parameter to path */}
        </Routes>
      </Router>
    </>
  )
}

export default App
