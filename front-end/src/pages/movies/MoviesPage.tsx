import { useState } from 'react';

import MoviesFilterModal from '@/components/ui/modal/MoviesFilterModal';
import Navbar from '@/components/layout/navbar/Navbar';
import SearchBar from '@/components/layout/search-bar/SearchBar';

import './MoviesPage.css';

function MoviesPage() {
  {/* TODO: Remove constant and call back-end */}
  const movies = [
    {
      title: 'As Pontes de Madison',
      posterUrl: 'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/90/74/20119562.jpg',
      genres: ['Drama'],
      rating: '14',
    },
    {
      title: 'Forrest Gump - O Contador de Histórias',
      posterUrl: 'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/30/21/19874092.jpg',
      genres: ['Drama', 'Comédia'],
      rating: '14',
    },
    {
      title: 'Top Gun: Maverick',
      posterUrl: 'https://br.web.img3.acsta.net/c_310_420/pictures/19/12/16/15/00/5548914.jpg',
      genres: ['Ação'],
      rating: '12',
    },
  ];

  const [searchInput, setSearchInput] = useState<string>('');
  const [ratingFilters, setRatingFilters] = useState<string[]>([]);
  const [genreFilters, setGenreFilters] = useState<string[]>([]);

  const onFiltersSaved = (genres: Set<string>, ratings: Set<string>) => {
    setGenreFilters(Array.from(genres));
    setRatingFilters(Array.from(ratings));
  }

  const moviesGrid = movies
    .filter((movie) => {
      const lowerMovieTitle = movie.title.toLocaleLowerCase();
      const lowerSearchInput = searchInput.toLocaleLowerCase();
      const searchResult = searchInput === '' || lowerMovieTitle.includes(lowerSearchInput);

      const genreFiltersResult = (genreFilters.length === 0) || movie.genres.some((genre: string) => genreFilters.includes(genre));
      const ratingFiltersResult = (ratingFilters.length === 0) || ratingFilters.includes(movie.rating);

      return searchResult && genreFiltersResult && ratingFiltersResult;
    })
    .map((movie, idx) =>
      <div key={idx} className="movie-poster-size position-relative d-flex justify-content-center">
        <img src={movie.posterUrl} alt={'Cartaz de "' + movie.title + '"'} className="movie-poster-size movie-poster" />
        <p className="movie-title text-center">{movie.title}</p>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="h-100 d-flex flex-column">
        <div className="w-100 h-25 bg-ac-red">
          <h1 className="text-center text-white mt-2 mb-5">Filmes</h1>
          <SearchBar
            placeholder="Procure filmes por título"
            filterModal={<MoviesFilterModal initialCheckedGenres={genreFilters} initialCheckedRatings={ratingFilters} onSave={onFiltersSaved}/>}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        </div>

        <div id="movies-container" className="w-100 h-75 bg-ac-black">
          {moviesGrid}
        </div>
      </div>
    </>
  )
}

export default MoviesPage;