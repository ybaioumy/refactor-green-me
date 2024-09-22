import React from 'react';
import Card from '../../../shared/Card';
import { useFormContext, Controller } from 'react-hook-form';
import { useGetProjectDropDownsQuery } from '../../../../redux/features/project';
import RadioButton from '../../../shared/RadioButton';
import Loader from '../../../shared/Loader';
import EmptyList from '../../../shared/EmptyList';
function GreenBuilding() {
  const { control } = useFormContext();
  const {
    data: dropDowns,
    isLoading,
    isError,
  } = useGetProjectDropDownsQuery('technicalInfo');
  const {
    buildingFunction,
    newExistingBuilding,
    ownedLeased,
    utilitiesAvailable,
    greenCertification,
  } = dropDowns || {};
  if (isLoading) return <Loader />;
  if (isError) return <EmptyList />;
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Building Function */}
      <Card title="Building Function">
        <Controller
          name="technicalInfo.buildingFunctionId"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              {buildingFunction.map((type) => (
                <RadioButton
                  key={type.id} // Ensure you have a unique key for each RadioButton
                  label={type.name}
                  name={type.name}
                  value={type.id}
                  checked={field.value === type.id}
                  onChange={() => {
                    // Use setValue to update the value properly
                    field.onChange(type.id);
                  }}
                />
              ))}
            </div>
          )}
        />
      </Card>

      {/* Utilities Available */}
      <Card title="Utilities Available">
        <Controller
          name="utilitiesAvailablesIds"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              {utilitiesAvailable.map((utility) => (
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
      </Card>

      {/* New / Existing Building */}
      <Card title="New / Existing Building">
        <Controller
          name="technicalInfo.newExistingBuildingId"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              {newExistingBuilding.map((type) => (
                <React.Fragment key={type.id}>
                  <RadioButton
                    key={type.id}
                    label={type.name}
                    name={type.name}
                    value={type.id}
                    checked={field.value === type.id}
                    onChange={() => field.onChange(type.id)}
                  />
                </React.Fragment>
              ))}
            </div>
          )}
        />
      </Card>

      {/* Owned / Leased */}
      <Card title="Owned / Leased">
        <Controller
          name="technicalInfo.ownedLeasedId"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              {ownedLeased.map((type) => (
                <React.Fragment key={type.id}>
                  <RadioButton
                    key={type.id}
                    label={type.name}
                    name={type.name}
                    value={type.id}
                    checked={field.value === type.id}
                    onChange={() => field.onChange(type.id)}
                  />
                </React.Fragment>
              ))}
            </div>
          )}
        />
      </Card>

      {/* Green Certifications */}
      <Card title="Green Certifications">
        <Controller
          name="greenCertificationIds"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              {greenCertification.map((certification) => (
                <label
                  key={certification.id}
                  className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    value={certification.id}
                    checked={field?.value?.includes(certification.id)}
                    onChange={(e) => {
                      const newValue = e.target.checked
                        ? [...field.value, certification.id]
                        : field.value.filter(
                            (item) => item !== certification.id
                          );
                      field.onChange(newValue);
                    }}
                  />
                  {certification.name}
                </label>
              ))}
            </div>
          )}
        />
      </Card>
    </div>
  );
}
export default GreenBuilding;
