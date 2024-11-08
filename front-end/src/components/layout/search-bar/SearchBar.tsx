import { React } from 'react';

import './SearchBar.css';

interface SearchBarProps {
  placeholder: string;
  showFilter: boolean;
}

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  return (
    <div className="input-group my-1 py-1 d-flex justify-content-center align-center w-100">
      <div id="search-input" className="w-75 bg-ac-red">
        <div className="input-group col-md-12">
          <input type="text" className="form-control input-lg" placeholder={props.placeholder} />
          <span className="input-group-btn">
              <button className="btn btn-ac-red text-white" type="button">
                <i className="bi bi-search btn-icon"></i>
              </button>
              {props.showFilter ? (
                <button className="btn btn-ac-red text-white ms-2" type="button">
                  <i className="bi bi-funnel btn-icon"></i>
                </button>
              ) : (
                <></>
              )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default SearchBar;