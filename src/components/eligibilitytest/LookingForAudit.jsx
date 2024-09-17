import React, { useState, useEffect } from 'react';
import Button from '../shared/Button';
import SwitchButton from '../shared/SwitchButton';
import Icon from '../shared/Icon';
import NumericInput from '../shared/NumericInput';
import {
  useFormContext,
  Controller,
  FormProvider,
  useWatch,
} from 'react-hook-form';

import Title from '../shared/Title';
import { useGetProjectDropDownsQuery } from '../../redux/features/project';
import Loader from '../shared/Loader';
import EmptyList from '../shared/EmptyList';
import Select from '../shared/Select';
import MapComponent from '../shared/Map';
import Input from '../shared/Input';
const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed md:hidden inset-0 bg-black opacity-50 z-50"
          onClick={toggleSidebar}></div>
      )}

      <div
        className={`transition-all duration-300 ${
          isOpen ? 'w-80' : 'w-0'
        }  md:h-full absolute top-0 left-0 bottom-0 h-screen md:relative bg-white z-50 `}>
        <button
          type="button"
          aria-label="toggle sidebar"
          onClick={toggleSidebar}
          className={`z-10 transform ${
            isOpen ? '' : 'rotate-180'
          } transition-all duration-300 ease-in-out fixed md:absolute top-4  ${
            isOpen ? 'left-72' : '-left-1 hover:translate-x-[5px]'
          } `}>
          <svg
            className="drop-shadow-lg"
            aria-hidden="true"
            focusable="false"
            width="30"
            height="30"
            viewBox="0 0 30 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.38498e-07 18L30 0.679489L30 35.3205L2.38498e-07 18Z"
              fill="#54A967"
            />
          </svg>
        </button>
        <div
          className={`p-4  ${
            isOpen ? 'block opacity-100' : 'hidden opacity-0'
          }`}>
          <h2 className="text-2xl font-bold my-4">Why?</h2>
          <p className="mb-4 transition-opacity">
            The results of a preliminary energy audit can be used to justify a
            more detailed energy audit, which can provide more specific
            recommendations for energy-saving measures.
          </p>
          <p className="font-bold transition-opacity">
            The goal of a preliminary energy audit is to:
          </p>
          <ul className="list-disc list-inside transition-opacity">
            <li>Identify the major energy-consuming systems in a facility</li>
            <li>Quantify the energy consumption of these systems</li>
            <li>Identify low-cost and no-cost energy-saving measures</li>
            <li>
              Estimate the potential energy savings from implementing these
              measures
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

const MainForm = ({
  isSidebarOpen,
  eligibilityTestData,
  setEligibilityTestData,
  toggleSidebar,
}) => {
  const {
    control,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useFormContext();
  const { data, error, isLoading } = useGetProjectDropDownsQuery('generalInfo');
  const { city, economicSector, servedCountry, siteType } = data || [];

  const handleChange = (name, newValue) => {
    setValue(name, newValue);
  };

  const handleNumericInputChange = (name, value) => {
    setEligibilityTestData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handlePositionChange = (newPosition) => {
    setEligibilityTestData((prevState) => ({
      ...prevState,
      lat: String(newPosition.lat),
      long: String(newPosition.lng),
    }));
  };
  const showCities = useWatch({
    control,
    name: 'servedCountryId',
  });
  if (isLoading) return <Loader />;
  if (error) return <EmptyList message={'Something went wrong...'} />;

  return (
    <div
      className={`transition-all duration-300 md:ml-8 pl-6 border-l border-black`}>
      <h1 className="text-3xl font-bold mb-6">Preliminary Energy Audit</h1>
      <h1 className="text-[38px] font-bold mb-6">Start Here</h1>
      <div className="mb-6">
        <Controller
          name="projectName"
          control={control}
          rules={{
            required: 'Project Name is required',
            maxLength: {
              value: 60,
              message: 'Project Name should not exceed 60 characters',
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              type="textarea"
              variant="innerShadow"
              label="project name"
              placeholder="Enter your project name"
              labelStyle={{ fontSize: '24px' }}
              maxLength={60}
            />
          )}
        />
      </div>
      <div className="mb-6">
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="textarea"
              variant="innerShadow"
              label="Description"
              placeholder="Project Description"
              labelStyle={{ fontSize: '24px' }}
              maxLength={120}
            />
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col gap-4">
          <Controller
            name="economicSectorId"
            control={control}
            defaultValue={null}
            rules={{
              required: 'Economic Sector is required',
            }}
            render={({ field }) => (
              <Select
                {...field}
                label="Economic Sector"
                options={economicSector}
                onChange={(value) => handleChange('economicSectorId', value.id)}
              />
            )}
          />
          <Controller
            name="technicalInfo.buildingFunctionId" // Dot notation for nested field
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <Select
                {...field}
                label="Building Function"
                options={siteType}
                onChange={(value) =>
                  handleChange('technicalInfo.buildingFunctionId', value.id)
                }
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Controller
            control={control}
            name="servedCountryId"
            render={({ field }) => (
              <Select
                {...field}
                label="Building Location"
                options={servedCountry}
                name="servedCountryId"
                onChange={(value) => handleChange('servedCountryId', value.id)}
              />
            )}
          />
          {showCities ? (
            <Controller
              control={control}
              name="cityId"
              render={({ field }) => (
                <Select
                  {...field}
                  label="City"
                  options={city}
                  name="cityId"
                  onChange={(e) => handleChange('cityId', e.id)}
                />
              )}
            />
          ) : null}
        </div>
        <div className="mb-6">
          <label className="block text-[#1E4A28] text-[24px] mb-2 font-bold">
            Building Area
          </label>
          <div className="p-4 bg-[#EFEFEF] rounded-lg flex flex-col gap-6">
            <Controller
              name="landArea"
              control={control}
              render={({ field }) => (
                <NumericInput
                  {...field}
                  label="Land Area (sqm)"
                  unit="sqm"
                  handleChange={(e) => handleChange('landArea', e)}
                />
              )}
            />

            <Controller
              name="grossArea"
              control={control}
              render={({ field }) => (
                <NumericInput
                  {...field}
                  label="Gross Built-Up Area (sqm)"
                  unit="sqm"
                  handleChange={(e) => handleChange('grossArea', e)}
                />
              )}
            />

            <Controller
              name="noOfFloors"
              control={control}
              render={({ field }) => (
                <NumericInput
                  {...field}
                  label="No. of Floors (including bsement)"
                  unit="floor"
                  handleChange={(e) => handleChange('noOfFloors', e)}
                />
              )}
            />
          </div>
        </div>
        <MapComponent setProjectPosition={handlePositionChange} />
        <div className="mb-6">
          <label className="block text-[#1E4A28] text-[24px] mb-2 font-bold">
            Building Orientation
          </label>
          <div className="p-4 py-6 bg-[#EFEFEF] rounded-lg flex flex-col gap-6">
            <Controller
              name="buildingOrientation"
              control={control}
              render={({ field }) => (
                <NumericInput
                  {...field}
                  label="Orientation of North (In degrees)"
                  unit="deg"
                  decimals
                  handleChange={(e) => handleChange('buildingOrientation', e)}
                />
              )}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-[#1E4A28] text-[24px] mb-2 font-bold">
            Building typical occupancy
          </label>
          <div className="p-4 py-6 bg-[#EFEFEF] rounded-lg flex flex-col gap-6">
            <Controller
              name="buildingTypicalOccupancy"
              control={control}
              render={({ field }) => (
                <NumericInput
                  {...field}
                  label="Max. Number of persons"
                  unit="Person"
                  handleChange={(e) =>
                    handleChange('buildingTypicalOccupancy', e)
                  }
                />
              )}
            />
          </div>
        </div>
        <div className="mb-6 flex flex-col justify-between">
          <label className="block text-[#1E4A28] text-[24px] mb-2 font-bold md:w-1/2">
            hours per day that the building is occupied
          </label>
          <div className="p-4 py-6 bg-[#EFEFEF] rounded-lg flex flex-col gap-6">
            <Controller
              name="buildingIsOccupied"
              control={control}
              render={({ field }) => (
                <NumericInput
                  {...field}
                  label={'Orientation of North (hours)'}
                  handleChange={(value) =>
                    handleChange('buildingIsOccupied', value)
                  }
                  unit="hours"
                />
              )}
            />
          </div>
        </div>
        <div className="mb-6 flex flex-col justify-between">
          <label className="block text-[#1E4A28] text-[24px] mb-2 font-bold md:w-1/2">
            hours per day that the lights are on
          </label>
          <div className="p-4 py-6 bg-[#EFEFEF] rounded-lg flex flex-col gap-6">
            <Controller
              name="lightsAreOn"
              control={control}
              render={({ field }) => (
                <NumericInput
                  {...field}
                  label={'Max. Number of (hours)'}
                  handleChange={(value) => handleChange('lightsAreOn', value)}
                  unit="hours"
                />
              )}
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-[#1E4A28] text-[24px] mb-2 font-bold md:w-1/2">
            Building Façade type
          </label>
          <div className="p-4 py-6 bg-[#EFEFEF] rounded-lg flex flex-col gap-6">
            <LightingSystemTypes />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-[#1E4A28] text-[24px] mb-2 font-bold md:w-1/2">
            Fenestration
          </label>
          <div className="p-4 py-6 bg-[#EFEFEF] rounded-lg flex flex-col gap-6">
            <Controller
              name="fenestration"
              render={({ field }) => (
                <NumericInput
                  {...field}
                  label={'Fenestration Percentage (%)'}
                  handleChange={(value) => handleChange('fenestration', value)}
                  unit="%"
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const LookingForAudit = ({ setEligibilityTestData, eligibilityTestData }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // Manage the no-scroll class on body
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Cleanup function to remove the class when the component is unmounted
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isSidebarOpen]);
  return (
    <div className="flex w-full">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <MainForm
        isSidebarOpen={isSidebarOpen}
        setEligibilityTestData={setEligibilityTestData}
        eligibilityTestData={eligibilityTestData}
        toggleSidebar={toggleSidebar}
      />
    </div>
  );
};

export default LookingForAudit;

const LightingSystemTypes = () => {
  const { control } = useFormContext();

  const [options, setOptions] = useState([
    { id: 1, name: 'Incandescent lighting' },
    { id: 2, name: 'Fluorescent lighting' },
    { id: 3, name: 'LED lighting' },
    { id: 4, name: 'HID' },
    { id: 5, name: 'Halogen lighting' },
    { id: 6, name: 'Fluorescent' },
    { id: 7, name: 'Task lighting' },
    { id: 8, name: 'Ambient lighting' },
    { id: 9, name: 'Accent lighting' },
    { id: 10, name: 'Security lighting' },
    { id: 11, name: 'Other' },
  ]);

  const [newOption, setNewOption] = useState('');
  const [toggleInput, setToggleInput] = useState(false);
  const [editingOption, setEditingOption] = useState(null);
  const [editedOptionName, setEditedOptionName] = useState('');

  // Handle adding a new option
  const handleAddOption = () => {
    setToggleInput(true);
    if (newOption && !options.some((opt) => opt.name === newOption)) {
      const newOptionObj = { id: options.length + 1, name: newOption };
      setOptions([...options, newOptionObj]);
      setNewOption('');
    }
  };

  // Handle editing an option
  const handleEditOption = (option) => {
    setEditingOption(option.id);
    setEditedOptionName(option.name);
  };

  const handleSaveEdit = (optionId) => {
    setOptions((prevOptions) =>
      prevOptions.map((opt) =>
        opt.id === optionId ? { ...opt, name: editedOptionName } : opt
      )
    );
    setEditingOption(null);
    setEditedOptionName('');
  };

  // Handle deleting an option
  const handleDeleteOption = (optionId) => {
    setOptions((prevOptions) =>
      prevOptions.filter((opt) => opt.id !== optionId)
    );
  };

  return (
    <div className="p-4 rounded-md w-full relative">
      <Controller
        name="lightingSystemTypesIds"
        control={control}
        defaultValue={[]} // Ensure default value is an empty array
        render={({ field: { value = [], onChange } }) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {options.map((option) => (
              <label key={option.id} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={value.includes(option.id)}
                  onChange={(e) => {
                    const updatedSelectedOptions = e.target.checked
                      ? [...value, option.id]
                      : value.filter((id) => id !== option.id);
                    onChange(updatedSelectedOptions);
                  }}
                />
                {editingOption === option.id ? (
                  <input
                    type="text"
                    className="border truncate p-1 rounded mr-2 flex-1"
                    value={editedOptionName}
                    onChange={(e) => setEditedOptionName(e.target.value)}
                    onBlur={() => handleSaveEdit(option.id)}
                  />
                ) : (
                  <span
                    onDoubleClick={() => handleEditOption(option)}
                    className="flex-1">
                    {option.name}
                  </span>
                )}

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleDeleteOption(option.id)}
                  className="ml-2 text-red-500">
                  Delete
                </button>
              </label>
            ))}
          </div>
        )}
      />

      {/* Add new option input */}
      <div className="mt-4 absolute -bottom-10 right-0 flex flex-col items-end">
        {toggleInput && (
          <input
            onBlur={() => setToggleInput((prev) => !prev)}
            type="text"
            className="border p-2 w-full rounded transition-transform transform translate-y-0 mb-2"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="Add New Type"
          />
        )}
        <Button
          hasIcon
          iconName={'addProject'}
          iconPosition="left"
          className={'w-full'}
          onClick={handleAddOption}>
          Add New Type
        </Button>
      </div>
    </div>
  );
};
const consumptionResources = {
  electricity: {
    label: 'Electricity',
    icon: <Icon name="electricity" />,
  },
  water: {
    label: 'Water',
    icon: <Icon name="water" />,
  },
  naturalGas: {
    label: 'Natural Gas',
    icon: <Icon name="naturalGas" />,
  },

  diesel: {
    label: 'Diesel',
    icon: <Icon name="diesel" />,
  },
  gasoline: {
    label: 'Gasoline',
    icon: <Icon name="gasoline" />,
  },
};
const ConsumptionComponent = ({ type, isFirstItem }) => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const consumptionData = watch(`consumption`); // Watch the consumption state
  const isEnabled = consumptionData?.[type]; // Check if the toggle for this type is enabled
  const handleSwitchChange = (type) => {
    const isToggledOn = !consumptionData?.[type];
    setValue(`consumption.${type}`, isToggledOn); // Toggle the state
    if (!isToggledOn) {
      // Reset values to 0 when the toggle is turned off
      setValue(`consumption.${type}AnnualConsumptionExPost`, 0);
      setValue(`consumption.${type}AverageTariffCostExPost`, 0);
      setValue(`consumption.${type}AnnualConsumptionBenchmark`, 0);
      setValue(`consumption.${type}AverageTariffCostBenchmark`, 0);
    }
  };
  const handleInputChange = (name, value) => {
    setValue(name, value);
  };
  const config = consumptionResources[type] || consumptionResources.electricity;
  return (
    <div
      className={`flex flex-col md:flex-row items-center p-4 rounded-lg md:w-[70%] relative mt-3`}>
      <div
        className={`flex flex-1 items-center mb-1 md:mb-0 mr-0 md:-mr-[3rem] md:px-4 md:py-[1.2rem] rounded-[38px] gap-4 md:min-w-[210px] w-full justify-between ${
          isEnabled ? 'opacity-100 md:border' : 'opacity-75'
        }`}>
        <div className="flex flex-col">
          <SwitchButton
            handleChange={() => handleSwitchChange(type)}
            isChecked={isEnabled}
          />
          <span
            className={`text-lg font-semibold text-[#1E4A28] ${
              isEnabled ? 'opacity-100' : 'opacity-75'
            }`}>
            {config.label}
          </span>
        </div>
      </div>
      <div
        className={`relative w-full mb-4 rounded-xl mt-2 ${
          isEnabled ? 'bg-[#B0D0A64D]' : 'bg-[#E2E2E2] disabled-container'
        }`}>
        <div className="absolute top-[50%] -translate-y-[50%] -left-5 border-4 border-white text-2xl bg-white rounded-full">
          {config.icon}
        </div>

        {/* Annual Consumption Section */}
        <div className="flex flex-wrap justify-center items-center gap-4 py-3">
          {isFirstItem && (
            <p
              className={`text-[#1E4A28] text-[19px] font-[700] absolute top-[-40px] left-[20%]`}>
              Ex-Post
            </p>
          )}
          <div className="flex items-center gap-4 justify-center w-full md:w-auto">
            {/* Ex-Post Annual Consumption */}
            <Controller
              name={`consumption.${type}AnnualConsumptionExPost`}
              control={control}
              rules={isEnabled ? { required: 'Required' } : false}
              render={({ field }) => (
                <NumericInput
                  {...field}
                  disabled={!isEnabled}
                  handleChange={(e) =>
                    handleInputChange(
                      `consumption.${type}AnnualConsumptionExPost`,
                      e
                    )
                  }
                />
              )}
            />
            <div className="text-center md:text-left w-full md:w-auto">
              <div>Annual Consumption (MWh/year)</div>
            </div>
            {/* Benchmark Annual Consumption */}
            <Controller
              name={`consumption.${type}AnnualConsumptionBenchmark`}
              control={control}
              rules={isEnabled ? { required: 'Required' } : false}
              render={({ field }) => (
                <NumericInput
                  {...field}
                  disabled={!isEnabled}
                  handleChange={(e) =>
                    handleInputChange(
                      `consumption.${type}AnnualConsumptionBenchmark`,
                      e
                    )
                  }
                />
              )}
            />
          </div>
        </div>
        <hr className={`m-3 hr-transition ${isEnabled ? 'active' : ''}`} />

        {/* Average Tariff Cost Section */}
        <div className="flex flex-wrap justify-center items-center gap-4 py-3">
          {isFirstItem && (
            <p
              className={`text-[#1E4A28] text-[19px] font-[700] absolute top-[-40px] right-[20%]`}>
              Benchmark
            </p>
          )}
          <div className="flex items-center gap-4 justify-between w-full md:w-auto">
            {/* Ex-Post Average Tariff Cost */}
            <Controller
              name={`consumption.${type}AverageTariffCostExPost`}
              control={control}
              rules={isEnabled ? { required: 'Required' } : false}
              render={({ field }) => (
                <NumericInput
                  {...field}
                  disabled={!isEnabled}
                  handleChange={(e) =>
                    handleInputChange(
                      `consumption.${type}AverageTariffCostExPost`,
                      e
                    )
                  }
                />
              )}
            />
            <div className="text-center md:text-left w-full md:w-auto">
              <div>Average Tariff Cost ($cents/kWh)</div>
            </div>
            {/* Benchmark Average Tariff Cost */}
            <Controller
              name={`consumption.${type}AverageTariffCostBenchmark`}
              control={control}
              rules={isEnabled ? { required: 'Required' } : false}
              render={({ field }) => (
                <NumericInput
                  {...field}
                  disabled={!isEnabled}
                  handleChange={(e) =>
                    handleInputChange(
                      `consumption.${type}AverageTariffCostBenchmark`,
                      e
                    )
                  }
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const SeconedStep = ({ setEligibilityTestData, eligibilityTestData }) => {
  return (
    <>
      <div className="mb-20 w-full">
        <label className="block text-[#1E4A28] text-[24px] mb-2 font-bold md:w-1/2">
          lighting system types
        </label>
        <div className="md:w-1/3 bg-[#EFEFEF] rounded-lg">
          <LightingSystemTypes />
        </div>
      </div>
      <div className="mb-6 w-full">
        <label className="block text-[#1E4A28] text-[24px] mb-2 font-bold md:w-1/2">
          Building Consumption
        </label>
        <ConsumptionComponent
          type="electricity"
          eligibilityTestData={eligibilityTestData}
          setEligibilityTestData={setEligibilityTestData}
          isFirstItem
        />
        <ConsumptionComponent
          type="water"
          eligibilityTestData={eligibilityTestData}
          setEligibilityTestData={setEligibilityTestData}
        />
        <ConsumptionComponent
          type="naturalGas"
          eligibilityTestData={eligibilityTestData}
          setEligibilityTestData={setEligibilityTestData}
        />
        <ConsumptionComponent
          type="gasoline"
          eligibilityTestData={eligibilityTestData}
          setEligibilityTestData={setEligibilityTestData}
        />
        <ConsumptionComponent
          type="diesel"
          eligibilityTestData={eligibilityTestData}
          setEligibilityTestData={setEligibilityTestData}
        />
      </div>
    </>
  );
};

const ThirdStep = ({ data, isLoading }) => {
  console.log(data);
  return (
    <div className="w-full flex flex-col gap-10 px-10 py-4 md:w-[70%]">
      <Title
        type={'h1'}
        className="text-[28px]  font-bold my-4"
        text={'Initial Indicators'}
      />
      <div className="flex flex-col md:flex-row gap-10">
        <div>
          <p className="text-[24px] font-bold text-[#1E4A28] mb-2">
            Carbon Footprint Calculator
          </p>
          <div className="bg-[#BFE0C6] rounded-lg flex flex-col items-center justify-center py-[32px] px-[105px] h-[200px]">
            <span className="text-[#135D28] font-abel text-[20px]">
              Estimated Carbon Footprint
            </span>
            <Title
              type={'h1'}
              className="text-[50px]  text-[#1E4A28] font-bold my-4 "
              text={data.totalCo2Saved}
            />
            <span className="text-[#135D28]">tons of CO2 per year</span>
          </div>
        </div>
        <div>
          <p className="text-[24px] font-bold text-[#1E4A28] mb-2">
            Initial Potential Savings
          </p>
          <div className="bg-[#BFE0C6] rounded-lg flex flex-col items-center justify-center py-[32px] px-[105px] h-[200px]">
            <span className="text-[#135D28] text-[20px]">
              Estimated Projected Savings
            </span>
            <Title
              type={'h1'}
              className="text-[50px] font-bold my-4 text-[#1E4A28]"
              text={`${data.initialPotentialSavings}%`}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-5 border-t border-black pt-3">
        <svg
          width="75"
          height="70"
          viewBox="0 0 154 189"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M116.757 40.2845C116.85 39.7397 116.822 39.1812 116.677 38.6482C116.531 38.1151 116.27 37.6203 115.914 37.1983C115.557 36.7762 115.112 36.4372 114.611 36.2047C114.11 35.9723 113.564 35.852 113.011 35.8524H39.9877C39.4355 35.8529 38.8901 35.9736 38.3893 36.2061C37.8886 36.4387 37.4445 36.7776 37.0879 37.1992C36.7314 37.6208 36.471 38.1149 36.3248 38.6474C36.1786 39.1798 36.1501 39.7377 36.2413 40.2822C38.8785 55.8175 47.3514 63.8993 60.123 73.028C62.7142 74.9162 65.4574 76.5864 68.3244 78.0216C69.9537 79.8626 70.9547 81.669 70.9547 83.602V124.333C70.9547 135.399 51.7352 142.31 42.2152 151.961C38.2825 155.974 39.8634 162.445 45.4737 162.445H108.098C113.695 162.445 114.946 156.301 111.368 151.97C102.49 141.214 82.4698 135.3 82.4698 124.324V83.5928C82.4698 81.5079 83.6503 79.5726 85.5257 77.5936C88.0865 76.2465 90.5474 74.7177 92.8895 73.0189C105.652 63.8947 114.123 55.8175 116.757 40.2845Z"
            fill="#ADADAD"
          />
          <path
            d="M136.704 27.3611V16.8723H148.548C149.731 16.8717 150.866 16.4013 151.702 15.5646C152.538 14.7279 153.008 13.5933 153.008 12.4103V4.45969C153.008 3.27691 152.538 2.14257 151.702 1.30621C150.865 0.469859 149.731 0 148.548 0H4.45969C3.27691 0 2.14257 0.469859 1.30621 1.30621C0.469859 2.14257 0 3.27691 0 4.45969V12.4103C-1.57325e-07 13.5933 0.469784 14.7279 1.30607 15.5646C2.14236 16.4013 3.2767 16.8717 4.45969 16.8723H16.3062V25.3406C16.3246 37.7306 19.2739 49.9405 24.9131 60.9728C30.5522 72.0052 38.7212 81.547 48.7528 88.8188L56.1949 94.1967L48.7528 99.5791C38.7207 106.85 30.5513 116.391 24.9121 127.423C19.2729 138.455 16.3239 150.665 16.3062 163.055V171.526H4.45969C3.27691 171.526 2.14257 171.995 1.30621 172.832C0.469859 173.668 0 174.803 0 175.985V183.936C0.00182908 185.117 0.472501 186.25 1.30866 187.085C2.14481 187.92 3.2781 188.389 4.45969 188.389H148.555C149.141 188.389 149.721 188.273 150.262 188.049C150.803 187.825 151.294 187.497 151.709 187.082C152.123 186.668 152.451 186.177 152.675 185.636C152.899 185.095 153.015 184.515 153.015 183.929V175.978C153.015 175.393 152.899 174.813 152.675 174.272C152.451 173.731 152.123 173.239 151.709 172.825C151.294 172.411 150.803 172.082 150.262 171.858C149.721 171.634 149.141 171.519 148.555 171.519H136.711V161.028C136.711 138.95 124.4 116.003 103.779 99.6527L96.8913 94.1874L103.779 88.7267C124.393 72.386 136.704 49.4432 136.704 27.3611ZM89.7438 85.7697C88.474 86.777 87.4483 88.0583 86.7431 89.5177C86.038 90.9771 85.6718 92.577 85.6718 94.1978C85.6718 95.8186 86.038 97.4185 86.7431 98.8779C87.4483 100.337 88.474 101.619 89.7438 102.626L96.912 108.31C114.914 122.577 125.661 142.296 125.661 161.037V166.139C125.661 167.567 125.093 168.938 124.083 169.949C123.073 170.959 121.703 171.527 120.274 171.528H32.7274C32.0198 171.528 31.3191 171.388 30.6653 171.118C30.0116 170.847 29.4176 170.45 28.9174 169.949C28.4171 169.449 28.0203 168.855 27.7498 168.201C27.4792 167.547 27.34 166.846 27.3403 166.139V163.057C27.3537 152.413 29.8855 141.923 34.7288 132.444C39.5722 122.965 46.5896 114.767 55.2077 108.519L62.9673 102.907C64.3464 101.91 65.4694 100.6 66.2438 99.0844C67.0182 97.569 67.4221 95.8915 67.4221 94.1897C67.4221 92.488 67.0182 90.8105 66.2438 89.2951C65.4694 87.7798 64.3464 86.4698 62.9673 85.4729L55.2077 79.8672C46.5903 73.6188 39.5733 65.4205 34.7301 55.9419C29.8868 46.4633 27.3546 35.9734 27.3403 25.3291V22.2479C27.3403 20.8191 27.9079 19.4489 28.9182 18.4386C29.9285 17.4284 31.2987 16.8608 32.7274 16.8608H120.276C120.983 16.8608 121.684 17.0001 122.337 17.2708C122.991 17.5416 123.585 17.9384 124.085 18.4386C124.585 18.9389 124.982 19.5327 125.253 20.1863C125.524 20.8399 125.663 21.5404 125.663 22.2479V27.3496C125.663 46.0904 114.916 65.8 96.9143 80.072L89.7438 85.7697Z"
            fill="#ADADAD"
          />
        </svg>
        <div className="flex flex-col gap-2 md:w-1/2">
          <Title
            type={'h2'}
            className="font-bold mb-4 text-[#202020]"
            text={
              'Detailed Energy Audit Report is now under process and recommendations are being prepared'
            }
          />
          <Title
            className="text-[#3E3E3E] font-abel text-[18px]"
            text={
              'Our team is designing the architecture, energy engineering and industrial techniques solutions specific to your needs.'
            }
          />
          <Title
            className="text-[#3E3E3E] font-abel text-[18px]"
            text={
              'You will receive a notification when your recommendations are available.'
            }
          />
        </div>
      </div>
    </div>
  );
};

export { ThirdStep, SeconedStep };
