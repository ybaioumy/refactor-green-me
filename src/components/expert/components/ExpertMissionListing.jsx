import React, { useState } from 'react';
import Loader from '../../shared/Loader';
import { AgGridReact } from 'ag-grid-react';
import { useGetExpertAssignedMissionsQuery } from '../../../redux/features/expert';
import { useGetuserId } from '../../../hooks/useCookies';
import { useSelector } from 'react-redux';
import { HorizontalSearchBar } from '../../shared/table/tablePageComponents';
function ExpertMissionListing() {
  const expertId = useGetuserId();
  const [gridApi, setGridApi] = useState(null);
  const { data, isLoading, isError, error } = useGetExpertAssignedMissionsQuery(
    { userId: expertId }
  );
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
      headerName: 'Updated',
      field: 'updated',
      sortable: true,
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
  //   const onRowClick = (params) => {
  //     navigate(`/projects/eligible/${projectId}/mission/${params.data.id}`, {
  //       state: { expert: expert, mission: params.data },
  //     });
  //   };
  const totalPages =
    Math.ceil(data?.totalRecords ? data.totalRecords : 0 / pageSize) || 0;
  //   const assignMission = () => {
  //     navigate('/create-mission', {
  //       state: { expert: expert, projectId: projectId },
  //     });
  //   };

  return (
    <div className="h-screen">
      <HorizontalSearchBar data={[]} isLoading={false} />

      <div className="ag-theme-alpine ag-theme-MembersListing h-full bg-[#EFFCFF] md:p-10 rounded-lg w-[95%] m-auto md:my-10">
        <AgGridReact
          totalPages={totalPages}
          gridOptions={gridOptions}
          rowData={data}
          columnDefs={columnDefs}
          pagination={true}
          suppressPaginationPanel={true}
          //   onRowClicked={onRowClick}
          // suppressHorizontalScroll={true}
          suppressVerticalScroll
          rowHeight={80}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
}

export default ExpertMissionListing;
