import React from 'react';
import GreenBuilding from './steptwo/GreenBuilding';
import { useFormContext } from 'react-hook-form';
import EmptyList from '../../shared/EmptyList';
import RenewableEnergy from './steptwo/RenewableEnergy';
function TechnicalStepTwo() {
  const { watch } = useFormContext();
  const categoryId = watch('categoryId');
  const criteriaId = watch('criteriaId');

  switch (categoryId) {
    case 1:
      return <GreenBuilding />;
    case 2:
      return <RenewableEnergy />;
    case 3:
      return <div>Category 2</div>;
    default:
      return <EmptyList message={'Seems Like you did not select a category'} />;
  }
}

export default TechnicalStepTwo;
