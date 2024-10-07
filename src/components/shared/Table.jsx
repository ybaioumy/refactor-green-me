import { AgGridReact } from 'ag-grid-react';
// import { AgGridReact } from '@ag-grid-community/react';
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { Modal } from 'antd';
import Button from './Button';
import { FilterOutlined } from '@ant-design/icons';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon';
import CustomPaginationComponent from './table/CustomPagination';
import {
  FilterComponent,
  HorizontalSearchBar,
} from './table/tablePageComponents';
import { useTypeId } from '../../hooks/useCookies';
import { useGetProjectsFiltersQuery } from '../../redux/features/project';
import { getTimeAgo } from '../../utilits/helpers';
import { useSelector } from 'react-redux';
import ExportAsExcelButton from './ExcelButton';
const ProjectTable = ({ data, isOpportunitiesRoute }) => {

  const [filteredProjects, setFilteredProjects] = useState([]);
  const isSmallDevice = useMediaQuery('(max-width: 768px)');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const searchObject = useSelector((state) => state.search);
  const { pageSize } = searchObject;

  const { data: filters, isLoading: isLoadingFilters } =
    useGetProjectsFiltersQuery();
  const { category, projectStatus, economicSector, servedCountry } =
    filters || {};
  const navigate = useNavigate();
  const gridRef = useRef();
  const userType = useTypeId();

  const clientToFilterItems = [
    { label: 'Project Category', data: category, key: 'categoryId' },
    {
      label: 'Location',
      data: servedCountry,
      key: 'servedCountryId',
    },
  ];

  const escoToFilterItems = [
    {
      label: 'Location',
      data: servedCountry,
      key: 'servedCountryId',
    },
    { label: 'Project Status', data: projectStatus, key: 'projectStatusId' },
    { label: 'Project Category', data: category, key: 'categoryId' },
    { label: 'Economic Sector', data: economicSector, key: 'economicSectorId' },
  ];
  const expertToFilterItems = [
    { label: 'Location', data: servedCountry, key: 'servedCountryId' },
    { label: 'Project Status', data: projectStatus, key: 'projectStatusId' },
    { label: 'Project Category', data: category, key: 'categoryId' },
    { label: 'Economic Sector', data: economicSector, key: 'economicSectorId' },
  ];

  const dataToFilter = () => {
    switch (Number(userType)) {
      case 1:
        return clientToFilterItems;
      case 2:
        return escoToFilterItems;
      case 3:
        return expertToFilterItems;
      default:
        return [];
    }
  };
  const selectes = dataToFilter();

  const columnDefs = useMemo(() => {
    const baseColumnDefs = [
      {
        headerName: 'Project Name',
        field: 'projectName',
        sortable: true,
        filter: true,
        checkboxSelection: !isOpportunitiesRoute && true,
        headerCheckboxSelection: !isOpportunitiesRoute && true,
      },
      {
        headerName: 'Code',
        field: 'code',
        sortable: true,
        filter: true,
        headerClass: 'projects-listing-code',
      },
      {
        headerName: 'Status',
        field: 'projectStatusName',
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Country',
        field: 'servedCountryName',
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Submitted on',
        field: 'submittedOn',
        sortable: true,
        filter: true,
        cellRenderer: (params) => {
          return `${new Date(params.value).toLocaleDateString()}`;
        },
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
      { headerName: 'Budget', field: 'budget', sortable: true, filter: true },
    ];
    if (Number(userType) === 1) {
      baseColumnDefs.push({
        headerName: 'Project proposals',
        field: 'proposalsCount',
        sortable: false,
        filter: false,
        cellRenderer: (params) => {
          if (params.data.pendingProposalCount >= 1)
            return (
              <div className="flex justify-center items-center h-full">
                <Button
                  variant="blue"
                  className="justify-between items-center pr-2 pl-1 h-[40px] font-normal "
                  onClick={() =>
                    navigate(`/proposals/${params?.data.id}`, {
                      state: { projectId: params.data.id },
                    })
                  }>
                  <div className="w-[20px] h-[20px] bg-[#bbea00] rounded-full mr-2" />
                  <p className="">{`${params.data.pendingProposalCount} Submitted proposals`}</p>
                </Button>
              </div>
            );
        },
      });
    }
    if (isOpportunitiesRoute) {
      baseColumnDefs.push({
        field: 'actions',
        headerName: 'Actions',
        pinned: 'right',
        cellRenderer: (params) => (
          <div className="flex justify-center items-center h-full">
            <Button
              variant="blue"
              className="justify-between items-center h-1/3 w-[180px] font-quicksand"
              onClick={() => navigate(`/submit-offer/${params?.data.id}`)}>
              <Icon name={'addProject'} />
              <p>Submit Offer</p>
            </Button>
          </div>
        ),
      });
    }

    return baseColumnDefs;
  }, [isOpportunitiesRoute, navigate, userType]);

  useEffect(() => {
    if (data && data !== undefined) {
      setFilteredProjects(data.data || data);
    } else {
      setFilteredProjects([]);
    }
  }, [data]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSelectionChanged = (event) => {
    setSelectedRows(event.api.getSelectedRows());
  };

  const onGridReady = (params) => {
    !params.api.isDestroyed() && setGridApi(params.api);
    return () => {
      setGridApi(null);
    };
  };

  const onRowClicked = (event) => {
    const projectId = event.data.id||event.data.projectId;
    navigate(
      isOpportunitiesRoute
        ? `/projects/opportunities/project-details/${projectId}`
        : `/projects/eligible/${projectId}`
    );
  };

  const gridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
      editable: true,
      filter: true,
      flex: 1,
      minWidth: 210,
    },
  };
  // console.log(selectes);

  // if (isLoading) return <Loader />;
  // if (error) return <EmptyList message={'Something went wrong'} />;
  return (
    <>
      {!isSmallDevice && (
        <HorizontalSearchBar data={selectes} isLoading={isLoadingFilters} />
      )}
      <div className="flex flex-col h-screen overflow-hidden">
        <div
          className={`filter-div ${
            selectedRows.length > 0 ? 'open' : 'closed'
          }`}>
          <div className="mb-2 w-full bg-[#D9EDD0] py-1 px-4 z-10 flex items-center shadow-md gap-5 pl-[18%]">
            <div className="border-r-2 border-[#30633B] px-2 text-[14px] flex flex-col">
              <span className="font-semibold">{selectedRows.length}</span>
              <span>Selected</span>
            </div>
            <span className="flex items-center gap-2 ">
              Actions
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 7L0.499999 13.9282L0.5 0.0717963L14 7Z"
                  fill="#30633B"
                />
              </svg>
            </span>
            <div className="flex flex-col md:flex-row gap-2">
              <ExportAsExcelButton
                variant={'withIcon'}
                data={selectedRows}
                fileName={'Project as Excel'}
              />
              <Button
                type="primary"
                hasIcon
                iconPosition="right"
                iconName="filter">
                Filter More like This
              </Button>
            </div>
          </div>
        </div>
        <div className="flex h-full gap-1">
          {!isOpportunitiesRoute && (
            <div className="hidden md:block md:w-1/6">
              <FilterComponent
                projects={filteredProjects}
                setFilteredProjects={setFilteredProjects}
              />
            </div>
          )}

          <div className="flex-1 md:w-3/4">
            {isOpportunitiesRoute ? (
              <div className={`filter-div ${'open'}`}>
                <div className="mb-2 w-full bg-[#D9EDD0] h-[60px] px-4 z-10 flex items-center shadow-md gap-5">
                  <span className="flex items-center gap-2 text-[22px] text-[#1E4A28] font-bold">
                    New Project listings / Opportunities
                  </span>
                </div>
              </div>
            ) : null}
            <div className="ag-theme-alpine ag-theme-greenMe w-full h-full p-1">
              <AgGridReact
                ref={gridRef}
                gridOptions={gridOptions}
                onGridReady={onGridReady}
                rowSelection="multiple"
                columnDefs={columnDefs}
                rowData={filteredProjects}
                pagination={true}
                rowHeight={100}
                onSelectionChanged={onSelectionChanged}
                onRowClicked={onRowClicked}
                // domLayout="autoHeight"
                suppressPaginationPanel={true}
                paginationPageSize={pageSize}
              />
            </div>
            <Button
              onClick={showModal}
              className="md:hidden fixed bottom-16 right-4 text-white p-2 rounded-full shadow-lg h-[50px] w-[50px]">
              <FilterOutlined />
            </Button>
          </div>
        </div>
        <Modal
          title="Filter Projects"
          open={isModalOpen}
          onOk={handleOk}
          footer={null}
          width={1000}
          onCancel={handleCancel}
          className="full-screen-modal">
          <div className="bg-white w-full">
            <FilterComponent
              projects={filteredProjects}
              setFilteredProjects={setFilteredProjects}
            />
            <HorizontalSearchBar data={selectes} />
          </div>
        </Modal>
      </div>
      {gridApi && (
        <CustomPaginationComponent
          totalRecords={Math.ceil(
            data?.totalRecords ? data.totalRecords : 0 / pageSize
          )}
        />
      )}
    </>
  );
};

export default ProjectTable;
