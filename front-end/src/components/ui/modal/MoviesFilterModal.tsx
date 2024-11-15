import Checkbox from '@/components/ui/checkbox/Checkbox';

import './MoviesFilterModal.css';

interface MovieFilterModalProps {
  initialCheckedGenres?: string[];
  initialCheckedRatings?: string[];
  onSave: (genres: Set<string>, ratings: Set<string>) => void;
}

const MoviesFilterModal = (props: MovieFilterModalProps) => {
  {/* TODO: Remove constant and call back-end */}
  const movieGenres = ['Ação', 'Aventura', 'Comédia', 'Drama', 'Terror', 'Ficção Científica', 'Fantasia', 'Suspense', 'Romance', 'Animação'];
  const movieRatings = ['L', '10', '12', '14', '16', '18'];
  
  const checkedGenres = new Set<string>(props.initialCheckedGenres ?? []);
  const checkedRatings = new Set<string>(props.initialCheckedRatings ?? []);

  const onCheckChanged = (isChecked: boolean, value: string, checkedSet: Set<string>): void => {
    if (isChecked) {
      checkedSet.add(value);
    } else {
      checkedSet.delete(value);
    }
  }
  
  const onGenreChecked = (isChecked: boolean, value: string): void => {
    onCheckChanged(isChecked, value, checkedGenres);
  }
  const onRatingChecked = (isChecked: boolean, value: string): void => {
    onCheckChanged(isChecked, value, checkedRatings);
  }

  const movieGenresItems = movieGenres.map((genre, idx) =>
    <Checkbox label={genre} onChange={onGenreChecked} />
  );
  const movieRatingsItems = movieRatings.map((rating, idx) =>
    <Checkbox label={rating} onChange={onRatingChecked} />
  );

  return (
    <div className="modal fade" id="filterModal" aria-labelledby="filterModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="exampleModalLabel">Filtrar filmes</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <h5>Gênero</h5>
            <div className="filters-container" id="genres-container">
              {movieGenresItems}
            </div>
            <hr />
            <h5>Classificação indicativa</h5>
            <div className="filters-container" id="ratings-container">
              {movieRatingsItems}
            </div>
            </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-ac-black text-white" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" className="btn btn-ac-red text-white"  data-bs-dismiss="modal"
              onClick={() => props.onSave(checkedGenres, checkedRatings)}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoviesFilterModal;