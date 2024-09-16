import React from 'react';
import ClientESCO from './CllientESCO';
import { useGetTypesQuery } from '../../redux/features/auth';

function UserInformation({
  registerData,
  setRegisterData,
  tokenData,
  countries,
}) {
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
  const expertId = getUserTypeIdByName(registerData.typesId, 'expert');
  const contractorId = getUserTypeIdByName(registerData.typesId, 'contractor');
  if (expertId || contractorId) return <h1>hii</h1>;
 
  return (
    <ClientESCO
      registerData={registerData}
      setRegisterData={setRegisterData}
      tokenData={tokenData}
    />
  );
}

export default UserInformation;
