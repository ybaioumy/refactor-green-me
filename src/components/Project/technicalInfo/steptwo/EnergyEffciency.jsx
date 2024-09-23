import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useGetProjectDropDownsQuery } from '../../../../redux/features/project';
import Loader from '../../../shared/Loader';
import { ConsumptionComponent } from '../../../eligibilitytest/lookingforaudit/SecondStep';
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
    <>
      <ConsumptionComponent type="electricity" isFirstItem />
      <ConsumptionComponent type="water" />
      <ConsumptionComponent type="naturalGas" />
      <ConsumptionComponent type="gasoline" />
      <ConsumptionComponent type="diesel" />
    </>
  );
}

export default EnergyEfficiency;
