import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import Steps from "../components/shared/Steps";
import Input from "../components/shared/Input";
import RadioButton from "../components/shared/RadioButton";
import Logo from "../assets/images/greenme.png";
import Title from "../components/shared/Title";
import { motion } from "framer-motion";

function SurveyEvent() {
  const methods = useForm();

  const surveySteps = [
    {
      children: [
        {
          childLabel: "Enter your personal details",
          content: (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='flex flex-col w-full gap-4'
            >
              <Input
                variant='borderBottom'
                label={"Your Name"}
                placeHolder='Enter Your Name'
                name='name'
              />
              <Input
                variant='borderBottom'
                label={"Email"}
                type='email'
                placeHolder='Enter Your Email'
                name='email'
              />
            </motion.div>
          ),
        },
        {
          childLabel:
            "Please provide information about your household's electricity consumption:",
          content: (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='flex flex-col w-full gap-4'
            >
              <Title
                text={"Number of people living in the household:"}
                type='h3'
                className='font-bold text-[20px]'
              />
              {["1-2", "3-4", "5 or more"].map((option) => (
                <Controller
                  key={option}
                  name='householdSize'
                  control={methods.control}
                  render={({ field }) => (
                    <RadioButton {...field} label={option} value={option} />
                  )}
                />
              ))}

              <Title
                text={"Number of bedrooms in your home:"}
                type='h3'
                className='font-bold text-[20px]'
              />
              {["1-2", "3-4", "5 or more"].map((option) => (
                <Controller
                  key={option}
                  name='bedrooms'
                  control={methods.control}
                  render={({ field }) => (
                    <RadioButton {...field} label={option} value={option} />
                  )}
                />
              ))}
            </motion.div>
          ),
        },
        {
          childLabel: "Major Appliances:",
          content: (
            <>
              <Title
                text={
                  "*Please specify if you own any of the following appliances: "
                }
                type='h3'
                className='font-bold text-[20px] mb-3'
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className='flex flex-col gap-4'
              >
                {[
                  "Refrigerator",
                  "Electric stove",
                  "Microwave",
                  "Dishwasher",
                  "Washing machine",
                  "Pool pump",
                  "Dryer",
                  "Oven/Stove (gas)",
                  "Air conditioner",
                  "Other",
                ].map((appliance) => (
                  <Controller
                    key={appliance}
                    name='appliances'
                    control={methods.control}
                    render={({ field }) => (
                      <>
                        <CheckBox
                          {...field}
                          label={appliance}
                          value={appliance}
                        />

                        {field.value === "Other" && (
                          <Input variant='borderBottom' />
                        )}
                      </>
                    )}
                  />
                ))}
              </motion.div>
            </>
          ),
        },
        {
          childLabel: "Heating and Cooling Systems:",
          content: (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='flex flex-col gap-6'
            >
              <motion.div className='flex flex-col gap-2'>
                <Title
                  text={"Heating:"}
                  type='h3'
                  className='font-bold text-[20px]'
                />
                {["Gas", "Electric", "Other"].map((option) => (
                  <Controller
                    key={option}
                    name='bedrooms'
                    control={methods.control}
                    render={({ field }) => (
                      <RadioButton {...field} label={option} value={option} />
                    )}
                  />
                ))}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className='flex flex-col gap-2'
              >
                <Title
                  text={"Cooling:"}
                  type='h3'
                  className='font-bold text-[20px]'
                />
                {[
                  "Central air conditioning",
                  "Window air conditioner",
                  "Split Air conditioner",
                  "Other",
                ].map((option) => (
                  <Controller
                    key={option}
                    name='cooling'
                    control={methods.control}
                    render={({ field }) => (
                      <RadioButton {...field} label={option} value={option} />
                    )}
                  />
                ))}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className='flex flex-col gap-2'
              >
                <Title
                  text={"Light bulbs*:"}
                  type='h3'
                  className='font-bold text-[20px]'
                />
                {[
                  "1 - 10",
                  "11 - 30",
                  "31 - 50",
                  "51 - 100",
                  "101 - 150",
                  "Above 150",
                  "Other",
                ].map((option) => (
                  <Controller
                    key={option}
                    name='lightBulbs'
                    control={methods.control}
                    render={({ field }) => (
                      <RadioButton {...field} label={option} value={option} />
                    )}
                  />
                ))}
              </motion.div>
            </motion.div>
          ),
        },
        {
          childLabel: "Electricity Bill",
          content: (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='flex flex-col gap-6'
            >
              <motion.div className='flex flex-col gap-2'>
                <Title
                  text={"What is your average monthly electricity bill?"}
                  type='h3'
                  className='font-bold text-[20px]'
                />
                {
                  <Controller
                    name='electricityBill'
                    control={methods.control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        variant='borderBottom'
                        placeHolder='Avarage Monthly Electricity Bill'
                      />
                    )}
                  />
                }
              </motion.div>
              <motion.div className='flex flex-col gap-2'>
                <Title
                  text={
                    "Are you interested in reducing your electricity costs?"
                  }
                  type='h3'
                  className='font-bold text-[20px]'
                />
                {["Yes", "No"].map((range) => (
                  <Controller
                    key={range}
                    name='areIntrestedInReduction'
                    control={methods.control}
                    render={({ field }) => (
                      <RadioButton {...field} label={range} value={range} />
                    )}
                  />
                ))}
              </motion.div>
              <motion.div className='bg-card rounded-lg my-4 p-2'>
                <Title
                  text={
                    "Would you be interested in exploring financial assistance options to help offset the cost of energy-efficient upgrades? Please use our 1 minute loan calculator"
                  }
                  type='h3'
                  className='font-bold text-[18px]'
                ></Title>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://www.yallakora.com/'
                  className='text-blue-500 hover:text-blue-400'
                >
                  ( Yallakora )
                </a>
              </motion.div>
            </motion.div>
          ),
        },
        {
          childLabel: "Renewable Energy and Power Outages",
          content: (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='flex flex-col gap-4'
            >
              <motion.div>
                <Controller
                  name='solarPanels'
                  control={methods.control}
                  render={({ field }) => (
                    <>
                      <RadioButton {...field} label='Yes' value='Yes' />
                      <RadioButton {...field} label='No' value='No' />
                    </>
                  )}
                />
              </motion.div>
              <motion.div className='flex flex-col gap-2'>
                <Title
                  text={"How often do you experience power outages?"}
                  type='h3'
                  className='font-bold text-[20px]'
                />
                {[
                  "Once daily",
                  "Once weekly",
                  "Once monthly",
                  "It varies from month to month",
                  "Other",
                ].map((range) => (
                  <Controller
                    key={range}
                    name='powerOutage'
                    control={methods.control}
                    render={({ field }) => (
                      <RadioButton {...field} label={range} value={range} />
                    )}
                  />
                ))}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className='flex flex-col gap-2'
              >
                <Title
                  text={"On average, how long do power outages last?*"}
                  type='h3'
                  className='font-bold text-[20px]'
                />
                {["1 hour", "2 hours", "3 hours", "Above 3 hours"].map(
                  (range) => (
                    <Controller
                      key={range}
                      name='powerOutageHours'
                      control={methods.control}
                      render={({ field }) => (
                        <RadioButton {...field} label={range} value={range} />
                      )}
                    />
                  )
                )}
              </motion.div>
            </motion.div>
          ),
        },
      ],
    },
  ];

  const handleSave = (data) => {
    console.log("Form Data:", data); // handle form data submission
  };

  return (
    <>
      <header className='green-gradinat py-4 rounded-b'>
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          src={Logo}
          alt='green_me_logo'
          className='mx-auto'
          width={150}
          height={150}
        />
      </header>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className='survey-screen p-4 md:w-[60%] mx-auto '
      >
        <h1 className='text-[25px] text-center text-[#193c22] font-bold my-4'>
          Understanding Peak Load and Energy Consumption
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className='shadow rounded-lg p-4'
        >
          <Steps
            steps={surveySteps}
            hasLink={false}
            onSave={methods.handleSubmit(handleSave)}
            isLoading={false}
          />
        </motion.div>
      </motion.div>
    </>
  );
}

export default SurveyEvent;

const CheckBox = ({ label, name, value, onChange }) => {
  return (
    <label className='flex items-center gap-2'>
      <input
        type='checkbox'
        name={name}
        value={value}
        onChange={onChange}
        className='accent-green-700 transition-all duration-150'
      />
      <p>{label}</p>
    </label>
  );
};
