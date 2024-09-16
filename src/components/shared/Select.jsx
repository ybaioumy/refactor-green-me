/* eslint-disable react/prop-types */
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { Transition } from '@headlessui/react';
import Icon from './Icon';
// Debounce hook to improve search performance
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// eslint-disable-next-line no-undef, react/display-name
const Option = React.memo(({ option, onClick }) => (
  <button
    title={option.name || option.projectName}
    onClick={() => onClick(option)}
    className="block w-full text-left px-4 py-2 text-sm mr-2 text-[#3E3E3E] hover:bg-[#D8F992] truncate">
    {option.projectName || option.name}
  </button>
));

const Select = ({
  options,
  label = '',
  onChange,
  variant = 'default',
  name,
  value,
  disabled = false,
  removeMaxWidth = false,
  search = false,
  clearSearch,
  ...props
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const [showClear, setShowClear] = useState(false);

  // Debounced search query to avoid excessive filtering
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (value && options?.length > 0) {
      setSelectedOption(options.find((option) => option.id === value) || null);
    } else {
      setSelectedOption(null);
    }
  }, [options, value]);

  // Memoized filtering logic to prevent unnecessary recomputations
  const filteredOptions = useMemo(() => {
    if (search && debouncedSearchQuery) {
      return options.filter((option) =>
        (option.name || option.projectName)
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase())
      );
    }
    return options;
  }, [debouncedSearchQuery, options, search]);

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  const toggleOpen = useCallback(() => {
    if (!disabled) {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }
  }, [disabled]);

  const handleOptionClick = useCallback(
    (option) => {
      if (!disabled) {
        setSelectedOption(option);
        setIsOpen(false);
        if (onChange) onChange(option);
        setSearchQuery(''); // Reset the search query when an option is selected
      }
    },
    [disabled, onChange]
  );

  const handleBlur = (e) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.relatedTarget) &&
      !buttonRef.current.contains(e.relatedTarget)
    ) {
      setIsOpen(false);
    }
  };

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const optionClasses = useMemo(
    () =>
      'block w-full text-left px-4 py-2 text-sm mr-2 text-[#3E3E3E] hover:bg-[#D8F992] truncate',
    []
  );

  const getVariant = useMemo(() => {
    const defaultClasses =
      'custom-select inline-flex justify-between items-center w-full rounded-full px-4 py-1 text-sm font-semibold text-[#1E4A28] shadow-lg focus:outline-none hover:ring-1 hover:ring-green-300 hover:border-green-500 transition ease-in-out duration-300 appearance-none z-auto truncate ';
    const secondaryClasses =
      'inline-flex justify-between items-center w-full rounded-md px-4 py-1 text-md font-semibold text-[#1E4A28] border border-gray-300 focus:outline-none bg-[#F7F7F7] ';
    const innerShadowClasses =
      'w-full py-2.5 px-2 md:pl-9  bg-[#F7F7F7] [box-shadow:0px_2px_6px_1px_rgba(0,_0,_0,_0.20)_inset] rounded-md justify-between items-center inline-flex focus:outline-none placeholder-[#1E4A28] font-abel text-[#1E4A28]';
    const underLineClasses =
      'w-full text-left px-4 py-2 bg-[#F1F1F1] border-b-2 border-[#8E8E8E] shadow-sm focus:outline-none flex items-center justify-between';
    switch (variant) {
      case 'default':
        return defaultClasses;
      case 'innerShadow':
        return innerShadowClasses;
      case 'secondary':
        return secondaryClasses;
      case 'underline':
        return underLineClasses;
      default:
        return defaultClasses;
    }
  }, [variant]);
  const disabledClasses = 'cursor-not-allowed opacity-70 ';

  return (
    <div
      className={`relative inline-block text-left w-full min-w-[250px] ${
        !removeMaxWidth ? 'max-w-[400px]' : ''
      }`}
      onBlur={handleBlur}
      ref={dropdownRef}>
      <div className="flex flex-col gap-1 relative">
        {label && (
          <label className="text-base text-[#1E4A28] font-semibold ml-1 truncate">
            {label || null}
          </label>
        )}
        <button
          onMouseEnter={() => setShowClear(true)}
          onMouseLeave={() => setShowClear(false)}
          ref={buttonRef}
          type="button"
          disabled={disabled}
          className={`${getVariant} ${disabled ? disabledClasses : ''}`}
          onClick={toggleOpen}
          {...props}>
          <span className="truncate text-left w-full relative">
            {selectedOption?.projectName ||
              selectedOption?.name ||
              `Select ${label}`}
            <span
              className={`w-5 h-5 text-sm flex items-center justify-center bg-[#1E4A28] text-white rounded-full opacity-0 transition-opacity duration-150 absolute right-0 border-white border top-[50%] -translate-y-[50%] ${
                selectedOption !== null && showClear ? 'opacity-100' : ''
              }`}
              role="button"
              onClick={(e) => {
                e.stopPropagation(); // Prevents the dropdown from reopening
                if (clearSearch) clearSearch();
                setSelectedOption(null);
                setIsOpen(false);
              }}>
              <span>x</span>
            </span>
          </span>
          <div
            className={`ml-2 h-5 w-5 transition-transform ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
            aria-hidden="true">
            <Icon name={'chev-down'} />
          </div>
        </button>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <div className="absolute right-[50%] translate-x-[50%] w-[95%] rounded-bl-md rounded-br-md shadow-lg bg-[#EFEFEF] ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-y-auto overflow-x-hidden z-[99999]">
          <div className="py-1">
            {search && (
              <div className="px-2">
                <input
                  autoFocus={isOpen}
                  type="text"
                  placeholder={`Search ${label}`}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-1 py-2 mb-2 text-sm text-gray-700 border border-gray-300 rounded-md sticky top-1 h-7"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            {filteredOptions?.length > 0 ? (
              filteredOptions.map((option) => (
                <Option
                  key={option.id}
                  option={option}
                  onClick={handleOptionClick}
                />
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                No options found
              </div>
            )}
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Select;
