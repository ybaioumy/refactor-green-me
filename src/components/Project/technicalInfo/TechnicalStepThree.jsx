import React from 'react';
import { useFormContext } from 'react-hook-form';
import GreenBuilding from './stepthree/GreenBuilding';
import RenewableEnergy from './stepthree/RenewableEnergy';
import EnergyEfficiency from './stepthree/EnergyEfficiency';
import EmptyList from '../../shared/EmptyList';
function TechnicalStepThree() {
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

export default TechnicalStepThree;
