import { React, useState } from 'react';

import './SearchBar.css';

interface SearchBarProps {
  placeholder: string;
  showFilter: boolean;
  searchInput: string;
  setSearchInput: (newValue: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const [tempSearchInput, setTempSearchInput] = useState(props.searchInput);

  const onSearchInputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTempSearchInput(event.target.value);
  };

  const onSearchButtonClicked = (): void => {
    props.setSearchInput(tempSearchInput);
  };

  return (
    <div className="input-group my-1 py-1 d-flex justify-content-center align-center w-100">
      <div id="search-input" className="w-75 bg-ac-red">
        <div className="input-group col-md-12">
          <input className="form-control input-lg"
            type="text"
            placeholder={props.placeholder}
            value={tempSearchInput}
            onChange={onSearchInputChanged}
          />
          <span className="input-group-btn">
              <button className="btn btn-ac-red text-white" type="button"
                onClick={onSearchButtonClicked}>
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