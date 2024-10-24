import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { formatCurrency } from "../utilits/helpers";
import {
  useFormContext,
  Controller,
  useForm,
  FormProvider,
} from "react-hook-form";
import {
  Checkbox,
  Select,
  Input,
  message,
  Result,
  Spin,
  Card,
  List,
  Typography,
  Tooltip,
  Table,
} from "antd";
import RadioButton from "../components/shared/RadioButton";
import { Link } from "react-router-dom";
import Title from "../components/shared/Title";
import { useLocation, useNavigate } from "react-router-dom";
import alertValidationMessage from "../utilits/alertMessage";
import {
  useGetSolarSystemResultsMutation,
  useLoanCalculationsMutation,
} from "../redux/features/auth";
import { CloseOutlined, QuestionOutlined } from "@ant-design/icons";

import Loader from "../components/shared/Loader";
import Person1 from "../assets/images/survey/1people-default.svg";
import Person2 from "../assets/images/survey/2people-default.svg";
import Person3 from "../assets/images/survey/3people-default.svg";
import Person4 from "../assets/images/survey/4people-default.svg";
import Person5 from "../assets/images/survey/+5people-default.svg";

const StepsSurvey = () => {
  const [showResult, setShowResult] = useState(false);
  const [solarSystemMutaion, { isLoading, isError, error }] =
    useGetSolarSystemResultsMutation();
  const [
    loanCalculationsMutation,
    { isLoading: loanLoading, error: loanError },
  ] = useLoanCalculationsMutation();
  const [surveyResults, setSurveyResult] = useState(false);
  const installmentOptions = [
    { label: "1 Year", value: 1 },
    { label: "2 Years", value: 2 },
    { label: "3 Years", value: 3 },
    { label: "4 Years", value: 4 },
    { label: "5 Years", value: 5 },
    { label: "10 Years", value: 10 },
  ];
  const [downPayment, setDownPayment] = useState(null); // Add state for down payment

  // Function to handle changes in down payment input
  const handleDownPaymentChange = (event) => {
    const value = event.target.value ? Number(event.target.value) : null;
    setDownPayment(value);
  };
  const [selectedInstallment, setSelectedInstallment] = useState(
    installmentOptions[0].value || 4
  );
  const [loanResult, setLoanResult] = useState([]);
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
      setSurveyResult(result.solarSystem);
      setShowResult(true);
      setLoanResult(result.solarSystem.loanCalculatorResponse);
    } catch (error) {
      console.error(error);
      message.error(error.message || "Failed to submit survey");
    }
  };

  const handleInstallmentChange = (event) => {
    const newInstallment = event.target.value;
    setSelectedInstallment(newInstallment);
    calculateLoan(newInstallment); // Pass the updated value directly to the function
  };

  const calculateLoan = async (installment = selectedInstallment) => {
    const { sumOfElectricityBillOverYears } = surveyResults || {};
    const calculateData = {
      loanAmount: sumOfElectricityBillOverYears,
      loanTermInYears: installment, // Use the passed parameter or fallback to state
      downPaymentPercentage: downPayment,
    };
    try {
      const result = await loanCalculationsMutation(calculateData).unwrap();
      setLoanResult(result.loanCalculators || result);
    } catch (error) {
      console.error(error);
      message.error(error.message || "Failed to calculate loan");
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
            handleInstallmentChange={handleInstallmentChange}
            installmentOptions={installmentOptions}
            selectedInstallment={selectedInstallment}
            loanResult={loanResult}
            downPayment={downPayment}
            handleDownPaymentChange={handleDownPaymentChange}
            calculateLoan={calculateLoan}
            loanLoading={loanLoading}
          />
        ) : (
          <Steps steps={steps} onSave={onSubmit} isLoading={isLoading} />
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
          <p className="text-[#1E4A28]">
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
      image: Person1,
    },
    {
      label: "2 Persons",
      image: Person2,
    },
    {
      label: "3 Persons",
      image: Person3,
    },
    {
      label: "4 People",
      image: Person4,
    },
    {
      label: "More than 5",
      image: Person5,
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
                    ? ""
                    : ""
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
      setValue("appliances", [
        ...appliances,
        { name: customAppliance.trim(), custom: true },
      ]);
      setCustomAppliance("");
    }
  };

  const handleDeleteCustomAppliance = (applianceName) => {
    const updatedAppliances = appliances.filter(
      (appliance) => appliance.name !== applianceName || !appliance.custom
    );
    setValue("appliances", updatedAppliances);
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
              <div className='flex flex-wrap justify-between w-full gap-6 md:gap-10'>
                {appliancesOptions.map((option) => (
                  <div
                    key={option.name}
                    className={`relative w-[119px] flex flex-col items-center gap-2 md:gap-5 text-center truncate cursor-pointer rounded ${
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

        <List
          className='max-w-2xl'
          header={<Typography.Text>Selected Appliances:</Typography.Text>}
          bordered
          dataSource={appliances}
          renderItem={(item) => (
            <List.Item
              actions={
                item.custom
                  ? [
                      <button
                        type='button'
                        onClick={() => handleDeleteCustomAppliance(item.name)}
                        className='text-red-500'
                      >
                        Delete
                      </button>,
                    ]
                  : []
              }
            >
              <Typography.Text>{item.name}</Typography.Text>
            </List.Item>
          )}
        />
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
      <div className='mb-6 border-b-2 border-black w-full '>
        <h2 className='text-2xl font-bold mb-4'>Heating:</h2>
        <Controller
          name='heating'
          control={control}
          render={({ field }) => (
            <>
              <div className='flex gap-6 mb-3 md:mb-6'>
                {gasElectricData.map((option) => (
                  <label
                    key={option.label}
                    className='flex items-center text-center flex-col gap-4'
                  >
                    <img
                      src={option.image}
                      alt={option.label}
                      className={`object-scale-down w-[100px] md:w-[100px]`}
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
                        className='w-full p-2 border border-black rounded mb-6 mt-0'
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
        <label className='block mb-2'>Light Bulbs - non-LED (Count):</label>
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
      <div className='mb-6 border-b-2 border-black md:pb-[30px]'>
        <label className='block text-[18px] font-semibold mb-2'>
          What is your average monthly electricity bill?
        </label>
        <Controller
          name='averageMonthlyElectricityBill'
          control={control}
          rules={{
            required: "Please enter your average monthly electricity bill",
            min: {
              value: 0,
              message:
                "The average monthly electricity bill must be at least $0",
            },
          }}
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
      <div className='mb-6 border-b-2 border-black pb-[30px]'>
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
  const navigate = useNavigate();
  const {
    trigger,
    getValues,
    formState: { errors },
  } = methods;
  const [currentParentIndex, setCurrentParentIndex] = useState(0);
  const [currentChildIndex, setCurrentChildIndex] = useState(0);

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
        <div className='flex border-b border-black pb-2'>
          <button
            className='ml-auto'
            type='button'
            onClick={() => navigate("/")}
          >
            <CloseOutlined />
          </button>
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
          <div className='flex flex-col md:flex-row-reverse mt-4 gap-3 justify-between items-center justify-self-end py-2 pt-4 border-t border-black'>
            <div className='flex items-center gap-5'>
              {(currentChildIndex > 0 || currentParentIndex > 0) && (
                <Button
                  label={"Previous"}
                  onClick={handlePrevious}
                  disabled={!currentChildContent || isLoading} // Disable if no content
                  isLoading={isLoading}
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
      disabled={disabled || isLoading}
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

const Results = ({
  setShowResult,
  isLoading,
  data,
  installmentOptions,
  handleInstallmentChange,
  selectedInstallment,
  loanResult,
  handleDownPaymentChange,
  downPayment,
  calculateLoan,
  loanLoading,
}) => {
  // Data for bar chart
  const barChartData = {
    labels: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"], // Representing each year
    datasets: [
      {
        label: "Yearly Electricity Bill (EGP)",
        backgroundColor: "#2b6338", // Blue
        data: data?.yearlyElectricityBill, // Your provided data
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            // Format the tooltip to show the value with EGP
            return `EGP ${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
    },
  };

  const [showSuccessMessage, setShowSuccessMessage] = useState(true);

  useEffect(() => {
    // Hide the success message after 1.5 seconds and show the actual results
    const timer = setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, []);
  const resultsRef = useRef();

  const generatePDF = () => {
    const element = document.getElementById("results-container");
    html2canvas(element, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 10; // Add padding to the top of the PDF
      pdf.addImage(imgData, "PNG", 10, position, imgWidth - 20, imgHeight); // Apply padding on the left and right
      pdf.save("Survey Result.pdf");
    });
  };
  if (isLoading) return <Loader />;
  return (
    <>
      {showSuccessMessage ? (
        <div className='md:w-[50%] mx-auto'>
          <Result
            status='success'
            title='Thank you for your participation! Your answers will help us better understand peak load and develop strategies for more efficient energy consumption.'
            subTitle='Here is a list of your results'
            extra={[<Spin />]}
          />
        </div>
      ) : (
        <>
          <div
            className='max-w-7xl mx-auto text-black rounded-lg'
            ref={resultsRef}
            id='results-container'
          >
            <h2 className='font-bold text-[35px] md:text-[45px]'>
              Your results{" "}
            </h2>
            <p className='text-[1.5rem] font-semibold border-b-2 border-black pb-3'>
              Your system's technical data
            </p>
            <div className='flex  flex-col md:flex-row mb-8 pt-8 gap-4'>
              <Card className='text-center'>
                <p className='text-4xl font-bold'>
                  {Number.parseFloat(data?.monthlyConsumptionInKWh).toFixed(2)}
                  <span className='text-[18px] text-[#1E4A28] font-semibold'></span>
                </p>{" "}
                <p className="text-[#1E4A28]">Monthly consumption in KWh</p>
              </Card>

              <Card className='text-center'>
                <p className='text-4xl font-bold'>
                  {formatCurrency(data.sumOfElectricityBillOverYears)}
                  <span className='text-[18px] text-[#1E4A28] font-semibold'></span>
                </p>
                <p className="text-[#1E4A28]">Sum Of Electricity Bill Over Years</p>
              </Card>
            </div>

            {/* Estimated Economic Efficiency Section */}

            {/* Chart Section */}
            <div className='mt-8'>
              <p className='text-2xl font-bold mb-4'>
                Yearly Electricity Bill{" "}
                <span className='text-[14px] text-gray-600 font-abel'>
                  - Respecting the Inflation Rate
                </span>
              </p>
              <div className='md:w-[1500px] md:h-64 flex flex-col md:flex-row items-center gap-10 '>
                {" "}
                {/* Adjust width and height */}
                <Bar data={barChartData} options={barChartOptions} />
                <div className='flex flex-col gap-4'>
                  <Card className='text-center h-fit'>
                    <p className='text-4xl font-bold'>
                      {data.selectedRecommendedSolarStation}
                      <span className='text-[18px] text-[#1E4A28] font-semibold'></span>
                    </p>
                    <p className="text-[#1E4A28]">Equivalent Solar Systems to Cover 100% </p>
                  </Card>
                  <Card className='text-center'>
                    <p className='text-4xl font-bold'>
                      {formatCurrency(data.selectedSellingPriceforSolarStation)}{" "}
                      <span className='text-[18px] text-[#1E4A28] font-semibold'></span>
                    </p>
                    <p className="text-[#1E4A28]">Selected Selling Price for Solar Station</p>
                  </Card>
                </div>
              </div>
            </div>

            {/* Numerical Results Table */}
            <div className='mt-8'>
              <p className='text-2xl font-bold mb-4'>
                Installments Plan with{" "}
                <span className='font-typeMono'>CIB</span>
              </p>
              {/* Installment Options */}
              <div className='my-5 flex-col flex gap-2'>
                <div className='flex gap-4 items-center'>
                  <img
                    src={require("../assets/images/survey/cib.png")}
                    alt='CIB_LOGO'
                    className='w-16 h-16 mb-2'
                  />
                  <Tooltip title={"Interest Rate: 26% Decreasing "}>
                    <button
                      type='button'
                      className='p-2 bg-white  border border-gray-400 h-10  rounded-full flex items-center gap-2'
                    >
                      {" "}
                      <QuestionOutlined /> <span>Info</span>
                    </button>
                  </Tooltip>
                </div>
                <label className='text-[18px] font-bold '>
                  Select Installment Duration:
                </label>
                <select
                  value={selectedInstallment}
                  onChange={handleInstallmentChange}
                  displayEmpty
                  className='w-full p-2 border border-black rounded max-w-2xl'
                >
                  {installmentOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className='my-5 flex-col flex gap-2'>
                <label className='text-[18px] font-bold'>
                  Enter Down Payment Percentage:
                </label>
                <div className='flex items-center gap-4'>
                  <input
                    type='number'
                    min='0'
                    max='100'
                    placeholder='e.g., 20 for 20%'
                    value={downPayment || ""}
                    onChange={handleDownPaymentChange}
                    className='w-full p-2 border border-black rounded max-w-2xl '
                  />
                  <button
                    type='button'
                    onClick={() => calculateLoan()}
                    className='bg-[#2b6338] p-2 rounded text-white '
                  >
                    calculate
                  </button>
                </div>
              </div>

              <PaymentSchedule
                loanData={loanResult}
                loanLoading={loanLoading}
              />
            </div>
          </div>
          <div className='mt-5 flex flex-col items-center gap-4'>
            <div className='flex items-center gap-2 md:gap-4'>
              {" "}
              {/* <Button label={"Share Result"} onClick={toggleShareOptions} /> */}
              <Button
                label={"Previous"}
                onClick={() => setShowResult((prev) => !prev)}
              />
              <Button
                onClick={generatePDF}
                className='p-2 bg-blue-500 text-white rounded'
                label={"Generate PDF"}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

const PaymentSchedule = ({ loanData, loanLoading }) => {
  const normalizedData = Array.isArray(loanData) ? loanData : [loanData];
  const columns = [
    {
      title: "Down Payment Percentage (%)",
      dataIndex: "downPaymentPercentage",
      key: "downPaymentPercentage",
    },
    {
      title: "Monthly Payment (EGP)",
      dataIndex: "monthlyPayment",
      key: "monthlyPayment",
      render: (value) => formatCurrency(value), // Format to two decimal places
    },
    {
      title: "Total Interest (EGP)",
      dataIndex: "totalInterest",
      key: "totalInterest",
      render: (value) => formatCurrency(value),
    },
    {
      title: "Total Payment (EGP)",
      dataIndex: "totalPayment",
      key: "totalPayment",
      render: (value) => formatCurrency(value), // Format to two decimal places
    },
  ];

  // Columns for the expanded row showing months

  return (
    <Table
      dataSource={normalizedData}
      columns={columns}
      pagination={false}
      scroll={{ x: "max-content" }}
      rowKey='downPaymentPercentage'
      loading={loanLoading}
    />
  );
};
