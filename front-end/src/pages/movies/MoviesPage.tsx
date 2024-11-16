import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import axios from "@/services/axiosInstance";
import { BackMovieType } from '@/types/types';

import MoviesFilterModal from '@/components/ui/modal/MoviesFilterModal';
import Navbar from '@/components/layout/navbar/Navbar';
import SearchBar from '@/components/layout/search-bar/SearchBar';

import './MoviesPage.css';

function MoviesPage() {
  const [movies, setMovies] = useState<BackMovieType[]>([]);
  const [error, setError] = useState<string>('');

  const [searchInput, setSearchInput] = useState<string>('');
  const [ratingFilters, setRatingFilters] = useState<string[]>([]);
  const [genreFilters, setGenreFilters] = useState<string[]>([]);

    useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`/movie`);
        setMovies(response.data.movies as BackMovieType[]);
      } catch (err) {
        setError('Não foi possível carregar filmes.');
        console.error(err);
      }
    };
    fetchMovies();
  }, []);

  const onFiltersSaved = (genres: Set<string>, ratings: Set<string>) => {
    setGenreFilters(Array.from(genres));
    setRatingFilters(Array.from(ratings));
  }

  const moviesGrid = movies
    .filter((movie) => {
      const lowerMovieTitle = movie.name.toLocaleLowerCase();
      const lowerSearchInput = searchInput.toLocaleLowerCase();
      const searchResult = searchInput === '' || lowerMovieTitle.includes(lowerSearchInput);

      const genreFiltersResult = (genreFilters.length === 0) || movie.genre.some((genre: string) => genreFilters.includes(genre));
      const ratingFiltersResult = (ratingFilters.length === 0) || ratingFilters.includes(movie.rating);

      const result = searchResult && genreFiltersResult && ratingFiltersResult;
      if (!result) {
        setError('Não foi possível encontrar filmes que se encaixam em sua pesquisa.');
      }
      return result;
    })
    .map((movie, idx) =>
      <Link
        key={idx}
        className="movie-poster-size position-relative d-flex justify-content-center"
        to={`/movie/${movie.name}`}
        state={{ movie: movie }}
      >
        <img
          className="movie-poster-size movie-poster"
          src={movie.img_url}
          alt={'Cartaz de "' + movie.name + '"'}
        />
        <p className="movie-title text-center">{movie.name}</p>
      </Link>
    );

  return (
    <>
      <Navbar />
      <div className="h-100 d-flex flex-column">
        <div className="w-100 h-25 bg-ac-red">
          <h1 className="text-center text-white mt-2 mb-5">Filmes</h1>
          <SearchBar
            placeholder="Procure filmes por título"
            filterModal={<MoviesFilterModal
              initialCheckedGenres={genreFilters}
              initialCheckedRatings={ratingFilters}
              onSave={onFiltersSaved}
            />}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        </div>

        <div className="w-100 h-75 bg-ac-black">
          {moviesGrid.length > 0 ? (
            <div id="movies-container">
              {moviesGrid}
            </div>
          ) : (
            <p className="text-white text-center fs-5 mt-5">{error}</p>
          )}
        </div>
      </div>
    </>
  )
}

export default MoviesPage;