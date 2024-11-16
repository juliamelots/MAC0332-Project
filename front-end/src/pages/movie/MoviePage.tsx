import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "@/services/axiosInstance";
import Navbar from "@/components/layout/navbar/Navbar";
import MovieInfoHeader from "./MovieInfoHeader";
import MovieInfoContent from "./MovieInfoContent";
import { MovieType } from "@/types/types";
import './MoviePage.css';

function MoviePage() {
  const { title } = useParams<{ title: string }>();
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`/movie`);
        const movieData = response.data.movies.find((m: any) => m.name === title);

        if (!movieData || !title) {
          setError("Filme não encontrado");
          setMovie(null);
        } else {
          const mappedMovie: MovieType = {
            title: title,
            posterUrl: "https://i.pinimg.com/originals/cd/67/08/cd6708c480c24b0d5824b0015e4017cf.jpg",
            runtime: movieData.duration,
            genre: movieData.genre.join(", "),
            plot: "Descrição não disponível",
            rated: movieData.rating,
            directors: "Não disponível",
            availableCinemas: movieData.availableCinemas
          };
          setMovie(mappedMovie);
          setError(null);
        }
      } catch (err) {
        setError("Erro ao carregar os dados do filme");
        console.error(err);
      }
    };
    fetchMovie();
  }, [title]);

  if (error) {
    return (
      <div>
        <div className="bg-ac-black">
          <Navbar />
          <div className="d-flex my-5 vh-100 justify-content-center text-ac-white overflow-hidden">
            <p className="fs-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-ac-black">
        <Navbar />
        {movie ? (
          <div className="d-flex mx-4 my-5 row gap-5 justify-content-center">
            <div className="col mb-5">
              <div className="d-flex justify-content-center align-items-center">
                <img src={movie.posterUrl} alt={movie.title} className="movie-poster-detail" />
              </div>
            </div>
            <div className="d-flex col flex-column gap-4">
              <MovieInfoHeader
                title={movie.title}
                runtime={movie.runtime}
                rated={movie.rated}
              />
              <MovieInfoContent
                plot={movie.plot}
                directors={movie.directors}
                genre={movie.genre}
              />
              <div className="d-flex align-items-center">
                <i className="bi bi-geo-alt-fill icon-geo"></i>
                <Link 
                  to = {`/cinemas/${movie.title}`}
                  state = {{ cinemas: movie.availableCinemas }}
                  className = "p-3 rounded-3 btn-movie-theater"
                >
                  Encontre cinemas por perto
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="d-flex my-5 h-100 vh-100 justify-content-center text-ac-white overflow-hidden">
            <p className="fs-2">Carregando...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviePage;