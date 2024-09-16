import React from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { DatePicker } from 'antd';
import { Dropdown } from '../../shared/Dropdown';
import RadioButton from '../../shared/RadioButton';
import dayjs from 'dayjs';
import Input from '../../shared/Input';

const ProjectOwner = ({ countries, sectors }) => {
  const { control } = useFormContext();
  const hasClientBranchesInCountries = useWatch({
    control,
    name: 'hasClientBranchesInCountries',
  });
  if (!countries || !sectors) return null;

  return (
    <div className="flex flex-col w-full gap-8 my-auto">
      {/* Company Name */}
      <Controller
        name="clientCompanyName"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            variant="borderBottom"
            type="text"
            placeholder="Company Name"
          />
        )}
      />

      {/* Base Country Dropdown */}
      <Controller
        name="countryId"
        control={control}
        render={({ field }) => (
          <Dropdown
            options={countries}
            placeholder="Base Country"
            onSelectOption={field.onChange}
            value={field.id}
          />
        )}
      />

      {/* Branches in Other Countries */}
      <div className="flex gap-5">
        <span className="text-[#8E8E8E]">Branches in other countries</span>
        <Controller
          name="hasClientBranchesInCountries"
          control={control}
          render={({ field }) => (
            <>
              <RadioButton
                label="Yes"
                name="otherCountries"
                value={true}
                checked={field.value === true}
                onChange={() => field.onChange(true)}
              />
              <RadioButton
                label="No"
                name="otherCountries"
                value={false}
                checked={field.value === false}
                onChange={() => field.onChange(false)}
              />
            </>
          )}
        />
      </div>

      {/* Conditionally Render Other Branch Locations Dropdown */}
      {hasClientBranchesInCountries && (
        <Controller
          name="clientCountries"
          control={control}
          render={({ field }) => (
            <Dropdown
              options={countries}
              placeholder="Please select locations of other branches (multiple selection allowed)"
              multiSelect
              onSelectOption={(selectedIds) => {
                const selectedCountries = countries
                  .filter((country) => selectedIds.includes(country.id))
                  .map((country) => ({
                    countryId: country.id,
                  }));
                field.onChange(selectedCountries);
              }}
              value={field.id?.map((item) => item.countryId)}
            />
          )}
        />
      )}
      {/* Sector Dropdown */}
      <Controller
        name="clientSectorId"
        control={control}
        render={({ field }) => (
          <Dropdown
            options={sectors}
            placeholder="Sector"
            onSelectOption={field.onChange}
            value={field.id}
          />
        )}
      />

      {/* Date of Establishment */}
      <Controller
        name="dateOfEstablishment"
        control={control}
        render={({ field }) => (
          <Input
            type="date"
            variant="date"
            onChange={(date) =>
              field.onChange(date ? dayjs(date).toISOString() : null)
            }
            placeholder="Date of establishment"
            value={field.value ? dayjs(field.value) : null}
          />
        )}
      />

      {/* Capital & Number of Employees */}
      <div className="flex gap-10">
        <Controller
          name="capital"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              variant="borderBottom"
              type="number"
              placeholder="Capital"
            />
          )}
        />
        <Controller
          name="clientNumberOfEmployees"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              variant="borderBottom"
              type="number"
              placeholder="Number of Employees"
            />
          )}
        />
      </div>
    </div>
  );
};

export default ProjectOwner;
