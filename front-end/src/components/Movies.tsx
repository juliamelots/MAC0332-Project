function Movies() {
  const movies = [
    { title: 'The Bridges of Madison County', id: 1 },
    { title: 'Forrest Gump', id: 2 },
    { title: 'Top Gun', id: 3 },
  ];

  const moviesGrid = movies.map(movie =>
    <div style={{ width: '100px', height: '80px' }}>
      {/* {movie.title} */}
    </div>
  );

  return (
    <div className="h-100 d-flex flex-column bg-black">
      <div className="w-100 h-25 bg-red">
        <h1 className="text-center text-white">Filmes</h1>
      </div>

      <div className="w-100 h-75 d-flex flex-row flex-wrap">
        {moviesGrid}
      </div>
    </div>
  )
}

export default Movies