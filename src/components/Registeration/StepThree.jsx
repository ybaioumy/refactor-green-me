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
function StepThree({ registerData }) {
  const {
    data: countries,
    isLoading: isLoadingCountries,
    isError: isErrorCountries,
  } = useGetAllCountriesQuery();
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
  const clientId = getUserTypeIdByName(registerData.typesId, 'client');
  const escoId = getUserTypeIdByName(registerData.typesId, 'esco');
  if (isLoading || isLoadingCountries) return <Loader />;
  if (isError || isErrorCountries) return <EmptyList />;
  if (escoId) return <ESCODetails countries={countries} />;
  if (clientId) return <ProjectOwner countries={countries} sectors={sectors} />;

  return <div>You did not select User Type at step 1 </div>;
}

export default StepThree;
