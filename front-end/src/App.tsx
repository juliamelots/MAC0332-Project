import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@/pages/home/HomePage";
import Movie from "@/pages/movie/MoviePage";

import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/movie" element = {<Movie />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
