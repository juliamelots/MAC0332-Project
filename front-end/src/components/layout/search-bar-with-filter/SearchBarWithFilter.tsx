const SearchBarWithFilter = () => {
    return (
        <div className="input-group my-5 py-5 d-flex justify-content-center align-center w-100">
            <div id="custom-search-input" className="w-75 bg-red">
                <div className="input-group col-md-12">
                    <i className="bi bi-search me-2 input-group-text btn-icon text-center"></i>
                    <input type="text" className="form-control input-lg" placeholder="Buscar" />
                    <span className="input-group-btn">
                        <button className="btn btn-info" type="button">
                            <i className="bi bi bi-funnel btn-icon"></i>
                        </button>
                    </span>
                </div>
            </div>
        </div>
    )
  }
  
export default SearchBarWithFilter