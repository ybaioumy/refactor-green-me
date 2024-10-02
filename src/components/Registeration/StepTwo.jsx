import React from 'react';
import ClientESCO from './CllientESCO';
import {
  useGetTypesQuery,
  useGetAllCountriesQuery,
} from '../../redux/features/auth';
import ExpertContractor from './Expert';
import { useFormContext } from 'react-hook-form';
import Loader from '../shared/Loader';
import { useGetExpertFilterQuery } from '../../redux/features/expert';
import EmptyList from '../shared/EmptyList';

function UserInformation({ tokenData }) {
  const { data: usersTypes, isLoading, isError } = useGetTypesQuery();
  const {
    data: countries,
    isLoading: isLoadingCountries,
    isError: isErrorCountries,
  } = useGetAllCountriesQuery();
  const {
    data: expertData,
    isLoading: isLoadingExpertData,
    isError: isErrorExpertData,
  } = useGetExpertFilterQuery();
  const { areasofExpertise, certification } = expertData || {};
  const { watch } = useFormContext();
  const typeId = watch('typesId');

  const getUserTypeIdByName = (id, name) => {
    const userType = usersTypes?.find(
      (type) =>
        type?.id === id && type?.name?.toLowerCase() === name.toLowerCase()
    );
    return userType ? userType.id : null;
  };
  const expertId = getUserTypeIdByName(typeId, 'expert');
  const contractorId = getUserTypeIdByName(typeId, 'contractor');

  if (isLoadingCountries || isLoading || isLoadingExpertData) return <Loader />;
  if (isError || !countries || isErrorCountries || isErrorExpertData)
    return <EmptyList />;
  if (expertId || contractorId)
    return (
      <ExpertContractor
        countries={countries}
        tokenData={tokenData}
        certifications={certification}
        areasOfExpertise={areasofExpertise}
      />
    );

  return <ClientESCO tokenData={tokenData} />;
}

export default UserInformation;
