import { MovieRating } from "@/types/movie" 

interface props {
  title: string,
  runtime: string,
  rated: MovieRating
};

const MovieInfoHeader = ({title, runtime, rated}: props) => {

  const ratingColors: { [key in MovieRating]: string } = {
    'L': '#28a745', 
    '10': '#17a2b8',
    '12': '#ffc107',
    '14': '#fd7e14',
    '16': '#d1001f',
    '18': '#000000',
  };

  return (
    <>
      <div className="movie-details-title">{title}</div>
      <div className="d-flex gap-2 align-items-center">
        <div className="d-flex align-items-baseline text-ac-white">
          <i className="bi bi-clock me-1"></i>
          {runtime}
        </div>
        <div className="d-flex align-items-baseline text-ac-white">
          <i className="bi bi-record-fill me-1"></i>
          <span
            className="px-2 py-1"
            style={{
              backgroundColor: ratingColors[rated],
              borderRadius: '3px',
            }}
          >
            {rated}
          </span>
        </div>
      </div>
    </>
  )
}

export default MovieInfoHeader