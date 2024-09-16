import React from 'react';
import ProjectOwner from './clientInfo/ClientInfo';
import ESCODetails from './escoInfo/ESCOInfo';
import { useGetTypesQuery } from '../../redux/features/auth';
function StepThree({ registerData }) {
  const countries = [
    { id: 1, name: 'United States' },
    { id: 2, name: 'Canada' },
    { id: 3, name: 'Germany' },
    { id: 4, name: 'United Kingdom' },
    { id: 5, name: 'Australia' },
    { id: 6, name: 'Brazil' },
    { id: 7, name: 'India' },
    { id: 8, name: 'China' },
    { id: 9, name: 'South Africa' },
    { id: 10, name: 'Japan' },
  ];
  const sectors = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Healthcare' },
    { id: 3, name: 'Finance' },
    { id: 4, name: 'Energy' },
    { id: 5, name: 'Education' },
    { id: 6, name: 'Agriculture' },
    { id: 7, name: 'Manufacturing' },
    { id: 8, name: 'Real Estate' },
    { id: 9, name: 'Transportation' },
    { id: 10, name: 'Tourism' },
  ];
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
  if (escoId) return <ESCODetails countries={countries} sectors={sectors} />;
  if (clientId) return <ProjectOwner countries={countries} sectors={sectors} />;

  return <div>You did not select User Type at step 1 </div>;
}

export default StepThree;
