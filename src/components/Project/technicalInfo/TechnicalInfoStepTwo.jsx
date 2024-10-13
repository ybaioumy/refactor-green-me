import React from 'react';
import { useFormContext } from 'react-hook-form';
import EmptyList from '../../shared/EmptyList';
import GreenBuilding from './steptwo/GreenBuilding';
import RenewableEnergy from './steptwo/RenewableEnergy';
import EnergyEfficiency from './steptwo/EnergyEffciency';
import { useGetAllCategoriesWithCrietriaQuery } from '../../../redux/features/eligibility';
import useGetItemIdByName from '../../../hooks/useGetItemIdByName';
import Loader from '../../shared/Loader';
function TechnicalStepTwo() {
  const { watch } = useFormContext();
  const {
    data: categories,
    isLoading: isLoadingCategory,
    error: errorCategory,
  } = useGetAllCategoriesWithCrietriaQuery();
  const categoryId = watch('categoryId');

  const energyEfficiencyId = useGetItemIdByName(
    categories,
    'Energy Efficiency'
  );
  const greenBuildingId = useGetItemIdByName(categories, 'Green Building');
  const reneableId = useGetItemIdByName(categories, 'Renewable Energy');

  if (isLoadingCategory || !categoryId) return <Loader />;
  switch (categoryId) {
    case greenBuildingId:
      return <GreenBuilding />;
    case reneableId:
      return <RenewableEnergy />;
    case energyEfficiencyId:
      return <EnergyEfficiency />;
    default:
      return <EmptyList message={'No data available'} />;
  }
}

export default TechnicalStepTwo;
