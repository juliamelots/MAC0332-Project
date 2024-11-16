import { useState } from 'react';
import "./FilterSelector.css";

interface FilterSelectorProps {
  placeholder: string;
  options: string[];
  onOptionSelect: (option: string) => void;
}

const FilterSelector = ({ placeholder, options, onOptionSelect }: FilterSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false); 
    onOptionSelect(option);
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
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSelector;
