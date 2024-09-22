import React from 'react';
import { useFormContext } from 'react-hook-form';
import GreenBuilding from './stepthree/GreenBuilding';
function TechnicalStepThree() {
  const { watch } = useFormContext();
  const categoryId = watch('categoryId');
  console.log(categoryId, 'fdsf');
  switch (categoryId) {
    case 1:
      return <GreenBuilding />;
    default:
      return <p>No information available for this category</p>;
  }
}

export default TechnicalStepThree;
