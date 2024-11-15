import { useState } from 'react';
import "./FilterSelector.css";

interface FilterSelectorProps {
  placeholder: string;
  options: { label: string; value: string }[];
}

const FilterSelector = ({ placeholder, options }: FilterSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: { label: string; value: string }) => {
    setSelectedOption(option.label);
    setIsOpen(false); 
  };

  return (
    <div className="filter-selector-container my-3">
      <button
        className="filter-selector-button d-flex align-items-center justify-content-between"
        onClick={toggleDropdown}
        style={{ cursor: 'pointer' }}
      >
        <span>{selectedOption}</span>
        <i className="bi bi-filter-circle" style={{ marginLeft: '10px' }} />
      </button>
      
      {isOpen && (
        <div className="dropdown-menu show mt-2">
          {options.map((option, index) => (
            <button
              key={index}
              className="dropdown-item"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSelector;
