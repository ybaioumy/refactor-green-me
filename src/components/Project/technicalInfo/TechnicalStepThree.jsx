import React from 'react';
import { useFormContext } from 'react-hook-form';
import GreenBuilding from './stepthree/GreenBuilding';
import RenewableEnergy from './stepthree/RenewableEnergy';
function TechnicalStepThree() {
  const { watch } = useFormContext();
  const categoryId = watch('categoryId');
console.log(categoryId);
  switch (categoryId) {
    case 1:
      return <GreenBuilding />;
    case 2:
      return <RenewableEnergy />;
    default:
      return <p>No information available for this category</p>;
  }
}

export default TechnicalStepThree;
