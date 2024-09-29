import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Icon from '../../shared/Icon';
import SwitchButton from '../../shared/SwitchButton';
import NumericInput from '../../shared/NumericInput';

import Button from '../../shared/Button';
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
  } = useFormContext({
    defaultValues: {
      consumption: {},
    },
  });
  const consumptionData = watch('consumption');
  const isEnabled = consumptionData?.[type];
  const handleSwitchChange = (type) => {
    const isToggledOn = !consumptionData?.[type];

    const updatedConsumption = {
      ...consumptionData,
      [type]: isToggledOn,
    };

    setValue('consumption', updatedConsumption);

    if (!isToggledOn) {
      setValue(`consumption.${type}AnnualConsumptionExPost`, 0);
      setValue(`consumption.${type}AverageTariffCostExPost`, 0);
      setValue(`consumption.${type}AnnualConsumptionBenchmark`, 0);
      setValue(`consumption.${type}AverageTariffCostBenchmark`, 0);
    }
  };

  const config = consumptionResources[type] || consumptionResources.electricity;
  return (
    <div
      className={`flex flex-col md:flex-row items-center p-4 rounded-lg w-full relative mt-3`}>
      <div
        className={`flex flex-1 items-center mb-1 md:mb-0 mr-0 md:-mr-[3rem] md:px-4 md:py-[12px] rounded-[25px] gap-4 md:min-w-[210px] w-full justify-between ${
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
        <div className="flex flex-wrap justify-center items-center gap-4 py-3 md:px-[50px]">
          {isFirstItem && (
            <p
              className={`text-[#1E4A28] text-[19px] font-[700] absolute top-[-40px] left-[20%]`}>
              Ex-Post
            </p>
          )}
          <div className="flex items-center gap-4 justify-center w-full md:w-auto">
            {/* Ex-Post Annual Consumption */}
            <Controller
              defaultValue={0}
              name={`consumption.${type}AnnualConsumptionExPost`}
              control={control}
              rules={{
                required: isEnabled ? 'This field is required' : false,
                validate: (value) =>
                  !isEnabled ||
                  value > 0 ||
                  `Since you Enabled ${type} Annual Consumption Ex-Post: value must be greater than 0`,
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <NumericInput {...field} disabled={!isEnabled} />
                </>
              )}
            />

            <p className="line-clamp-2 text-center">
              Annual Consumption (MWh/year)
            </p>
            {/* Benchmark Annual Consumption */}
            <Controller
              defaultValue={0}
              name={`consumption.${type}AnnualConsumptionBenchmark`}
              control={control}
              rules={{
                required: isEnabled ? 'This field is required' : false,
                validate: (value) =>
                  !isEnabled ||
                  value > 0 ||
                  `Since You Enabled ${type} Annual Consumption Bench Mark: Value must be greater than 0`,
              }}
              render={({ field, fieldState: { error } }) => (
                <NumericInput {...field} disabled={!isEnabled} />
              )}
            />
          </div>
        </div>
        <hr
          className={`ml-4 my-1 hr-transition ${isEnabled ? 'active' : ''}`}
        />

        {/* Average Tariff Cost Section */}
        <div className="flex flex-wrap justify-center items-center gap-4 py-3 md:px-[50px]">
          {isFirstItem && (
            <p
              className={`text-[#1E4A28] text-[19px] font-[700] absolute top-[-40px] right-[20%]`}>
              Benchmark
            </p>
          )}
          <div className="flex items-center gap-4 justify-between w-full md:w-auto">
            {/* Ex-Post Average Tariff Cost */}
            <Controller
              defaultValue={0}
              name={`consumption.${type}AverageTariffCostExPost`}
              control={control}
              rules={{
                required: isEnabled ? 'This field is required' : false,
                validate: (value) =>
                  !isEnabled ||
                  value > 0 ||
                  `Since You Enabled ${type} Average Tariff Const Ex-Post: value must be greater than 0`,
              }}
              render={({ field }) => (
                <NumericInput {...field} disabled={!isEnabled} />
              )}
            />
            <p className="line-clamp-2 text-center">
              Average Tariff Cost ($cents/kWh)
            </p>

            {/* Benchmark Average Tariff Cost */}
            <Controller
              defaultValue={0}
              name={`consumption.${type}AverageTariffCostBenchmark`}
              control={control}
              rules={{
                required: isEnabled ? 'This field is required' : false,
                validate: (value) =>
                  !isEnabled ||
                  value > 0 ||
                  `Since you Enabled ${type} Average Tariff Const Bench Mark: Value must be greater than 0`,
              }}
              render={({ field }) => (
                <NumericInput {...field} disabled={!isEnabled} />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const SeconedStep = () => {
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
        <div className="md:w-[70%]">
          <ConsumptionComponent type="electricity" isFirstItem />
          <ConsumptionComponent type="water" />
          <ConsumptionComponent type="naturalGas" />
          <ConsumptionComponent type="gasoline" />
          <ConsumptionComponent type="diesel" />
        </div>
      </div>
    </>
  );
};

export default SeconedStep;

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

export { LightingSystemTypes, ConsumptionComponent };
