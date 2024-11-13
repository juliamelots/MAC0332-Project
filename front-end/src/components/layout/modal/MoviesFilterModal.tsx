const MoviesFilterModal = () => {
  return (
    <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Filtrar filmes</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            ...
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-ac-black text-white" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" className="btn btn-ac-red text-white">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoviesFilterModal;