import React, { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto"; // Ensure this is imported for Chart.js to work
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";

import {
  useFormContext,
  Controller,
  useForm,
  FormProvider,
} from "react-hook-form";
import { Checkbox, Radio, Select, Input, message } from "antd";
import RadioButton from "../components/shared/RadioButton";
import { Link } from "react-router-dom";
import Title from "../components/shared/Title";
import { useLocation } from "react-router-dom";
import alertValidationMessage from "../utilits/alertMessage";
import { useGetSolarSystemResultsMutation } from "../redux/features/auth";
import Loader from "../components/shared/Loader";
const StepsSurvey = () => {
  const [showResult, setShowResult] = useState(false);
  const [solarSystemMutaion, { data, isLoading, isError, error }] =
    useGetSolarSystemResultsMutation();
  const [surveyResults, setSurveyResult] = useState(false);
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
  const onSubmit = async (data) => {
    try {
      const result = await solarSystemMutaion(data).unwrap();
      console.log(result);
      setShowResult(true);
      setSurveyResult(result.solarSystem);
      message.success(result.message);
    } catch (error) {
      console.error(error);
      message.error(error.message || "Failed to submit survey");
    }
  };
  if (isError) return <Loader />;
  return (
    <div className='flex flex-col items-center justify-center h-screen  text-black green-gradinat '>
      <div className='w-full max-w-[1500px] p-3 md:p-6 rounded-lg my-4 shadow-lg bg-gray-200 overflow-y-scroll no-scrollbar'>
        {showResult ? (
          <Results
            setShowResult={setShowResult}
            isLoading={isLoading}
            data={surveyResults}
          />
        ) : (
          <Steps steps={steps} onSave={onSubmit} />
        )}
      </div>
    </div>
  );
};
export default StepsSurvey;
const EmailStep = () => {
  const { control, handleSubmit } = useFormContext();

  return (
    <div className='flex flex-col-reverse lg:flex-row m-auto items-center justify-between  p-6 rounded-lg h-[60vh] '>
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
          name='gmail'
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
          name='mobileNumber'
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
      <div className='w-full lg:w-1/2 flex md:justify-end mb-6 md:mt-6 lg:mt-0'>
        <img
          src={require("../assets/images/survey/cal-1.jpg")}
          alt='Right section visual'
          className='object-cover rounded-lg  w-full md:w-[70%]  h-64 lg:h-auto '
        />
      </div>
    </div>
  );
};
const { Option } = Select;

const ElectricityConsumption = () => {
  const { control, setValue, watch } = useFormContext();

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
        <Controller
          name='numberOfPeopleLivingInTheHousehold'
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              onChange={(value) => {
                field.onChange(value);
                if (value !== "More than 5") {
                  setValue("numberOfPeopleLivingInTheHouseholdOther", ""); // Reset if not showing input
                }
              }}
              className='w-full max-w-2xl'
            >
              {numberOfPeople.map((option) => (
                <Option key={option.label} value={option.label}>
                  {option.label}
                </Option>
              ))}
            </Select>
          )}
        />

        {watch("numberOfPeopleLivingInTheHousehold") === "More than 5" && (
          <Controller
            name='numberOfPeopleLivingInTheHouseholdOther'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder='Specify the number of people'
                className='mt-2 w-full max-w-2xl'
              />
            )}
          />
        )}

        <div className='flex justify-between gap-10 mt-[20px] mb-[40px] flex-wrap'>
          {numberOfPeople.map((option) => (
            <div
              key={option.label}
              className={`relative flex flex-col items-center justify-between gap-3 cursor-default rounded`}
              onClick={() =>
                setValue("numberOfPeopleLivingInTheHousehold", option.label)
              }
            >
              <img
                width={120}
                height={120}
                src={option.image}
                alt={option.label}
                className={`w-full h-full object-scale-down ${
                  watch("numberOfPeopleLivingInTheHousehold") === option.label
                    ? "filter brightness-[1111]"
                    : "brightness-100"
                }`}
              />
              <RadioButton
                label={option.label}
                onClick={() =>
                  setValue("numberOfPeopleLivingInTheHousehold", option.label)
                }
                checked={
                  watch("numberOfPeopleLivingInTheHousehold") === option.label
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Number of Bedrooms Dropdown */}
      <div className='mb-4 mt-[40px]'>
        <label className='block mb-2'>Number of bedrooms in your home:</label>
        <Controller
          name='numberOfBedroomsInYourHome'
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              onChange={(value) => {
                field.onChange(value);
                if (value !== "More than 5") {
                  setValue("numberOfBedroomsInYourHomeOther", ""); // Reset if not showing input
                }
              }}
              className='w-full max-w-2xl'
            >
              <Option value='1-2'>1-2</Option>
              <Option value='3-4'>3-4</Option>
              <Option value='More than 5'>More than 5</Option>
            </Select>
          )}
        />

        {watch("numberOfBedroomsInYourHome") === "More than 5" && (
          <Controller
            name='numberOfBedroomsInYourHomeOther'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder='Specify the number of bedrooms'
                className='mt-2 w-full max-w-2xl'
              />
            )}
          />
        )}
      </div>
    </div>
  );
};

const Appliances = () => {
  const appliancesOptions = [
    {
      name: "Refrigerator",
      image: require("../assets/images/survey/refrigerator.png"),
    },
    {
      name: "Electric stove",
      image: require("../assets/images/survey/stove.png"),
    },
    {
      name: "Microwaves",
      image: require("../assets/images/survey/microwave-oven.png"),
    },
    {
      name: "Dishwasher",
      image: require("../assets/images/survey/dishwasher.png"),
    },
    {
      name: "Washing machine",
      image: require("../assets/images/survey/washing-machine.png"),
    },
    {
      name: "Pool pump",
      image: require("../assets/images/survey/pump.png"),
    },
    {
      name: "Dryer",
      image: require("../assets/images/survey/tumble-dry.png"),
    },
    {
      name: "Air condition",
      image: require("../assets/images/survey/air-conditioner.png"),
    },
  ];

  const { control, watch, setValue } = useFormContext();

  const [customAppliance, setCustomAppliance] = useState("");
  const appliances = watch("appliances") || [];

  const isSelected = (value, option) =>
    value.some((appliance) => appliance.name === option.name);

  const handleAddCustomAppliance = () => {
    if (customAppliance.trim()) {
      setValue("appliances", [...appliances, { name: customAppliance.trim() }]);
      setCustomAppliance("");
    }
  };
  return (
    <div className='max-w-7xl p-6'>
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
              <div className='flex flex-wrap justify-between w-full'>
                {appliancesOptions.map((option) => (
                  <div
                    key={option.name}
                    className={`relative w-[119px] flex flex-col items-center gap-5 text-center truncate cursor-pointer rounded ${
                      isSelected(field.value, option) ? "bg-gray-200" : ""
                    }`}
                    onClick={() => {
                      const newValues = isSelected(field.value, option)
                        ? field.value.filter(
                            (appliance) => appliance.name !== option.name
                          )
                        : [...field.value, { name: option.name }];
                      field.onChange(newValues);
                    }}
                  >
                    <img
                      src={option.image}
                      width={120}
                      height={120}
                      alt={option.label}
                      className={`w-full h-full object-scale-down ${
                        isSelected(field.value, option) ? "" : ""
                      }`}
                    />
                    <span className='w-full'>{option.name}</span>
                    <Checkbox
                      checked={isSelected(field.value, option)}
                      onChange={() => {
                        const newValues = isSelected(field.value, option)
                          ? field.value.filter(
                              (appliance) => appliance.name !== option.name
                            )
                          : [...field.value, { name: option.name }];
                        field.onChange(newValues);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          />
        </div>
        <div className='max-w-2xl flex  items-center gap-5 text-center truncate cursor-pointer rounded py-5'>
          <Input
            value={customAppliance}
            onChange={(e) => setCustomAppliance(e.target.value)}
            placeholder='Other appliances'
            className=' w-full'
          />
          <button
            type='button'
            onClick={handleAddCustomAppliance}
            className='bg-blue-500 text-white px-3 py-1 rounded'
          >
            Add
          </button>
        </div>
        <ul>
          {appliances?.map((appliance) => (
            <li className='text-[18px]'>{appliance.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
const Heating = () => {
  const { control, watch } = useForm({
    defaultValues: {
      heating: "",
      cooling: "",
      coolingOther: "",
      lightBulbs: "",
      lightBulbsOther: "",
    },
  });

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
    {
      label: "Other",
      image: require("../assets/images/survey/other.png"),
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
            <>
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
                      className={`object-scale-down ${
                        field.value === option.label ? "filter invert" : ""
                      }`}
                    />
                    <RadioButton
                      name='heating'
                      label={option.label}
                      value={option.label}
                      checked={field.value === option.label}
                      onChange={() => {
                        field.onChange(option.label);
                        if (option.label !== "Other") setOtherHeating(""); // Reset "Other" input when not selected
                      }}
                    />
                  </label>
                ))}
              </div>
              <div>
                {selectedHeating === "Other" && (
                  <Controller
                    name='heatingOther'
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type='text'
                        placeholder='Specify other heating type'
                        className='w-full p-2 border border-black rounded my-3'
                        value={otherHeating}
                        onChange={(e) => {
                          setOtherHeating(e.target.value);
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  />
                )}
              </div>
            </>
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
                      if (option !== "Other") setOtherCooling(""); // Reset "Other" input when not selected
                    }}
                  />
                </label>
              ))}
              {/* Show input when "Other" is selected */}
              {selectedCooling === "Other" && (
                <Controller
                  name='coolingOther'
                  control={control}
                  render={({ field }) => (
                    <input
                      type='text'
                      placeholder='Specify other cooling system'
                      className='w-full p-2 border border-black rounded'
                      value={otherCooling}
                      onChange={(e) => setOtherCooling(e.target.value)}
                    />
                  )}
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
                  if (e.target.value !== "Above 150") setOtherLightBulbs(""); // Reset "Above 150" input when not selected
                }}
              >
                {[
                  "1-10",
                  "11-30",
                  "31-50",
                  "51-100",
                  "101-150",
                  "Above 150",
                  "Non-LED",
                ].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {/* Show input when "Above 150" is selected */}
              {selectedLightBulbs === "Above 150" && (
                <Controller
                  name='lightBulbsOther'
                  control={control}
                  render={({ field }) => (
                    <input
                      type='number'
                      placeholder='Specify exact number'
                      className='w-full p-2 border border-black rounded mt-2'
                      value={otherLightBulbs}
                      onChange={(e) => setOtherLightBulbs(e.target.value)}
                    />
                  )}
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
  return (
    <div className='max-w-5xl h-[60vh] flex flex-col justify-center my-auto'>
      {/* Electricity Bill Section */}
      <div className='mb-6 border-b-2 border-black pb-[50px]'>
        <label className='block text-[18px] font-semibold mb-2'>
          What is your average monthly electricity bill?
        </label>
        <Controller
          name='averageMonthlyElectricityBill'
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type='number'
              placeholder='Specify your average monthly electricity bill'
              className='w-full p-2 border border-black rounded my-3'
              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
            />
          )}
        />
      </div>

      {/* Interested in Reducing Costs Section */}
      <div className='mb-6 border-b-2 border-black pb-[50px]'>
        <label className='block text-[18px] font-semibold mb-2'>
          Are you interested in reducing your electricity costs?
        </label>
        <Controller
          name='reducingYourElectricityCosts'
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
  const selectedPowerOutages = watch("experiencePowerOutages"); // Watch the powerOutages field
  const selectedPowerOutageDuration = watch("powerOutageLast"); // Watch the powerOutageDuration field

  return (
    <div className='max-w-5xl'>
      {/* Renewable Energy Section */}
      <div className='mb-6 border-b-2 border-black pb-[50px]'>
        <label className='block text-[18px] font-semibold mb-2'>
          Are any solar panels or other renewable energy systems installed in
          your home?
        </label>
        <Controller
          name='solarPanelsOrRenewableEnergySystems'
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
          name='experiencePowerOutages'
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
          name='powerOutageLast'
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
            name='experiencePowerOutagesOther'
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

const Results = ({ setShowResult, isLoading, data }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareUrl = window.location.href; // Current page URL or replace with specific URL
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const toggleShareOptions = (event) => {
    setShowShareOptions(!showShareOptions);
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };
  console.log(data);
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

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
  if (isLoading) return <Loader />;
  return (
    <div className='max-w-7xl mx-auto text-black rounded-lg'>
      <h2 className='font-bold text-[35px] md:text-[45px]'>Your results </h2>
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
        <div className='mt-5 flex flex-col items-center gap-4'>
          <div className='flex items-center gap-2 md:gap-4'>
            {" "}
            <Button label={"Share Result"} onClick={toggleShareOptions} />
            <Button
              label={"Previous"}
              onClick={() => setShowResult((prev) => !prev)}
            />
          </div>
          <Popper id={id} open={open} anchorEl={anchorEl} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Box
                  sx={{
                    border: 1,
                    p: 2,

                    bgcolor: "background.paper",
                  }}
                >
                  <FacebookShareButton url={shareUrl}>
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl}>
                    <TwitterIcon size={40} round />
                  </TwitterShareButton>
                  <WhatsappShareButton url={shareUrl}>
                    <WhatsappIcon size={40} round />
                  </WhatsappShareButton>
                  <EmailShareButton url={shareUrl}>
                    <EmailIcon size={40} round />
                  </EmailShareButton>
                </Box>
              </Fade>
            )}
          </Popper>
        </div>
      </div>
    </div>
  );
};
