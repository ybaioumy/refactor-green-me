import React from 'react';
import { useFormContext } from 'react-hook-form';
import EmptyList from '../../shared/EmptyList';
import GreenBuilding from './stepone/GreenBuilding';

function TechnicalStepOne() {
  const { watch } = useFormContext();
  const categoryId = watch('categoryId');
  const criteriaId = watch('criteriaId');

  switch (categoryId) {
    case 1:
      return <GreenBuilding />;
    case 2:
      return <div>Category 2</div>;
    default:
      return <EmptyList message={'Seems Like you did not select a category'} />;
  }
}

export default TechnicalStepOne;
