import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "@/pages/home/HomePage";
import Movies from "@/pages/movies/MoviesPage";
import Movie from "@/pages/movie/MoviePage";
import Cinemas from "@/pages/cinemas/CinemasPage";
import RouteDetails from "./pages/routeDetails/RouteDetailsPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/movies" element = {<Movies />} />
          <Route path = "/movie/:id" element = {<Movie />} />
          <Route path = "/cinemas/:movie" element = {<Cinemas />} />
          <Route path = "/routedetails" element = {<RouteDetails /> }  />
        </Routes>
      </Router>
    </>
  )
}

export default App
