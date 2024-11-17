import { useLocation, useParams, Link } from "react-router-dom";

import { MovieType } from "@/types/movie";

import MovieInfoHeader from "./MovieInfoHeader";
import MovieInfoContent from "./MovieInfoContent";
import Navbar from "@/components/layout/navbar/Navbar";

import './MoviePage.css';

function MoviePage() {
  const movie = useLocation().state?.movie as MovieType ?? null;
  const { title } = useParams<{ title: string }>();

  return (
    <div>
      <div className="bg-ac-black">
        <Navbar />
        {movie ? (
          <div className="d-flex mx-4 my-5 row gap-5 justify-content-center">
            <div className="col mb-5">
              <div className="d-flex justify-content-center align-items-center">
                <img src={movie.img_url} alt={'Cartaz de "' + movie.name + '"'} className="movie-poster-detail" />
              </div>
            </div>
            <div className="d-flex col flex-column gap-4">
              <MovieInfoHeader
                title={movie.name}
                runtime={movie.duration}
                rated={movie.rating}
              />
              <MovieInfoContent
                plot={movie.synopsis}
                directors='Não disponível.'
                genre={movie.categories.join(', ')}
              />
              <div className="d-flex align-items-center">
                <i className="bi bi-geo-alt-fill icon-geo"></i>
                <Link 
                  className="p-3 rounded-3 btn-movie-theater"
                  to={`/cinemas/${movie.name}`}
                  state={{ movieName: movie.name, movieId: movie.id }}
                >
                  Encontre cinemas por perto
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="d-flex my-5 vh-100 justify-content-center text-ac-white overflow-hidden">
            <p className="fs-2">Não foi possível carregar filme.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviePage;