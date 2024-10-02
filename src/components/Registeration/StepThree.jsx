import React from 'react';
import ProjectOwner from './clientInfo/ClientInfo';
import ESCODetails from './escoInfo/ESCOInfo';
import {
  useGetAllClientSectorsQuery,
  useGetAllCountriesQuery,
  useGetTypesQuery,
} from '../../redux/features/auth';
import Loader from '../shared/Loader';
import EmptyList from '../shared/EmptyList';
import { useFormContext } from 'react-hook-form';
import ExpertDetails from './expertInfo/ExpertInfo';
import { useGetExpertFilterQuery } from '../../redux/features/expert';
function StepThree() {
  const { watch } = useFormContext();
  const typeId = watch('typesId');

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
  const {
    data: sectors,
    isLoading: isLoadingSectors,
    isError: isErrorSectors,
  } = useGetAllClientSectorsQuery();
  
  const { data: usersTypes, isLoading, isError } = useGetTypesQuery();

  const getUserTypeIdByName = (id, name) => {
    // Find the user type by matching the id and name in usersTypes array
    const userType = usersTypes?.find(
      (type) =>
        type?.id === id && type?.name?.toLowerCase() === name.toLowerCase()
    );

    // Return the id associated with the name, or null if not found
    return userType ? userType.id : null;
  };
  const clientId = getUserTypeIdByName(typeId, 'client');
  const escoId = getUserTypeIdByName(typeId, 'esco');
  const expertId = getUserTypeIdByName(typeId, 'expert');
  const contractorId = getUserTypeIdByName(typeId, 'contractor');

  if (
    isLoading ||
    isLoadingCountries ||
    isLoadingExpertData ||
    isLoadingSectors
  )
    return <Loader />;

  if (isError || isErrorCountries || isErrorExpertData || isErrorSectors)
    return <EmptyList />;

  if (escoId) return <ESCODetails countries={countries} />;
  if (clientId) return <ProjectOwner countries={countries} sectors={sectors} />;
  if (expertId)
    return (
      <ExpertDetails
        countries={countries}
        expertise={areasofExpertise}
        certifcations={certification}
      />
    );

  return <div>You did not select User Type at step 1 </div>;
}

export default StepThree;
