import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useGetProjectDropDownsQuery } from '../../../../redux/features/project';
import Loader from '../../../shared/Loader';
function EnergyEfficiency() {
  const { control, watch } = useFormContext();
  const {
    data: dropDowns,
    isLoading,
    isError,
  } = useGetProjectDropDownsQuery('technicalInfo');
  if (isLoading) return <Loader />;
  if (isError) return <p>Error fetching dropdowns</p>;
  return (
    <div className="w-full flex flex-col gap-6 p-4 rounded-2xl mt-5 bg-card shadow-md">
      <Controller
        name="utilitiesAvailablesIds"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            {dropDowns.utilitiesAvailable.map((utility) => (
              <label key={utility.id} className="flex gap-4 items-center">
                <input
                  type="checkbox"
                  value={utility.id}
                  checked={field?.value?.includes(utility.id)}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...field.value, utility.id]
                      : field.value.filter((item) => item !== utility.id);
                    field.onChange(newValue);
                  }}
                />
                {utility.name}
              </label>
            ))}
          </div>
        )}
      />
    </div>
  );
}

export default EnergyEfficiency;
