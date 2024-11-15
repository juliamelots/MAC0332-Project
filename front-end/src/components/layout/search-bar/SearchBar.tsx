import { ChangeEvent, ReactElement, useState } from 'react';

import './SearchBar.css';

interface SearchBarProps {
  placeholder: string;
  filterModal?: ReactElement;
  searchInput: string;
  setSearchInput: (newValue: string) => void;
}

const SearchBar = (props: SearchBarProps)  => {
  const [tempSearchInput, setTempSearchInput] = useState(props.searchInput);

  const onSearchInputChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    setTempSearchInput(event.target.value);
  };

  const onSearchButtonClicked = (): void => {
    props.setSearchInput(tempSearchInput);
  };

  return (
    <>
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
                {props.filterModal ? (
                  <>
                    <button className="btn btn-ac-red text-white ms-2" type="button" data-bs-toggle="modal" data-bs-target="#filterModal">
                      <i className="bi bi-funnel btn-icon"></i>
                    </button>
                    {props.filterModal}
                  </>
                ) : (
                  <></>
                )}
            </span>
          </div>
        </div>
      </div>


    </>
  )
}

export default SearchBar;