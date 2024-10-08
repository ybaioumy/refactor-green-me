import React, { useMemo, useCallback } from 'react';
import TeamTable from './TeamTable';
import { useGetProjectUsersQuery } from '../../../redux/features/project';
import { useParams } from 'react-router-dom';
import Loader from '../../shared/Loader';
import EmptyList from '../../shared/EmptyList';
import { useGetTypesQuery } from '../../../redux/features/auth';
const Teams = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error, refetch } =
    useGetProjectUsersQuery(id);
  const {
    data: types,
    isLoading: isLoadingTypes,
    isError: isErrorTypes,
  } = useGetTypesQuery();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTypeId = useCallback(
    (name) => types?.find((type) => type.name === name)?.id
  );

  const escoId = useMemo(() => getTypeId('ESCO'), [getTypeId]);
  const expertId = useMemo(() => getTypeId('Expert'), [getTypeId]);
  // Filter users by typesId for ESCO and Expert teams

  const removeDuplicates = (users) => {
    const uniqueUsers = new Set();
    return users?.filter((user) => {
      if (!uniqueUsers.has(user.id)) {
        uniqueUsers.add(user.id);
        return true;
      }
      return false;
    });
  };
  const escoTeam = useMemo(
    () => removeDuplicates(data?.filter((user) => user.typesId === escoId)),
    [data, escoId]
  );
  const expertTeam = useMemo(
    () => removeDuplicates(data?.filter((user) => user.typesId === expertId)),
    [data, expertId]
  );
  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data || isErrorTypes) {
    return <EmptyList message={error.data.message} />;
  }
  return (
    <div className="w-full h-full flex flex-col gap-20">
      {/* ESCO Team Table */}
      <TeamTable
        label={'ESCO team'}
        membersType={'esco'}
        data={escoTeam}
        isLoading={isLoading}
        refetch={refetch}
      />

      {/* Expert Team Table */}
      <TeamTable
        label={'Expert'}
        membersType={'expert'}
        data={expertTeam}
        isLoading={isLoading}
        refetch={refetch}
      />
    </div>
  );
};

export default Teams;
