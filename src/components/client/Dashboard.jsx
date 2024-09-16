import React, { useEffect, useState } from 'react';
import ProjectsPipline from './ProjectsPipline';
import ProjectSubmissionDetails from './ProjectSumissionDetails';
import { useGetAllProjectsQuery } from '../../redux/features/project';
import Loader from '../shared/Loader';
import EmptyList from '../shared/EmptyList';
const ClientDashBoard = () => {
  const initialSearchObject = {
    categoryId: 0,
    economicSectorId: 0,
    servedCountryId: 0,
    projectStatusId: 0,
    pageNumber: 0,
    pageSize: 0,
  };

  const { data, isLoading, isError } =
    useGetAllProjectsQuery(initialSearchObject);

  if (isLoading) return <Loader />;
  if (isError) return <EmptyList />;
  return (
    <div className="flex flex-col md:flex-row justify-between gap-5 lg:gap-20 p-5 lg:p-10">
      <ProjectSubmissionDetails data={data} isLoading={isLoading} />
      <div className="md:w-1/3">
        <ProjectsPipline slidePerView={2} />
      </div>
    </div>
  );
};

export default ClientDashBoard;
