import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Modal, message, List } from 'antd';
import { useLocation, useParams } from 'react-router-dom';
import { HorizontalSearchBar } from '../shared/table/tablePageComponents';
import { Link } from 'react-router-dom';
import CustomPaginationComponent from '../shared/table/CustomPagination';
import Icon from '../shared/Icon';
import Loader from '../shared/Loader';
import {
  useInviteUserMutation,
  useGetInvitationStatusQuery,
  useGetUserPermissionsQuery,
} from '../../redux/features/inviteMembers';
import {
  useGetAllExpertsQuery,
  useGetExpertFilterQuery,
} from '../../redux/features/expert';
import { useSelector } from 'react-redux';
import EmptyList from '../shared/EmptyList';
import Button from '../shared/Button';
import { useGetRolesQuery } from '../../redux/features/auth';
import { PermissionComponent } from './AssignMission';
import InvitationModal from '../Project/teams/InvitationModal';
import { useGetTypesQuery } from '../../redux/features/auth';
import useGetItemIdByName from '../../hooks/useGetItemIdByName';
function MembersListing() {
  const { id } = useParams();
  const location = useLocation();
  const { state } = location;
  const { typeId, projectId, escoId } = state || {};

  const gridRef = useRef();
  const searchObject = useSelector((state) => state.search);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { pageSize } = searchObject;
  const [inviteUser, { isLoading }] = useInviteUserMutation();
  const {
    data,
    isLoading: isLoadingAllExperts,
    isError: isErrorExperts,
  } = useGetAllExpertsQuery(searchObject);
  const {
    data: filters,
    isLoading: isLoadingFilters,
    isError: isErrorFilters,
  } = useGetExpertFilterQuery();

  const { data: roles, isLoading: isLodingRoles } = useGetRolesQuery();
  const initialRoleId = useGetItemIdByName(roles, 'user');

  const {
    data: statusData,
    isLoading: isLoadingStatus,
    isError: isErrorStatus,
  } = useGetInvitationStatusQuery();
  const intialInvitationStatus = useGetItemIdByName(statusData, 'pending');
  const { data: types } = useGetTypesQuery();
  const expertTypeId = useGetItemIdByName(types, 'expert');

  const { data: permissionsArray, isLoading: isLoadingPermissions } =
    useGetUserPermissionsQuery();
  const [gridApi, setGridApi] = useState(null);
  const [columnDefs] = useState([
    {
      field: 'id',
      headerName: 'Expert Code',
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    { headerName: 'Expert Name', field: 'expertName' },
    { headerName: 'Base Country', field: 'baseCountry' },
    { headerName: 'Expertise', field: 'expertise' },
    { headerName: 'Certifications', field: 'certifications' },
    { headerName: 'Invited by', field: 'invitedBy' },
    { headerName: 'Languages', field: 'languages' },
    { headerName: 'Nationality', field: 'nationality' },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filter: false,
      pinned: 'right',
      cellRenderer: (params) => (
        <div className="flex justify-center items-center h-full">
          <Link
            state={{ expert: params.data, projectId: id }}
            to={`/projects/eligible/${id}/add-mission`}
            className="flex justify-between items-center rounded-full w-[150px] md:w-[226px] px-2 bg-[#0050C8] text-white font-semibold">
            <Icon name={'addProject'} />
            Mission
          </Link>
        </div>
      ),
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
    icons: {
      sortAscending: sortAscending,
      sortDescending: sortDescending,
    },
    defaultColDef: {
      flex: 1,
      editable: false,
      filter: true,
      minWidth: 190,
      cellStyle: { color: '#202020', fontSize: 18 },
    },
    dataTypeDefinitions: {
      object: {
        baseDataType: 'object',
        extendsDataType: 'object',
        valueParser: (params) => ({ name: params.newValue }),
        valueFormatter: (params) =>
          params.value == null ? '' : params.value.name,
      },
    },
  };

  const onGridReady = (params) => {
    !params.api.isDestroyed() && setGridApi(params.api);
    return () => {
      setGridApi(null);
    };
  };

  const onSelectionChanged = (event) => {
    setSelectedRows(event.api.getSelectedRows());
  };

  const handleAddNewExpert = () => {
    setIsPopupVisible(true); // open PopUp to invite by mail
  };
  const openModal = () => {
    setOpen(true);
  };
  const onFinish = async () => {
    const projectIdToSend = Number(projectId);
    const emailsArray = selectedRows.map((member) => member.email);
    if (emailsArray.length === 0) {
      message.error('Please select at least one user.');
      return;
    }
    if (selectedPermissions.length === 0) {
      message.error('Please select at least one permission.');
      return;
    }
    try {
      await inviteUser({
        emails: emailsArray,
        projectId: projectIdToSend,
        typeId,
        statusId: intialInvitationStatus,
        permissionId: selectedPermissions,
        roleId: initialRoleId,
        escoId,
      }).unwrap();
      message.success(
        `Users with emails ${emailsArray.join(
          ', '
        )} successfully invited to project id ${projectId}`
      );
      setSelectedRows([]);
      setOpen(false);
      setSelectedPermissions([]);
    } catch (error) {
      message.error(error.data.message);
    }
  };
  // console.log(selectedRows);
  const { areasofExpertise, country } = filters || {};
  const dataToFilter = [
    {
      label: 'Base Country',
      data: country,
      key: 'countryId',
    },
    {
      label: 'by Expertise',
      data: areasofExpertise,
      key: 'expertiseId',
    },
  ];

  useEffect(() => {
    if (data && data !== undefined) {
      setFilteredProjects(data?.data);
    } else {
      setFilteredProjects([]);
    }
  }, [data]);
  if (
    isLoadingStatus ||
    isLoadingAllExperts ||
    isLoadingPermissions ||
    isLodingRoles ||
    isLoadingFilters
  )
    return <Loader />;
  if (isErrorStatus || isErrorExperts || isErrorFilters) return <EmptyList />;
  // console.log(selectedPermissions);
  return (
    <div className="flex flex-col h-screen">
      <HorizontalSearchBar
        data={dataToFilter}
        operationTodo={handleAddNewExpert}
      />
      <div className="mb-2 w-full bg-[#EFFCFF] py-4 md:px-14 px-2 z-10 flex items-center justify-between shadow-md gap-5">
        <p className="flex items-center gap-2 text-[#334B9F] font-bold w-full">
          <span className="text-[22px]">Experts Listing </span>-{' '}
          <span
            className={` text-[16px] mt-[2px] transition-all duration-300 ease-in-out transform ${
              selectedRows.length > 0 ? ' scale-100 ' : ' scale-95 '
            }`}>
            {selectedRows.length > 0 ? (
              <span className="text-[#334B9F] font-bold">
                {selectedRows.length}{' '}
                {selectedRows.length === 1
                  ? 'Expert Selected'
                  : 'Experts Selected'}
              </span>
            ) : (
              <span className="line-clamp-2">
                {' '}
                Start Selecting experts to assign to this Project
              </span>
            )}
          </span>
        </p>

        <div
          className={`flex items-center gap-2 transition-all duration-300 ease-in-out transform ${
            selectedRows.length > 0
              ? 'opacity-100 scale-100 visible'
              : 'opacity-0 scale-95 invisible'
          }`}>
          <Button
            title="Invite Selected Members to this Project"
            onClick={openModal}
            size="sm"
            variant="blue"
            hasIcon
            iconPosition="left"
            iconName="addProject">
            Add Selected Members
          </Button>
        </div>
      </div>

      <div className="ag-theme-alpine ag-theme-MembersListing h-full bg-[#EFFCFF] md:p-5 rounded-lg w-[95%] m-auto md:my-10">
        <AgGridReact
          rowSelection="multiple"
          ref={gridRef}
          gridOptions={gridOptions}
          rowData={filteredProjects}
          columnDefs={columnDefs}
          pagination={true}
          onSelectionChanged={onSelectionChanged}
          suppressPaginationPanel={true}
          rowHeight={80}
          onGridReady={onGridReady}
        />
      </div>
      {gridApi && (
        <CustomPaginationComponent
          totalRecords={Math.ceil(
            data?.totalRecords ? data.totalRecords : 0 / pageSize
          )}
        />
      )}
      <Modal
        title={
          <>
            Select Permissions On Project{' '}
            <span className="italic text-[#1E4A28] underline ">{id}</span> for
            the following Experts :
          </>
        }
        open={open}
        onCancel={() => setOpen(false)}
        footer={[
          <Button
            key="cancel"
            variant="transparent"
            onClick={() => setOpen(false)}>
            Cancel
          </Button>,
          <Button key="confirm" type="primary" onClick={onFinish}>
            Confirm & Invite
          </Button>,
        ]}
        width={1500}
        loading={isLoading}
        okText="Invite">
        <div>
          <List
            itemLayout="horizontal"
            dataSource={selectedRows.map((item) => item) || []}
            renderItem={(item, idx) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={
                    <p className="text-[#334B9F]">{`User ${idx + 1} : ${
                      item.email
                    }`}</p>
                  }
                  // description={`User Id : ${item.useId}`}
                />
              </List.Item>
            )}
          />
        </div>
        <PermissionComponent
          data={permissionsArray}
          setSelectedPermissions={setSelectedPermissions}
        />
      </Modal>
      {isPopupVisible && (
        <InvitationModal
          onClose={() => setIsPopupVisible(false)}
          typeId={expertTypeId}
        />
      )}
    </div>
  );
}

export default MembersListing;
