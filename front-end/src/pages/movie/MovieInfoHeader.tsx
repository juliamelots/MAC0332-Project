interface props {
  title: string,
  runtime: string,
  rated: string
};

const MovieInfoHeader = ({title, runtime, rated}: props) => {
return (
  <>
      <div className="movie-details-title">{title}</div>
        <div className="d-flex gap-2">
          <div className="d-flex align-items-baseline text-ac-white"><i className="bi bi-clock me-1"></i>{runtime}</div>
          <div className="d-flex align-items-baseline text-ac-white"><i className="bi bi-record-fill me-1"></i>{rated}</div>
      </div>
  </>
)
}

export default MovieInfoHeader