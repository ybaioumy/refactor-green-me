import { useState, useEffect } from 'react';

export const Dropdown = ({
  options,
  placeholder,
  onSelectOption,
  value,
  variant = 'primary',
  multiSelect = false, // Add the multiSelect prop
  search = false, // Add the search prop
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(multiSelect ? [] : null);
  const [searchQuery, setSearchQuery] = useState(''); // State for search input

  useEffect(() => {
    if (value) {
      if (multiSelect) {
        const selectedOptions = options.filter((opt) =>
          value.includes(opt.value)
        );
        setSelectedOption(selectedOptions);
      } else {
        const option = options.find((opt) => opt.value === value);
        setSelectedOption(option);
      }
    }
  }, [value, options, multiSelect]);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev)
    setSearchQuery('')
  };

  const handleOptionClick = (option) => {
    if (multiSelect) {
      const isSelected = selectedOption.some((opt) => opt.id === option.id);
      const newSelection = isSelected
        ? selectedOption.filter((opt) => opt.id !== option.id)
        : [...selectedOption, option];

      setSelectedOption(newSelection);
      if (onSelectOption) {
        onSelectOption(newSelection.map((opt) => opt.id)); // Return an array of selected option IDs
      }
    } else {
      setSelectedOption(option);
      setIsOpen(false);
      if (onSelectOption) {
        onSelectOption(option.id);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'w-full text-left px-4 py-2 bg-[#F1F1F1] border-b-2 border-[#8E8E8E] shadow-sm focus:outline-none flex items-center justify-between';
      case 'secondary':
        return 'w-full text-left px-4 py-2 bg-[#BFE0C6] border border-[#000000] shadow-sm focus:outline-none flex items-center justify-between rounded-md';
      default:
        return 'w-full text-left px-4 py-2 bg-[#F1F1F1] border-b-2 border-[#8E8E8E] shadow-sm focus:outline-none flex items-center justify-between rounded-md';
    }
  };

  const renderSelectedOption = () => {
    if (multiSelect) {
      return selectedOption.length > 0 ? (
        <>
          {selectedOption.map((opt) => (
            <span
              key={opt.id}
              className="bg-white text-black py-1 px-2 rounded-md mr-2">
              {opt.name}
            </span>
          ))}
        </>
      ) : (
        <span className="text-[#1E4A28] text-sm">{placeholder}</span>
      );
    } else {
      return selectedOption ? (
        <span className="text-black rounded-md">
          {selectedOption.name || selectedOption.label}
        </span>
      ) : (
        <span className="text-[#1E4A28] text-sm">{placeholder}</span>
      );
    }
  };

  return (
    <div className="relative inline-block w-full md:max-w-sm lg:max-w-[100%]">
      <button
        type="button"
        onClick={toggleDropdown}
        className={`${getVariantStyles()}`}>
        <div className="truncate">{renderSelectedOption()}</div>
        <span className="ml-2 flex-shrink-0">
          <svg
            className={`w-5 h-5 transition-transform transform ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"></path>
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {/* Conditionally render search input based on the `search` prop */}
          {search && (
            <div className="p-2">
              <input
                autoFocus={isOpen}
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          {/* Filtered options */}
          <ul className="max-h-60 overflow-y-auto overflow-x-hidden">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.id}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                    multiSelect &&
                    selectedOption.some((opt) => opt.id === option.id)
                      ? 'bg-gray-200'
                      : ''
                  }`}
                  onClick={() => handleOptionClick(option)}>
                  {option.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
