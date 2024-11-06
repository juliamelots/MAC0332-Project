function MoviesPage() {
  {/* TODO: Remove constant and call back-end */}
  const movies = [
    { title: 'The Bridges of Madison County', id: 1 },
    { title: 'Forrest Gump', id: 2 },
    { title: 'Top Gun', id: 3 },
  ];

  const moviesGrid = movies.map(movie =>
    <div className="movie-poster">
      {movie.title}
    </div>
  );

  return (
    <div className="h-100 d-flex flex-column bg-black">
      <div className="w-100 h-25 bg-red">
        <h1 className="text-center text-white">Filmes</h1>
        {/* TODO: Add search bar */}
      </div>

      <div className="w-100 h-75 d-flex flex-row flex-wrap">
        {moviesGrid}
      </div>
    </div>
  )
}

export default MoviesPage