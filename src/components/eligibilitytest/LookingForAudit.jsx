import React, { useState, useEffect } from 'react';

import NumericInput from '../shared/NumericInput';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { useGetProjectDropDownsQuery } from '../../redux/features/project';
import Loader from '../shared/Loader';
import EmptyList from '../shared/EmptyList';
import Select from '../shared/Select';
import MapComponent from '../shared/Map';
import Input from '../shared/Input';
import { LightingSystemTypes } from './lookingforaudit/SecondStep';
import { useGetAllCategoriesWithCrietriaQuery } from '../../redux/features/project';
import useGetItemIdByName from '../../hooks/useGetItemIdByName';
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

const MainForm = () => {
  const { control, setValue, watch } = useFormContext();
  const { data, error, isLoading } = useGetProjectDropDownsQuery('generalInfo');
  const { city, economicSector, servedCountry, siteType } = data || [];
  const { data: categories, isLoading: isLoadingCategory } =
    useGetAllCategoriesWithCrietriaQuery();
  const handleChange = (name, newValue) => {
    setValue(name, newValue);
  };
  const energyEfficiencyCATID = useGetItemIdByName(
    categories,
    'Energy Efficiency'
  );
  console.log(watch(), 'from values');
  useEffect(() => {
    setValue('categoryId', energyEfficiencyCATID);
  }, [energyEfficiencyCATID, setValue]);

  // const handlePositionChange = (newPosition) => {
  //   setEligibilityTestData((prevState) => ({
  //     ...prevState,
  //     lat: String(newPosition.lat),
  //     long: String(newPosition.lng),
  //   }));
  // };
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
            rules={{
              required: 'Select Building Location',
            }}
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
                <NumericInput {...field} label="Land Area (sqm)" unit="sqm" />
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
                />
              )}
            />
          </div>
        </div>
        <Controller
          name="position"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <MapComponent
              setProjectPosition={({ lat, lng }) => {
                // onChange(lat); // Update the lat value in the form state
                // // Optionally you can set the long value if needed
                // onChange(lng); // This might require handling lng separately
                onChange({
                  lat: lat,
                  long: lng,
                });
              }}
            />
          )}
        />
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

const LookingForAudit = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // Manage the no-scroll class on body
  // useEffect(() => {
  //   if (isSidebarOpen) {
  //     document.body.classList.add('no-scroll');
  //   } else {
  //     document.body.classList.remove('no-scroll');
  //   }

  //   // Cleanup function to remove the class when the component is unmounted
  //   return () => {
  //     document.body.classList.remove('no-scroll');
  //   };
  // }, [isSidebarOpen]);
  return (
    <div className="flex w-full">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <MainForm />
    </div>
  );
};

export default LookingForAudit;
