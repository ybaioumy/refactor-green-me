import React, { useState, useMemo, useCallback } from "react";
import Button from "../../shared/Button";
import Icon from "../../shared/Icon";
import RadioButton from "../../shared/RadioButton";
import {
  useGetMyUsersQuery,
  useGetRolesQuery,
  useGetTypesQuery,
} from "../../../redux/features/auth";
import {
  useGetInvitationStatusQuery,
  useInviteUserMutation,
  useGetUserPermissionsQuery,
} from "../../../redux/features/inviteMembers";
import { useParams } from "react-router-dom";
import { message } from "antd";
import useGetItemIdByName from "../../../hooks/useGetItemIdByName";

const InvitationModal = ({ onClose, typeId }) => {
  const { id } = useParams();
  const { data: members, isLoading } = useGetMyUsersQuery();
  const [inviteUser, { isLoading: isInviteLoading }] = useInviteUserMutation();
  const { data: statusData } = useGetInvitationStatusQuery();
  const { data: permissions } = useGetUserPermissionsQuery();
  const { data: roles } = useGetRolesQuery();
  const { data: types } = useGetTypesQuery();
  const escoId = useGetItemIdByName(types, "esco");
  const expertId = useGetItemIdByName(types, "expert");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isEdit, setIsEdit] = useState(true);
  const [roleId, setRoleId] = useState(null);

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

  const getPermissionsIds = useCallback(
    (type) => {
      return permissions
        ?.filter((permission) => permission.name.endsWith(type))
        ?.map((permission) => permission.id);
    },
    [permissions]
  );

  const viewPermissionsIds = useMemo(
    () => getPermissionsIds("View") || [],
    [getPermissionsIds]
  );

  const editPermissionsIds = useMemo(
    () => getPermissionsIds("Edit") || [],
    [getPermissionsIds]
  );

  const permissionId = useMemo(() => {
    if (typeId === escoId) {
      return []; // No permissions for escoId
    }
    return isEdit ? editPermissionsIds : viewPermissionsIds;
  }, [typeId, escoId, isEdit, editPermissionsIds, viewPermissionsIds]);

  const intialInvitationStatus = useGetItemIdByName(statusData, "pending");
  const userRole = useGetItemIdByName(roles, "user");
  const adminRole = useGetItemIdByName(roles, "admin");
  const emailsArray = selectedMembers.map((member) => member.email);
  const projectIdToSend = Number(id);

  const handleRoleAndPermissionsChange = (isEdit) => {
    if (typeId === escoId) {
      setRoleId(isEdit ? adminRole : userRole);
    } else {
      setRoleId(null);
    }
    setIsEdit(isEdit);
  };

  const invitationData = {
    emails: emailsArray,
    projectId: projectIdToSend,
    typeId: typeId || 2,
    statusId: intialInvitationStatus,
    permissionId: Array.isArray(permissionId) ? permissionId : [],
    ProjectRoleId: roleId || userRole,
    escoId: escoId,
  };

  const handleAddMembers = async () => {
    if (!selectedMembers.length) {
      message.error("Please select at least one user.");
      return;
    }
    try {
      const response = await inviteUser(invitationData).unwrap();
      message.success(
        response.message ||
          `Users with emails ${emailsArray.join(
            ", "
          )} successfully invited to project id ${id}`
      );
      setSelectedMembers([]);
    } catch (error) {
      message.error(
        error.data?.message || "An error occurred while inviting the users."
      );
      onClose();
    }
  };

  const handleEmailKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const email = searchTerm.trim();

      const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!isValidEmail(email)) {
        message.error("Please enter a valid email.");
        return;
      }

      if (email && !selectedMembers.some((m) => m.email === email)) {
        setSelectedMembers([...selectedMembers, { email, fullName: email }]);
        setSearchTerm("");
      } else {
        message.error("Email is already added or invalid.");
      }
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center'>
      <div className='semi-transparent-black rounded-lg w-full max-w-[1000px] p-4 md:p-6 shadow-lg mx-2 sm:mx-4'>
        <div className='flex justify-between items-center text-lg md:text-xl font-semibold mb-4 text-white'>
          <h2 className='text-sm sm:text-lg md:text-xl'>
            Search Members by Name, ID, or Email
          </h2>
          <button type='button' onClick={onClose}>
            ✖
          </button>
        </div>
        <div className='flex flex-col md:flex-row gap-2'>
          <div className='flex flex-col flex-1'>
            {/* Search Input */}
            <div className='relative bg-[#EEEEEE] rounded-lg p-2 flex items-center'>
              <div className='flex-col flex-1'>
                <input
                  type='text'
                  className='w-full bg-transparent rounded-lg px-4 py-2 focus:outline-none'
                  placeholder='Search Members by Name, Email, or Type a New Email'
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleEmailKeyDown}
                />
                <div className='mt-2 flex flex-wrap'>
                  {selectedMembers.map((member, idx) => (
                    <div
                      key={idx}
                      className='bg-white border border-[#D80000] px-3 py-1 rounded-lg mr-2 mb-2 flex items-center'
                    >
                      {member.fullName}
                      <button
                        type='button'
                        onClick={() => handleRemoveMember(member.email)}
                        className='ml-2 text-red-600 font-bold'
                      >
                        ✖
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex justify-between bg-black rounded-lg text-white p-2 mr-2 border border-[#D80000] '>
                <div className='flex items-center gap-2 text-xs sm:text-sm md:text-base'>
                  <RadioButton
                    title={"Set User Permissions to view Only"}
                    label={typeId === escoId ? "User" : "View"}
                    value={false}
                    onChange={(e) => handleRoleAndPermissionsChange(false)}
                    checked={!isEdit}
                  />
                  |
                  <RadioButton
                    title={"Set User Permissions to Edit On Project"}
                    label={typeId === escoId ? "Admin" : "Edit"}
                    value={true}
                    onChange={(e) => handleRoleAndPermissionsChange(true)}
                    checked={isEdit}
                  />
                </div>
              </div>
            </div>

            <div className='bg-gray-100 border border-gray-300 rounded-lg overflow-y-auto h-48 mt-2'>
              {isLoading ? (
                "Loading..."
              ) : (
                <ul>
                  {members
                    ?.filter(
                      (member) =>
                        member.fullName
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        member.email
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                    )
                    ?.map((member, idx) => (
                      <li
                        key={idx}
                        className='p-2 hover:bg-gray-200 cursor-pointer'
                        onClick={() => handleMemberClick(member)}
                      >
                        <span className='font-semibold'>{member.fullName}</span>
                        <span className='text-sm text-gray-500 ml-2'>
                          {member.email}
                        </span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
          <div className='flex justify-center mt-2 md:mt-0'>
            <Button
              onClick={handleAddMembers}
              className='w-[40px] h-[40px] md:w-[60px] md:h-[60px]'
              variant='secondary'
              disabled={isInviteLoading}
            >
              <Icon name={"addProjectGreen"} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationModal;
