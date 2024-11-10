import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@/pages/home/HomePage";
import Movies from "@/pages/movies/MoviesPage";
import Movie from "@/pages/movie/MoviePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/movies" element = {<Movies />} />
          <Route path = "/movie/:title" element = {<Movie />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
