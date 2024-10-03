import React from 'react';
import { useFormContext } from 'react-hook-form';
import EmptyList from '../../shared/EmptyList';
import GreenBuilding from './stepone/GreenBuilding';
import RenewableEnergy from './stepone/RenewableEnergy';
import EnergyEfficiency from './stepone/EnergyEffciency';
function TechnicalStepOne() {
  const { watch } = useFormContext();
  const categoryId = watch('categoryId');
  const criteriaId = watch('criteriaId');

  switch (categoryId) {
    case 1:
      return <GreenBuilding />;
    case 2:
      return <RenewableEnergy />;
    case 3:
      return <EnergyEfficiency/>
    case 4:
    default:
      return <EmptyList message={'No data available'} />;
  }
}

export default TechnicalStepOne;
