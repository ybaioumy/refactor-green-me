import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ESCODetails from '../components/Registeration/escoInfo/ESCOInfo';
import { useTypeId } from '../hooks/useCookies';
import { useGetTypesQuery } from '../redux/features/auth';
import useGetItemIdByName from '../hooks/useGetItemIdByName';
import ExpertDetails from '../components/Registeration/expertInfo/ExpertInfo';
import EmptyList from '../components/shared/EmptyList';
function Profile() {
  const { data: typesData } = useGetTypesQuery();
  const typeId = Number(useTypeId());

  const methods = useForm({
    defaultValues: {},
    mode: 'onChange',
  });
  const escoTypeId = useGetItemIdByName(typesData, 'esco');
  const expertTypeId = useGetItemIdByName(typesData, 'expert');
  const content = () => {
    if (typeId === escoTypeId) {
      return <ESCODetails countries={[]} />;
    }
    if (typeId === expertTypeId) {
      return <ExpertDetails countries={[]} expertise={[]} certification={[]} />;
    }
    return null;
  };
  return (
    <FormProvider {...methods}>
      <div className="p-2 pl-4 md:w-[70%]">{content()}</div>
    </FormProvider>
  );
}

export default Profile;
