import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/navbar/Navbar";
import './MoviePage.css';
import MovieInfoHeader from "./MovieInfoHeader";
import MovieInfoContent from "./MovieInfoContent";

interface MovieType {
  title: string,
  posterUrl: string,
  rating: string,
  year: string,
  runtime: string,
  genre: string,
  plot: string,
  rated: string,
  cast: string
};

function MoviePage() {
  const { title } = useParams<{ title: string }>();
  
  const movie: MovieType = {
    title: "Titanic",
    posterUrl: "https://i.pinimg.com/originals/cd/67/08/cd6708c480c24b0d5824b0015e4017cf.jpg",
    rating: "4.5",
    year: "1998",
    runtime: "180 min",
    genre: "Romance, Drama",
    plot: "Um artista pobre e uma jovem rica se conhecem e se apaixonam na fatídica viagem inaugural \
    do Titanic em 1912. Embora esteja noiva do arrogante herdeiro de uma siderúrgica, a jovem desafia \
    sua família e amigos em busca do verdadeiro amor.",
    rated: "12",
    cast: "Leonardo DiCaprio, Kate Winslet, Billy Zane, Kathy Bates, Frances Fisher, Gloria Stuart, Bill Paxton, Bernard Hill",
  };

  return (
    <div className="bg-ac-black">
      <Navbar />
      <div className="d-flex mx-4 my-5 row gap-5 justify-content-center">
        <div className="col mb-5">
          <div className="d-flex justify-content-center align-items-center">
            <img src={movie.posterUrl} alt={movie.title} className="movie-poster-detail" />
          </div>
        </div>
        <div className="d-flex col flex-column gap-4">
          <MovieInfoHeader 
            title = {movie.title} 
            rating = {movie.rating} 
            year = {movie.year} 
            runtime = {movie.runtime} 
            rated = {movie.rated} 
          />
          <MovieInfoContent 
            plot = {movie.plot}
            cast = {movie.cast}
            genre = {movie.genre}
          />
          <div className="d-flex align-items-center">
            <i className="bi bi-geo-alt-fill icon-geo"></i>
            <button className="p-3 rounded-3 btn-movie-theater">
              Encontre cinemas por perto
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoviePage;