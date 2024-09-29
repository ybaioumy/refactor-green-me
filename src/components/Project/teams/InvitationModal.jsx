import React, { useState, useMemo, useCallback } from 'react';
import Button from '../../shared/Button';
import Icon from '../../shared/Icon';
import RadioButton from '../../shared/RadioButton';
import {
  useGetMyUsersQuery,
  useGetRolesQuery,
} from '../../../redux/features/auth';
import {
  useGetInvitationsQuery,
  useInviteUserMutation,
  useGetUserPermissionsQuery,
} from '../../../redux/features/inviteMembers';
import { useParams } from 'react-router-dom';
import { message } from 'antd';

const InvitationModal = ({ onClose, typeId }) => {
  const { id } = useParams();
  const { data: members, isLoading, isError } = useGetMyUsersQuery();
  const [
    inviteUser,
    { isLoading: isInviteLoading, isSuccess, isError: isErrorInviting },
  ] = useInviteUserMutation();
  const {
    data: statusData,
    isLoading: isLoadingStatus,
    isError: isErrorStatus,
  } = useGetInvitationsQuery();

  const {
    data: permissions,
    isLoading: isLoadingPermissions,
    isError: isErrorPermissions,
  } = useGetUserPermissionsQuery();
  const {
    data: roles,
    isLoading: isLodingRoles,
    error: errorRoles,
    isError: isErrorRoles,
  } = useGetRolesQuery();
  const initialRoleId = roles?.find(
    (role) => role.name.toLowerCase() === 'user'
  ).id;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isEdit, setIsEdit] = useState(true);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMemberClick = (member) => {
    if (!selectedMembers.some((m) => m.email === member.email)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const handleRemoveMember = (email) => {
    setSelectedMembers(
      selectedMembers.filter((member) => member.email !== email)
    );
  };

  const getPermissionsIds = useCallback((type) => {
    return permissions
      ?.filter((permission) => permission.name.endsWith(type))
      ?.map((permission) => permission.id);
  });

  const viewPermissionsIds = useMemo(
    () => getPermissionsIds('View'),
    [getPermissionsIds]
  );
  const editPermissionsIds = useMemo(() => getPermissionsIds('Edit'), []);

  // Depending on the isEdit state, set the correct permissionId
  const permissionId = useMemo(
    () => (isEdit ? editPermissionsIds : viewPermissionsIds),
    [isEdit, editPermissionsIds, viewPermissionsIds]
  );
  // console.log(permissionId);

  const handleAddMembers = async () => {
    const projectIdToSend = Number(id);
    const intialInvitationStatus = statusData?.find(
      (item) => item.name === 'Pending'
    ).id;

    if (!selectedMembers.length) {
      message.error('Please select at least one user.');
      return;
    }
    try {
      const emailsArray = selectedMembers.map((member) => member.email);

      await inviteUser({
        emails: emailsArray,
        projectId: projectIdToSend,
        typeId: typeId || 2,
        statusId: intialInvitationStatus,
        permissionId: permissionId,
        roleId: initialRoleId,
      }).unwrap();

      message.success(
        `Users with emails ${emailsArray.join(
          ', '
        )} successfully invited to project id ${id}`
      );
      setSelectedMembers([]);
      // onClose(false);
    } catch (error) {
      console.log(error);
      message.error(
        error.data?.message || 'An error occurred while inviting the users.'
      );
      onClose();
    }
  };

  const handleEmailKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const email = searchTerm.trim();

      // Simple regex for basic email validation
      const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!isValidEmail(email)) {
        message.error('Please enter a valid email.');
        return;
      }

      if (email && !selectedMembers.some((m) => m.email === email)) {
        setSelectedMembers([...selectedMembers, { email, fullName: email }]);
        setSearchTerm(''); // Clear input after adding
      } else {
        message.error('Email is already added or invalid.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="semi-transparent-black rounded-lg w-full max-w-[1000px] p-4 md:p-6 shadow-lg mx-2 sm:mx-4">
        <div className="flex justify-between items-center text-lg md:text-xl font-semibold mb-4 text-white">
          <h2 className="text-sm sm:text-lg md:text-xl">
            Search Members by Name, ID, or Email
          </h2>
          <button type="button" onClick={onClose}>
            ✖
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col flex-1">
            {/* Search Input */}
            <div className="relative bg-[#EEEEEE] rounded-lg p-2 flex items-center">
              <div className="flex-col flex-1">
                <input
                  type="text"
                  className="w-full bg-transparent rounded-lg px-4 py-2 focus:outline-none"
                  placeholder="Search Members by Name, Email, or Type a New Email"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleEmailKeyDown}
                />
                <div className="mt-2 flex flex-wrap">
                  {selectedMembers.map((member, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-[#D80000] px-3 py-1 rounded-lg mr-2 mb-2 flex items-center">
                      {member.fullName}
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(member.email)}
                        className="ml-2 text-red-600 font-bold">
                        ✖
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between bg-black rounded-lg text-white p-2 mr-2 border border-[#D80000] ">
                <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base">
                  <RadioButton
                    title={'Set user Permissions to view Only'}
                    label={'View'}
                    value={true}
                    onChange={(e) => setIsEdit(false)}
                    checked={!isEdit}
                  />
                  |
                  <RadioButton
                    title={'Set user Permissions to Edit On Project'}
                    label={'Edit'}
                    value={false}
                    onChange={(e) => setIsEdit(true)}
                    checked={isEdit}
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-100 border border-gray-300 rounded-lg overflow-y-auto h-48 mt-2">
              {isLoading || isLoadingPermissions || isLoadingStatus ? (
                'Loading...'
              ) : (
                <ul>
                  {members
                    .filter((member) =>
                      member.fullName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((member, idx) => (
                      <li
                        key={idx}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleMemberClick(member)}>
                        <span className="font-semibold">{member.fullName}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          {member.email}
                        </span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-2 md:mt-0">
            <Button
              onClick={handleAddMembers}
              className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]"
              variant="secondary"
              disabled={isInviteLoading}>
              <Icon name={'addProjectGreen'} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationModal;
