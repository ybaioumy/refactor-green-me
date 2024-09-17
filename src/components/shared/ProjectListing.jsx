import React, { useEffect, useState } from 'react';
import ProjectTable from './Table';
import { useGetAllProjectsQuery,useGetAllOpportunitiesQuery } from '../../redux/features/project';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
export function ProjectsListing() {
  const searchObject = useSelector((state) => state.search);

  const location = useLocation();
  const isOpportunitiesRoute = location.pathname === '/projects/opportunities';
  const { data, isLoading, error } = useGetAllProjectsQuery(searchObject);
  const [fetchOpportunities, setFetchOpportunities] = useState(false);
  const {
    data: opportunities,
    isLoading: isOpportunitiesLoading,
    error: opportunitiesError,
  } = useGetAllOpportunitiesQuery(searchObject, { skip: !fetchOpportunities });

  useEffect(() => {
    if (isOpportunitiesRoute) {
      setFetchOpportunities(true);
    } else {
      setFetchOpportunities(false);
    }
  }, [isOpportunitiesRoute]);

  const tableData = isOpportunitiesRoute ? opportunities : data;
  const tableLoading = isOpportunitiesRoute
    ? isOpportunitiesLoading
    : isLoading;
  const tableError = isOpportunitiesRoute ? opportunitiesError : error;

  return (
    <ProjectTable
      data={tableData}
      isLoading={tableLoading}
      error={tableError}
      isOpportunitiesRoute={isOpportunitiesRoute}
    />
  );
}

export default ProjectsListing;
