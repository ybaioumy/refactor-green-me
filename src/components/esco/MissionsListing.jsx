import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../shared/Loader';
import { HorizontalSearchBar } from '../shared/table/tablePageComponents';
import CustomPaginationComponent from '../shared/table/CustomPagination';

import { useGetMissionsQuery } from '../../redux/features/expert';
import EmptyList from '../shared/EmptyList';
import { getTimeAgo } from '../../utilits/helpers';
function MissionListing() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { expert, projectId } = state || {};
  const { data, isLoading, isError, error } = useGetMissionsQuery({
    userId: expert?.id || null,
    projectId: projectId,
  });
  const [gridApi, setGridApi] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const searchObject = useSelector((state) => state.search);

  const { pageSize } = searchObject;

  const [columnDefs] = useState([
    {
      headerName: 'Mission Code',
      field: 'missionCode',
      headerClass: 'mission-code-header',
    },

    {
      headerName: 'Mission Name',
      field: 'missionName',
      sortable: true,
    },
    {
      headerName: 'Location',
      field: 'location',
      sortable: true,
    },
    {
      headerName: 'Generated Reports',
      field: 'generatedReport',
      // flex: 2,
      sortable: true,
    },
    {
      headerName: 'Assigned by',
      field: 'assignedBy',
      sortable: true,
    },
    {
      headerName: 'Last Update',
      field: 'lastUpdate',
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return `${getTimeAgo(params.value)}`;
      },
    },
    {
      headerName: 'Status',
      field: 'statusName',
      sortable: true,
    },
    {
      headerName: 'Project Code',
      field: 'projectName',
      headerClass: 'project-code-header', //custom color
      sortable: true,
      // pinned:'right'
    },
  ]);

  const sortAscending = `
  <svg width="15" height="15" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5 0L20.4593 17.25L0.540708 17.25L10.5 0Z" fill="white"/>
  </svg>
`;

  const sortDescending = `
  <svg width="15" height="15" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M19.5933 1.25L10.5 17L1.40673 1.25L19.5933 1.25Z" stroke="white"/>
  </svg>
`;

  const gridOptions = {
    columnDefs: columnDefs,
    suppressServerSideFullWidthLoadingRow: true,
    loadingCellRenderer: <Loader />,
    icons: {
      sortAscending: sortAscending,
      sortDescending: sortDescending,
    },
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
  };
  const onRowClick = (params) => {
    navigate(`/projects/eligible/${projectId}/mission/${params.data.id}`, {
      state: { expert: expert, mission: params.data },
    });
  };
  const totalPages =
    Math.ceil(data?.totalRecords ? data.totalRecords : 0 / pageSize) || 0;
  const assignMission = () => {
    navigate('/create-mission', {
      state: { expert: expert, projectId: projectId },
    });
  };

  // const dataToFilter = [
  //   {
  //     label: 'By Project',
  //     data: [],
  //   },
  //   {
  //     label: 'By Mission Type',
  //     data: [],
  //   },
  // ];
  useEffect(() => {
    if (data && data !== undefined) {
      setFilteredProjects(data);
    } else {
      setFilteredProjects([]);
    }
  }, [data]);

  if (isLoading) return <Loader />;
  if (!projectId) {
    navigate('/');
    console.log('no project');
  }
  if (isError) return <EmptyList message={'Something went wrong'} />;
  if (!state || !expert) {
    console.log('no state');
    navigate(`/projects/eligible/${projectId}/add-mission`, { replace: true });
  }
  return (
    <div className="flex flex-col h-screen">
      <HorizontalSearchBar data={[]} operationTodo={assignMission} />
      <div className="mb-2 w-full bg-[#EFFCFF] py-4 px-14 z-10 flex items-center shadow-md gap-5">
        <span className="flex items-center gap-2 text-[22px] text-[#334B9F] font-bold">
          Missions Assigned to Expert: {`${state?.expert.expertName}`}
        </span>
      </div>
      <div className="ag-theme-alpine ag-theme-MembersListing h-full bg-[#EFFCFF] md:p-10 rounded-lg w-[95%] m-auto md:my-10">
        <AgGridReact
          paginationPageSize={pageSize}
          gridOptions={gridOptions}
          rowData={filteredProjects}
          columnDefs={columnDefs}
          pagination={true}
          suppressPaginationPanel={true}
          onRowClicked={onRowClick}
          // suppressHorizontalScroll={true}
          suppressVerticalScroll
          rowHeight={80}
          onGridReady={onGridReady}
        />
      </div>
      {gridApi && gridApi.paginationGetRowCount() > 0 && (
        <CustomPaginationComponent totalRecords={totalPages} />
      )}
    </div>
  );
}

export default MissionListing;
