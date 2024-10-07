import React from 'react';
import { useFormContext } from 'react-hook-form';
import EmptyList from '../../shared/EmptyList';
import GreenBuilding from './steptwo/GreenBuilding';
import RenewableEnergy from './steptwo/RenewableEnergy';
import EnergyEfficiency from './steptwo/EnergyEffciency';
function TechnicalStepTwo() {
  const { watch } = useFormContext();
  const categoryId = watch('categoryId');

  switch (categoryId) {
    case 1:
      return <GreenBuilding />;
    case 2:
      return <RenewableEnergy />;
    case 3:
      return <EnergyEfficiency />;
    default:
      return <EmptyList message={'No data available'} />;
  }
}

export default TechnicalStepTwo;
