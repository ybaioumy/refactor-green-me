import React, { useState } from 'react';
import Button from '../Button';

import RadioButton from '../RadioButton';
import { useLocation } from 'react-router-dom';
import Icon from '../Icon';
import Select from '../Select';
import { useSelector, useDispatch } from 'react-redux';
import {
  resetByKey,
  resetSearchObject,
  updateSearchObject,
} from '../../../redux/slices/filtersSlice';
const HorizontalSearchBar = ({ data, operationTodo, isLoading }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [moreFilterOpen, setMoreFilterOpen] = useState(false);
  const isAddMembers = location.pathname.includes('add-members');
  const isAddMission = location.pathname.includes('add-mission');

  const searchObject = useSelector((state) => state.search);

  const toggleFilter = () => {
    setMoreFilterOpen(!moreFilterOpen);
  };

  const toggleResponsiveLayout = () => {
    setIsOpen(!isOpen);
  };
  if (!data || isLoading)
    return (
      <div className="text-center animate-pulse h-[100px] w-full">
        <div className="h-full bg-gray-200 w-full flex items-center justify-center" />
      </div>
    );

  const handleDropdownChange = (key, value) => {
    dispatch(updateSearchObject({ key, value }));
  };
  const handleClearByItem = (key) => {
    dispatch(resetByKey(key));
  };
  return (
    <>
      {/* Button to toggle responsive layout on smaller devices */}
      <div className="md:hidden flex justify-between px-2 py-4">
        {/* {isAddMembers && (
          <Button variant="blue" onClick={operationTodo}>
            <Icon name={'addProject'} />
            <span className="ml-2">Add New Member</span>
          </Button>
        )}
        {isAddMission && (
          <Button onClick={operationTodo}>
            <Icon name={'addProject'} />
            <span className="ml-2">Create New Mission</span>
          </Button>
        )} */}
        <Button
          variant="transparent"
          className="px-10 flex-1"
          onClick={toggleResponsiveLayout}
          hasIcon
          iconName="filter-vertical">
          {isOpen ? 'Close Filters' : 'Open Filters'}
        </Button>
      </div>

      <div
        className={`flex flex-col md:flex-row w-full gap-5 justify-between px-2 md:px-5 py-5 md:bg-[#D9D9D9] 
        ${isOpen ? 'block' : 'hidden'}
         md:flex
         `}>
        <div className="flex  flex-row gap-4 items-end flex-wrap">
          <div className="flex flex-col   justify-between">
            <label
              htmlFor="search"
              className="text-[#202020] font-semibold text-md ml-1">
              Search Project Code
            </label>
            <input
              type="text"
              className="bg-[#FFE7E7] border border-[#8E8E8E] w-full pl-1 md:w-[200px] h-[30px] text-[14px] rounded focus:outline-none "
              placeholder="Search Project Code"
            />
          </div>
          <div className="flex gap-4">
            {/* <Button
              className={'w-[120px]'}
              size="sm"
              variant="primary"
              hasIcon
              iconName="search"
              iconPosition="right">
              Go
            </Button> */}
            {isAddMembers && (
              <Button onClick={operationTodo} variant="blue" size="sm">
                <Icon name={'addProject'} />
                <span className="ml-2">Add New Member</span>
              </Button>
            )}
            {isAddMission && (
              <Button variant="blue" onClick={operationTodo} size="sm">
                <Icon name={'addProject'} />
                <span className="ml-2">Create New Mission</span>
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-end gap-5 flex-wrap justify-end">
          {data
            ? data?.map((item) => (
                <div
                  key={item.label}
                  className="md:max-w-[210px] md:min-w-[180px]">
                  <Select
                    removeMaxWidth
                    search
                    clearSearch={() => handleClearByItem(item.key)}
                    options={item.data || []}
                    label={item.label || ''}
                    value={searchObject[item.key]}
                    onChange={(e) => handleDropdownChange(item.key, e.id)}
                  />
                </div>
              ))
            : null}
          {data && data.length > 0 && (
            <>
              <Button
                className={'font-semibold'}
                size="sm"
                onClick={() => dispatch(resetSearchObject())}>
                Clear All Filters
              </Button>
              <Button
                size="sm"
                variant="transparent"
                hasIcon
                className={'font-semibold'}
                iconName="filter-vertical"
                iconPosition="left"
                onClick={toggleFilter}>
                More Filters
              </Button>
            </>
          )}
        </div>
      </div>
      <MoreFilters
        isOpen={moreFilterOpen}
        setMoreFilterOpen={setMoreFilterOpen}
      />
    </>
  );
};

const FilterComponent = ({ projects, setFilteredProjects }) => {
  const [selectedRadio, setSelectedRadio] = useState('pipeline');
  const [filters, setFilters] = useState({
    technical: false,
    finance: false,
    audit: false,
  });
  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.checked,
    });
  };

  const handleApply = () => {
    let filtered = projects;
    if (selectedRadio === 'pipeline') {
      if (filters.technical) {
        filtered = filtered.filter(
          (project) => project.status === 'Pending Technical'
        );
      }
      if (filters.finance) {
        filtered = filtered.filter(
          (project) => project.status === 'Pending Finance'
        );
      }
      if (filters.audit) {
        filtered = filtered.filter(
          (project) => project.status === 'Pending Audit'
        );
      }
    } else {
      filtered = filtered.filter((project) => project.status === 'Portfolio');
    }
    setFilteredProjects(filtered);
  };

  return (
    <div className="p-4 flex flex-col gap-5">
      <RadioButton
        id="pipeline"
        name="projectType"
        value="pipeline"
        checked={selectedRadio === 'pipeline'}
        onChange={handleRadioChange}
        label={' Projects in the Pipeline'}
      />

      {selectedRadio === 'pipeline' && (
        <div className="flex flex-col gap-4 ml-6">
          <div>
            <input
              type="checkbox"
              className="accent-[#1d4628]"
              id="technical"
              name="technical"
              checked={filters.technical}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="technical" className="ml-2">
              Pending Technical
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              className="accent-[#1d4628]"
              id="finance"
              name="finance"
              checked={filters.finance}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="finance" className="ml-2">
              Pending Finance
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              className="accent-[#1d4628]"
              id="audit"
              name="audit"
              checked={filters.audit}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="audit" className="ml-2">
              Pending Audit
            </label>
          </div>
        </div>
      )}
      <div className="mt-4">
        <RadioButton
          id="portfolio"
          name="projectType"
          value="portfolio"
          checked={selectedRadio === 'portfolio'}
          onChange={handleRadioChange}
          label={'Portfolio Projects'}
        />
      </div>
      <Button className="px-10" onClick={handleApply} disabled={!projects}>
        Apply
      </Button>
    </div>
  );
};

const MoreFilters = ({ isOpen, setMoreFilterOpen }) => {
  return (
    <div className="relative">
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 h-full w-80 bg-gray-100 shadow-lg transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}>
        <div className="p-4">
          <h2 className="text-xl font-bold flex justify-between">
            Filters{' '}
            <button
              type="button"
              aria-label="close"
              aria-pressed={isOpen}
              onClick={() => setMoreFilterOpen(!isOpen)}>
              x
            </button>
          </h2>
        </div>
      </div>
    </div>
  );
};

export { FilterComponent, HorizontalSearchBar };
