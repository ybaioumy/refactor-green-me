import React, { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto"; // Ensure this is imported for Chart.js to work

import {
  useFormContext,
  Controller,
  useForm,
  FormProvider,
} from "react-hook-form";
import { Checkbox, Radio, Select, Input } from "antd";
import RadioButton from "../components/shared/RadioButton";
import { Dropdown } from "../components/shared/Dropdown";
import { Link } from "react-router-dom";
import Title from "../components/shared/Title";
import { useLocation } from "react-router-dom";
import alertValidationMessage from "../utilits/alertMessage";
const StepsSurvey = () => {
  const [showResult, setShowResult] = useState(false);
  const steps = [
    {
      children: [
        {
          content: <EmailStep />,
        },
        {
          content: <ElectricityConsumption />,
        },
        {
          content: <Appliances />,
        },
        {
          content: <Heating />,
        },
        {
          content: <Electricity />,
        },
        {
          content: <StepFive />,
        },
      ],
    },
  ];
  return (
    <div className='flex flex-col items-center justify-center h-screen  text-black green-gradinat overflow-y-scroll'>
      <div className='w-full max-w-[1500px] p-6 rounded-lg my-4 shadow-lg bg-gray-200 overflow-y-scroll'>
        {showResult ? (
          <Results setShowResult={setShowResult} />
        ) : (
          <Steps steps={steps} onSave={() => setShowResult(true)} />
        )}
      </div>
    </div>
  );
};
export default StepsSurvey;
const EmailStep = () => {
  const { control, handleSubmit } = useFormContext();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className='flex flex-col lg:flex-row m-auto items-center justify-between  p-6 rounded-lg '>
      {/* Left Section - Form Inputs */}
      <div className='w-full lg:w-1/2 flex flex-col space-y-4'>
        <div className=''>
          <strong className='text-2xl font-bold mb-2'> Start saving! </strong>{" "}
          <p>
            {" "}
            Leave us your email address and we will send you a copy of the
            results and advice on the product best suited to your needs.
          </p>
        </div>
        {/* Email Input */}
        <Controller
          name='email'
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email format",
            },
          }}
          defaultValue=''
          render={({ field }) => (
            <div className='mb-4'>
              <label className='block  mb-2'>Email</label>
              <input
                {...field}
                type='email'
                className='w-full p-2 border border-black rounded text-black'
                placeholder='Enter your email'
              />
            </div>
          )}
        />
        {/* Mobile Number Input */}
        <Controller
          name='mobile'
          control={control}
          defaultValue=''
          rules={{
            required: "Mobile number is required",
            pattern: {
              value: /^01[0-2,5,9]\d{8}$/,
              message: "Invalid mobile number format",
            },
          }}
          render={({ field }) => (
            <div className='mb-4'>
              <label className='block  mb-2'>Mobile Number</label>
              <input
                {...field}
                type='text'
                className='w-full p-2 border border-black rounded text-black'
                placeholder='Enter your mobile number'
              />
            </div>
          )}
        />
      </div>
      <div className='w-full lg:w-1/2 flex justify-end mt-6 lg:mt-0'>
        <img
          src={require("../assets/images/survey/cal-1.jpg")}
          alt='Right section visual'
          className='object-cover rounded-lg w-[70%]  h-64 lg:h-auto '
        />
      </div>
    </div>
  );
};
const { Option } = Select;

const ElectricityConsumption = () => {
  const [noOfPeople, setNoOffPeople] = useState("1 Person");
  const [noOfBedrooms, setNoOfBedrooms] = useState("1");
  const [customPeople, setCustomPeople] = useState("");
  const [customBedrooms, setCustomBedrooms] = useState("");

  const numberOfPeople = [
    {
      label: "1 Person",
      image: require("../assets/images/survey/1people-default.png"),
    },
    {
      label: "2 Persons",
      image: require("../assets/images/survey/2people-default.png"),
    },
    {
      label: "3 Persons",
      image: require("../assets/images/survey/3people-default.png"),
    },
    {
      label: "4 People",
      image: require("../assets/images/survey/4people-default.png"),
    },
    {
      label: "More than 5",
      image: require("../assets/images/survey/+5people-default.png"),
    },
  ];

  const handlePeopleChange = (value) => {
    setNoOffPeople(value);
    if (value === "More than 5") {
      setCustomPeople(""); // Reset if showing input
    }
  };

  const handleBedroomsChange = (value) => {
    setNoOfBedrooms(value);
    if (value === "More than 5") {
      setCustomBedrooms(""); // Reset if showing input
    }
  };

  return (
    <div className='max-w-5xl p-6'>
      <h2 className='text-2xl font-bold mb-4'>
        Please provide information about your household's electricity
        consumption:
      </h2>

      {/* Number of People Dropdown */}
      <div className='mb-4 flex flex-col w-full border-b-2 pb-4 border-black'>
        <label className='block mb-2'>
          Number of people living in the household:
        </label>
        <Select
          value={noOfPeople}
          onChange={handlePeopleChange}
          className='w-full max-w-2xl'
        >
          {numberOfPeople.map((option) => (
            <Option key={option.label} value={option.label}>
              {option.label}
            </Option>
          ))}
        </Select>

        {noOfPeople === "More than 5" && (
          <Input
            type='text'
            value={customPeople}
            onChange={(e) => setCustomPeople(e.target.value)}
            placeholder='Specify the number of people'
            className='mt-2 w-full max-w-2xl'
          />
        )}

        <div className='flex justify-between gap-10 mt-[20px] mb-[40px]'>
          {numberOfPeople.map((option) => (
            <div
              key={option.label}
              className={`relative flex flex-col items-center justify-between gap-3 cursor-default rounded ${
                noOfPeople === option.label ? "" : ""
              }`}
              onClick={() => handlePeopleChange(option.label)}
            >
              <img
                width={120}
                height={120}
                src={option.image}
                alt={option.label}
                className={`w-full h-full object-scale-down ${
                  noOfPeople === option.label
                    ? "filter brightness-[1111]"
                    : "brightness-100"
                }`}
              />
              <RadioButton
                label={option.label}
                checked={noOfPeople === option.label}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Number of Bedrooms Dropdown */}
      <div className='mb-4 mt-[40px]'>
        <label className='block mb-2'>Number of bedrooms in your home:</label>
        <Select
          value={noOfBedrooms}
          onChange={handleBedroomsChange}
          className='w-full max-w-2xl'
        >
          <Option value='1-2'>1-2</Option>
          <Option value='3-4'>3-4</Option>
          <Option value='More than 5'>More than 5</Option>
        </Select>

        {noOfBedrooms === "More than 5" && (
          <Input
            type='text'
            value={customBedrooms}
            onChange={(e) => setCustomBedrooms(e.target.value)}
            placeholder='Specify the number of bedrooms'
            className='mt-2 w-full max-w-2xl'
          />
        )}
      </div>
    </div>
  );
};

const Appliances = () => {
  const appliancesOptions = [
    {
      label: "Refrigerator",
      image: require("../assets/images/survey/refrigerator.png"),
      kWh: 150,
    },
    {
      label: "Electric stove",
      image: require("../assets/images/survey/stove.png"),
      kWh: 100,
    },
    {
      label: "Microwaves",
      image: require("../assets/images/survey/microwave-oven.png"),
      kWh: 60,
    },
    {
      label: "Dishwasher",
      image: require("../assets/images/survey/dishwasher.png"),
      kWh: 70,
    },
    {
      label: "Washing machine",
      image: require("../assets/images/survey/washing-machine.png"),
      kWh: 90,
    },
    {
      label: "Pool pump",
      image: require("../assets/images/survey/pump.png"),
      kWh: 200,
    },
    {
      label: "Dryer",
      image: require("../assets/images/survey/tumble-dry.png"),
      kWh: 120,
    },
    {
      label: "Air condition",
      image: require("../assets/images/survey/air-conditioner.png"),
      kWh: 150,
    },
  ];

  const { control, watch } = useFormContext();

  const selectedAppliances = watch("appliances") || [];
  const numberOfRooms =
    watch("HCSystems") === "1-2" ? 2 : watch("HCSystems") === "3-4" ? 4 : 5;

  const calculateTotalKWh = () => {
    let totalKWh = 0;

    selectedAppliances.forEach((appliance) => {
      const applianceOption = appliancesOptions.find(
        (option) => option.label === appliance
      );
      if (applianceOption) {
        totalKWh += applianceOption.kWh * numberOfRooms;
      }
    });

    return totalKWh;
  };

  const totalKWh = calculateTotalKWh();

  return (
    <div className='max-w-6xl p-6'>
      <h2 className='text-2xl font-bold mb-4'>Major Appliances:</h2>

      {/* Appliances Selection */}
      <div className='mb-4 flex flex-col w-full'>
        <label className='block mb-2'>
          *Please specify if you own any of the following appliances:
        </label>

        <div className='flex justify-between pt-[20px] pb-[30px] border-b-2 border-black '>
          <Controller
            name='appliances'
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <>
                {appliancesOptions.map((option) => (
                  <div
                    key={option.label}
                    className={`relative w-[119px] flex flex-col items-center gap-5 text-center truncate cursor-pointer rounded ${
                      field.value?.includes(option.label) ? "bg-gray-200" : ""
                    }`}
                    onClick={() => {
                      const newValues = field.value?.includes(option.label)
                        ? field.value.filter((label) => label !== option.label)
                        : [...field.value, option.label];
                      field.onChange(newValues);
                    }}
                  >
                    <img
                      src={option.image}
                      width={120}
                      height={120}
                      alt={option.label}
                      className={`w-full h-full object-scale-down ${
                        field.value?.includes(option.label)
                          ? "filter invert"
                          : ""
                      }`}
                    />
                    <span className='w-full'>{option.label}</span>
                    <Checkbox
                      checked={field.value?.includes(option.label)}
                      onChange={() => {
                        const newValues = field.value?.includes(option.label)
                          ? field.value.filter(
                              (label) => label !== option.label
                            )
                          : [...field.value, option.label];
                        field.onChange(newValues);
                      }}
                    />
                  </div>
                ))}
              </>
            )}
          />
        </div>
      </div>

      {/* Heating and Cooling Systems Dropdown */}
      <div className='mb-4 '>
        <label className='block mb-2'>Heating and Cooling Systems:</label>
        <Controller
          name='HCSystems'
          control={control}
          defaultValue='1-2'
          render={({ field }) => (
            <Select
              {...field}
              onChange={(value) => field.onChange(value)}
              className='max-w-2xl w-full'
            >
              <Option value='1-2'>1-2</Option>
              <Option value='3-4'>3-4</Option>
              <Option value='More than 5'>More than 5</Option>
            </Select>
          )}
        />
      </div>

      {/* Total kWh Display */}
      <div className='mb-4 border-t-2 border-black py-[20px] mt-[50px]'>
        <h3 className='text-lg font-bold'>Total Estimated kWh: {totalKWh}</h3>
        <Input value={totalKWh} className='max-w-2xl' />
      </div>
    </div>
  );
};
const Heating = () => {
  const { control, watch } = useFormContext();

  // Watch specific fields to handle "Other" input visibility
  const selectedHeating = watch("heating");
  const selectedCooling = watch("cooling");
  const selectedLightBulbs = watch("lightBulbs");

  const gasElectricData = [
    {
      label: "Gas",
      image: require("../assets/images/survey/gas.png"),
    },
    {
      label: "Electric",
      image: require("../assets/images/survey/electric.png"),
    },
  ];

  // State to store the custom "Other" input values
  const [otherHeating, setOtherHeating] = useState("");
  const [otherCooling, setOtherCooling] = useState("");
  const [otherLightBulbs, setOtherLightBulbs] = useState("");

  return (
    <div className='max-w-4xl p-6'>
      {/* Heating Section */}
      <div className='mb-6 border-b-2 border-black w-full pb-10'>
        <h2 className='text-2xl font-bold mb-4'>Heating:</h2>
        <Controller
          name='heating'
          control={control}
          render={({ field }) => (
            <div className='flex gap-6'>
              {gasElectricData.map((option) => (
                <label
                  key={option.label}
                  className='flex items-center text-center flex-col gap-4'
                >
                  <img
                    src={option.image}
                    alt={option.label}
                    width={120}
                    height={50}
                    className={` object-scale-down ${
                      field.value?.includes(option.label) ? "filter invert" : ""
                    }`}
                  />
                  <RadioButton
                    name='heating'
                    label={option.label}
                    value={option.label}
                    checked={field.value === option.label}
                    onChange={() => {
                      field.onChange(option.label);
                      if (option.label !== "Other") setOtherHeating(""); // Reset other input when not selected
                    }}
                  />
                </label>
              ))}
              {/* Show input when "Other" is selected */}
              {selectedHeating === "Other" && (
                <input
                  type='text'
                  placeholder='Specify other heating type'
                  className='w-full p-2 border border-black rounded'
                  value={otherHeating}
                  onChange={(e) => {
                    setOtherHeating(e.target.value);
                    field.onChange("Other"); // Keep the value as "Other" to ensure input stays visible
                  }}
                />
              )}
            </div>
          )}
        />
      </div>

      {/* Cooling Section */}
      <div className='mb-6 border-b-2 border-black w-full pb-10'>
        <h2 className='text-2xl font-bold mb-4'>Cooling:</h2>
        <Controller
          name='cooling'
          control={control}
          render={({ field }) => (
            <div className='flex flex-col gap-2'>
              {[
                "Central air conditioning",
                "Window air conditioner",
                "Split Air conditioner",
                "Other",
              ].map((option) => (
                <label key={option} className='flex items-center gap-2'>
                  <RadioButton
                    label={option}
                    name='cooling'
                    value={option}
                    checked={field.value === option}
                    onChange={() => {
                      field.onChange(option);
                      if (option !== "Other") setOtherCooling(""); // Reset other input when not selected
                    }}
                  />
                </label>
              ))}
              {/* Show input when "Other" is selected */}
              {selectedCooling === "Other" && (
                <input
                  type='text'
                  placeholder='Specify other cooling system'
                  className='w-full p-2 border border-black rounded'
                  value={otherCooling}
                  onChange={(e) => {
                    setOtherCooling(e.target.value);
                    field.onChange("Other"); // Keep the value as "Other" to ensure input stays visible
                  }}
                />
              )}
            </div>
          )}
        />
      </div>

      {/* Light Bulbs Count Section */}
      <div className='mb-6'>
        <label className='block mb-2'>Light Bulbs (Count):</label>
        <Controller
          name='lightBulbs'
          control={control}
          render={({ field }) => (
            <>
              <select
                {...field}
                className='w-full p-2 border border-black rounded'
                onChange={(e) => {
                  field.onChange(e.target.value);
                  if (e.target.value !== "Above 150") setOtherLightBulbs(""); // Reset other input when not selected
                }}
              >
                {[
                  "1-10",
                  "11-30",
                  "31-50",
                  "51-100",
                  "101-150",
                  "Above 150",
                  'Non-LED'
                ].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {/* Show input when "Above 150" is selected */}
              {selectedLightBulbs === "Above 150" && (
                <input
                  type='number'
                  placeholder='Specify exact number'
                  className='w-full p-2 border border-black rounded mt-2'
                  value={otherLightBulbs}
                  onChange={(e) => {
                    setOtherLightBulbs(e.target.value);
                    field.onChange("Above 150"); // Keep the value as "Above 150" to ensure input stays visible
                  }}
                />
              )}
            </>
          )}
        />
      </div>
    </div>
  );
};
const Electricity = () => {
  const { control, watch } = useFormContext();
  const ifMore = watch("electricityBill") === "More than 20,000";
  return (
    <div className='max-w-5xl h-[60vh] flex flex-col justify-center my-auto'>
      {/* Electricity Bill Section */}
      <div className='mb-6 border-b-2 border-black pb-[50px]'>
        <label className='block text-[18px] font-semibold mb-2'>
          What is your average monthly electricity bill?
        </label>
        <Controller
          name='electricityBill'
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className='w-full p-2 border border-black rounded max-w-2xl'
            >
              {[
                "Less than 500",
                "500-1,000",
                "1,000-5,000",
                "5,000-10,000",
                "10,000-20,000",
                "More than 20,000",
              ].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        />

        {/* Additional input field if "More than 20,000" is selected */}
        {ifMore && (
          <div className='mt-4'>
            <label className='block text-[16px] font-semibold mb-2'>
              Please specify your exact average monthly electricity bill:
            </label>
            <Controller
              name='exactElectricityBill'
              control={control}
              render={({ field }) => (
                <input
                  type='number'
                  {...field}
                  className='w-full p-2 border border-black rounded max-w-2xl'
                  placeholder='Enter amount in your currency'
                />
              )}
            />
          </div>
        )}
      </div>

      {/* Interested in Reducing Costs Section */}
      <div className='mb-6 border-b-2 border-black pb-[50px]'>
        <label className='block text-[18px] font-semibold mb-2'>
          Are you interested in reducing your electricity costs?
        </label>
        <Controller
          name='interestedReducingCost'
          control={control}
          render={({ field }) => (
            <div className='flex gap-4'>
              {["Yes", "No"].map((option) => (
                <label key={option} className='flex items-center gap-2'>
                  <RadioButton
                    label={option}
                    value={option}
                    checked={field.value === option} // Check if this option is selected
                    onChange={() => field.onChange(option)} // Update the form state
                  />
                </label>
              ))}
            </div>
          )}
        />
      </div>

      <div className='mb-6 text-lg font-semibold '>
        Would you be interested in exploring financial assistance options to
        help offset the cost of energy-efficient upgrades? Please use our 1
        minute loan calculator{" "}
        <a
          target='_blank'
          rel='noreferrer'
          href='https://www.yallakora.com/'
          className='text-blue-500 hover:text-blue-400'
        >
          ( Yallakora )
        </a>
      </div>
    </div>
  );
};

const StepFive = () => {
  const { control, watch } = useFormContext();
  const selectedPowerOutages = watch("powerOutages"); // Watch the powerOutages field
  const selectedPowerOutageDuration = watch("powerOutageDuration"); // Watch the powerOutageDuration field

  return (
    <div className='max-w-5xl'>
      {/* Renewable Energy Section */}
      <div className='mb-6 border-b-2 border-black pb-[50px]'>
        <label className='block text-[18px] font-semibold mb-2'>
          Are any solar panels or other renewable energy systems installed in
          your home?
        </label>
        <Controller
          name='renewableEnergy'
          control={control}
          render={({ field }) => (
            <div className='flex gap-4'>
              {["Yes", "No"].map((option) => (
                <label key={option} className='flex items-center gap-2'>
                  <RadioButton
                    label={option}
                    value={option}
                    checked={field.value === option} // Check if this option is selected
                    onChange={() => field.onChange(option)} // Update the form state
                  />
                </label>
              ))}
            </div>
          )}
        />
      </div>

      {/* Power Outages Section */}
      <div className='mb-6 border-b-2 border-black pb-[50px]'>
        <label className='block text-[18px] font-semibold mb-2'>
          How often do you experience power outages?
        </label>
        <Controller
          name='powerOutages'
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className='w-full p-2 border border-black rounded max-w-2xl'
            >
              {[
                "Once daily",
                "Once weekly",
                "Once monthly",
                "It varies from month to month",
                "Other",
              ].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        />
        {/* Show input when "Other" is selected */}
        {selectedPowerOutages === "Other" && (
          <Controller
            name='otherPowerOutageFrequency'
            control={control}
            render={({ field }) => (
              <input
                type='text'
                placeholder='Specify other outage frequency'
                className='w-full p-2 border border-black rounded mt-2 max-w-2xl'
                {...field}
              />
            )}
          />
        )}
      </div>

      {/* Power Outage Duration Section */}
      <div className='mb-6'>
        <label className='block text-[18px] font-semibold mb-2'>
          On average, how long do power outages last?
        </label>
        <Controller
          name='powerOutageDuration'
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className='w-full p-2 border border-black rounded max-w-2xl'
            >
              {["1", "2", "3", "Above 3"].map((option) => (
                <option key={option} value={option}>
                  {option} hours a day
                </option>
              ))}
            </select>
          )}
        />
        {/* Show input when "Above 3" is selected */}
        {selectedPowerOutageDuration === "Above 3" && (
          <Controller
            name='exactPowerOutageDuration'
            control={control}
            render={({ field }) => (
              <input
                type='number'
                placeholder='Specify exact number of hours'
                className='w-full p-2 border border-black rounded mt-2 max-w-2xl'
                {...field}
              />
            )}
          />
        )}
      </div>
    </div>
  );
};

export { Electricity, StepFive };

const Steps = ({ steps, hasLink = false, onSave, isLoading = false }) => {
  const methods = useForm();
  const location = useLocation();
  const {
    trigger,
    getValues,
    formState: { errors },
  } = methods;
  const [currentParentIndex, setCurrentParentIndex] = useState(0);
  const [currentChildIndex, setCurrentChildIndex] = useState(0);

  const childrenLength = steps[currentParentIndex]?.children?.length || 0;
  const currentChildContent =
    steps[currentParentIndex]?.children[currentChildIndex]?.content;

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      alertValidationMessage(errors);
    }
  }, [currentParentIndex, errors, location.pathname]);

  const handleNext = async () => {
    const isValid = await trigger();
    if (!isValid) {
      alertValidationMessage(errors);
    } else {
      if (currentChildIndex < steps[currentParentIndex].children.length - 1) {
        setCurrentChildIndex(currentChildIndex + 1);
      } else if (currentParentIndex < steps.length - 1) {
        setCurrentParentIndex(currentParentIndex + 1);
        setCurrentChildIndex(0);
      }
    }
  };

  const handlePrevious = () => {
    if (currentChildIndex > 0) {
      setCurrentChildIndex(currentChildIndex - 1);
    } else if (currentParentIndex > 0) {
      setCurrentParentIndex(currentParentIndex - 1);
      setCurrentChildIndex(steps[currentParentIndex - 1].children.length - 1);
    }
  };

  const onSubmit = async (data) => {
    const isValid = await trigger();
    if (!isValid) {
      alertValidationMessage(errors);
    } else {
      onSave(data);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className='w-full h-full '>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between'>
            <Title
              text={steps[currentParentIndex]?.label}
              type='h3'
              className={"font-bold text-[24px]"}
            />
            {steps[currentParentIndex]?.icon}
          </div>
          <div className='flex gap-2 w-fit mb-2'>
            {Array.from({ length: childrenLength }).map((_, index) => (
              <span
                key={index}
                className={`h-1 w-10 rounded-lg ${
                  currentChildIndex === index ? "stepsSpan" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
        </div>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className='w-full flex flex-col min-h-full justify-center'
        >
          {steps[currentParentIndex]?.children[currentChildIndex]
            ?.childLabel && (
            <div className='bg-card rounded-lg py-2 px-5 mb-5 mt-5'>
              <Title
                text={
                  steps[currentParentIndex]?.children[currentChildIndex]
                    ?.childLabel || ""
                }
                type='h3'
                className={"font-bold text-[20px]"}
              />
            </div>
          )}

          <div className='h-full w-full min-h-[60vh] transition-all duration-200'>
            {currentChildContent || null}
          </div>

          {/* Navigation Buttons */}
          <div className='flex flex-col md:flex-row-reverse mt-4 gap-3 justify-between items-center justify-self-end pb-2'>
            <div className='flex items-center gap-5'>
              {(currentChildIndex > 0 || currentParentIndex > 0) && (
                <Button
                  label={"Previous"}
                  onClick={handlePrevious}
                  disabled={!currentChildContent || isLoading} // Disable if no content
                />
              )}

              {currentChildIndex <
                steps[currentParentIndex].children.length - 1 ||
              currentParentIndex < steps.length - 1 ? (
                <Button
                  label={"Next"}
                  disabled={!currentChildContent || isLoading} // Disable if no content
                  isLoading={isLoading}
                  onClick={handleNext}
                />
              ) : (
                <Button
                  label={"Save"}
                  isLoading={isLoading}
                  onClick={methods.handleSubmit(onSubmit)}
                >
                  SAVE
                </Button>
              )}
            </div>

            {hasLink && (
              <p className='text-[#809F87] gap-2 items-center font-abel inline-flex'>
                Already have an account?
                <Link
                  className='underline font-semibold text-[#1E4A28] font-abel'
                  to='/'
                >
                  Login
                </Link>
              </p>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

const Button = ({ label, onClick, isLoading, disabled }) => {
  return (
    <button
      type='button'
      disabled={disabled}
      onClick={onClick}
      className='relative coolBeans inline-block px-6 py-3 font-bold text-black border rounded-lg overflow-hidden group'
    >
      {isLoading ? (
        "loading..."
      ) : (
        <span className='z-10 relative'>{label}</span>
      )}
    </button>
  );
};

const Results = ({ setShowResult }) => {
  // Data for bar chart
  const barChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Whole year",
        backgroundColor: "#1f77b4", // Blue
        data: [150, 200, 250, 300, 450, 500, 550, 520, 400, 350, 200, 150],
      },
      {
        label: "Winter",
        backgroundColor: "#2ca02c", // Green
        data: [50, 60, 70, 80, 90, 100, 110, 120, 100, 90, 60, 50],
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  // Data for donut charts
  const selfConsumptionData = {
    labels: ["Direct Consumption", "Battery", "Energy Exported"],
    datasets: [
      {
        data: [76.4, 14.9, 8.7],
        backgroundColor: ["#1f77b4", "#2ca02c", "#ff7f0e"],
      },
    ],
  };

  const energyIndependenceData = {
    labels: ["Direct Consumption", "Battery", "Energy Imported"],
    datasets: [
      {
        data: [43.9, 8.6, 47.5],
        backgroundColor: ["#1f77b4", "#2ca02c", "#ff7f0e"],
      },
    ],
  };

  const donutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className='max-w-7xl mx-auto text-black rounded-lg'>
      <h2 className='font-bold text-[45px]'>Your results </h2>
      <p className='text-[1.5rem] font-semibold border-b-2 border-black pb-3'>
        Your system's technical data
      </p>
      <div className='flex justify-between mb-8 pt-8'>
        <div className='text-center'>
          <p className='text-4xl font-bold'>7800 kWh</p>
          <p>Your annual energy needs</p>
        </div>
        <div className='text-center'>
          <p className='text-4xl font-bold'>10 kWh</p>
          <p>Storage battery capacity</p>
        </div>
        <div className='text-center'>
          <p className='text-4xl font-bold'>4 kW</p>
          <p>Sizing your Photovoltaic System</p>
        </div>
      </div>

      {/* Estimated Economic Efficiency Section */}
      <div className='flex justify-between mb-8'>
        <div className='text-center'>
          <p className='text-4xl font-bold'>1272 EUR</p>
          <p>Estimated annual savings</p>
        </div>
        <div className='text-center'>
          <p className='text-4xl font-bold'>31778 EUR</p>
          <p>Estimated savings over 25 years</p>
        </div>
      </div>

      {/* Chart Section */}
      <div>
        <p className='text-2xl font-bold mb-4'>Annual energy production</p>
        <Bar data={barChartData} options={barChartOptions} />
      </div>

      {/* Self-Consumption and Energy Independence Section */}
      <div className='flex justify-between my-8'>
        <div className='w-1/2 px-4 text-center'>
          <p className='text-2xl font-bold mb-4'>Self-consumption</p>
          <Doughnut data={selfConsumptionData} options={donutOptions} />
        </div>
        <div className='w-1/2 px-4 text-center'>
          <p className='text-2xl font-bold mb-4'>Energy independence</p>
          <Doughnut data={energyIndependenceData} options={donutOptions} />
        </div>
      </div>

      {/* Numerical Results Table */}
      <div className='mt-8'>
        <p className='text-2xl font-bold mb-4'>
          Presentation of numerical results
        </p>
        <table className='table-auto w-full bg-white text-black rounded-lg'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='px-4 py-2'>Name</th>
              <th className='px-4 py-2'>Unit</th>
              <th className='px-4 py-2'>Calculation or Source</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border px-4 py-2'>
                Annual production of your photovoltaic system
              </td>
              <td className='border px-4 py-2'>kWh</td>
              <td className='border px-4 py-2'>4499</td>
            </tr>
            <tr>
              <td className='border px-4 py-2'>
                Energy used for self-consumption
              </td>
              <td className='border px-4 py-2'>kWh</td>
              <td className='border px-4 py-2'>4107</td>
            </tr>
            <tr>
              <td className='border px-4 py-2'>Energy sold to the grid</td>
              <td className='border px-4 py-2'>kWh</td>
              <td className='border px-4 py-2'>393</td>
            </tr>
            <tr>
              <td className='border px-4 py-2'>
                Energy still to be purchased from the grid
              </td>
              <td className='border px-4 py-2'>kWh</td>
              <td className='border px-4 py-2'>3694</td>
            </tr>
            <tr>
              <td className='border px-4 py-2'>Annual CO2 reduction</td>
              <td className='border px-4 py-2'>Kg</td>
              <td className='border px-4 py-2'>1139</td>
            </tr>
            <tr>
              <td className='border px-4 py-2'>
                Equivalent to mileage traveled by car
              </td>
              <td className='border px-4 py-2'>Km</td>
              <td className='border px-4 py-2'>6118</td>
            </tr>
            <tr>
              <td className='border px-4 py-2'>
                Equivalent to number of trees planted
              </td>
              <td className='border px-4 py-2'>trees</td>
              <td className='border px-4 py-2'>46</td>
            </tr>
            <tr>
              <td className='border px-4 py-2'>Carbon impact reduction</td>
              <td className='border px-4 py-2'>%</td>
              <td className='border px-4 py-2'>18</td>
            </tr>
          </tbody>
        </table>
        <div className='mt-5 flex items-center gap-4'>
          <Button label={"Share Result"} />
          <Button
            label={"Previous"}
            onClick={() => setShowResult((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  );
};
