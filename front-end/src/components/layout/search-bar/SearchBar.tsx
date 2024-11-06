const SearchBar = () => {
  return (
    <div className="input-group my-5 py-5 d-flex justify-content-center align-center w-100">
      <div id="custom-search-input" className="w-75">
        <div className="input-group col-md-12">
          <input type="text" className="form-control input-lg" placeholder="Procure filmes por título..." />
          <span className="input-group-btn">
              <button className="btn btn-info" type="button">
                <i className="bi bi-search me-2 btn-icon"></i>
                Procurar
              </button>
          </span>
        </div>
      </div>
    </div>
  )
}

export default SearchBar;