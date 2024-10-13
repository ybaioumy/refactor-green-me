import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ESCODetails from '../components/Registeration/escoInfo/ESCOInfo';
import { useTypeId } from '../hooks/useCookies';
import {
  useGetAllCountriesQuery,
  useGetTypesQuery,
  useGetUserProfileQuery,
} from '../redux/features/auth';
import useGetItemIdByName from '../hooks/useGetItemIdByName';
import ExpertDetails from '../components/Registeration/expertInfo/ExpertInfo';
import { useGetExpertFilterQuery } from '../redux/features/expert';
import Loader from '../components/shared/Loader';
import Button from '../components/shared/Button';
function Profile() {
  const { data: typesData } = useGetTypesQuery();
  const typeId = Number(useTypeId());
  // const {
  //   data: profileData,
  //   isLoading,
  //   isError,
  //   error,
  // } = useGetUserProfileQuery();

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
  const methods = useForm({
    defaultValues: {},
    mode: 'onChange',
  });
  const escoTypeId = useGetItemIdByName(typesData, 'esco');
  const expertTypeId = useGetItemIdByName(typesData, 'expert');
  const content = () => {
    if (typeId === escoTypeId) {
      return <ESCODetails countries={countries} />;
    }
    if (typeId === expertTypeId) {
      return (
        <ExpertDetails
          countries={countries}
          expertise={areasofExpertise}
          certifcations={certification}
          // tokenData={tokenData}
        />
      );
    }
    return null;
  };
  if (isLoadingCountries || isLoadingExpertData) return <Loader />;
  if (isErrorCountries || isErrorExpertData) return <div>Error...</div>;
  return (
    <FormProvider {...methods}>
      <div className="p-2 pl-4 md:w-[70%] md:ml-[5%]">{content()} </div>
    </FormProvider>
  );
}

export default Profile;
