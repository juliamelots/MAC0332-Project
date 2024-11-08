import { React } from 'react';

interface SearchBarProps {
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  return (
    <div className="input-group my-1 py-1 d-flex justify-content-center align-center w-100">
      <div id="custom-search-input" className="w-75 bg-red">
        <div className="input-group col-md-12">
          <input type="text" className="form-control input-lg" placeholder={props.placeholder} />
          <span className="input-group-btn">
              <button className="btn btn-info bg-red" type="button">
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