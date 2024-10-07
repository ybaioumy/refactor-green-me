import React, { useState } from 'react';
import { Table } from 'antd';
import { teamsCols } from '../../../utilits/tablesColsDef';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../shared/Button';
import { useTypeId } from '../../../hooks/useCookies';
import AddMembersPopup from './InvitationModal'; // Import the Add Members Popup component
import { useGetTypesQuery } from '../../../redux/features/auth';
import useGetItemIdByName from '../../../hooks/useGetItemIdByName';
import { useStep } from '../../../context/formContext';
import {
  useGetUserStatusQuery,
  useUpdateProjectUserStatusMutation,
  useUpdateUserStatusMutation,
} from '../../../redux/features/inviteMembers';
function TeamTable({ label, membersType, data, isLoading, refetch }) {
  const { id } = useParams();
  const userType = useTypeId();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const { data: types, isLoading: isLoadingTypes } = useGetTypesQuery();
  const { data: status, isLoading: isLoadingStatus } = useGetUserStatusQuery();
  const [updateProjectUserStatus, { isLoading: isLoadingUpdate }] =
    useUpdateProjectUserStatusMutation();
  const escoId = useGetItemIdByName(types, 'esco');
  const expertId = useGetItemIdByName(types, 'expert');
  const activeId = useGetItemIdByName(status, 'active');
  const inActive = useGetItemIdByName(status, 'Deactive');

  const Header = () => {
    const opertaionToDo = () => {
      switch (membersType) {
        case 'esco':
          return [
            {
              id: escoId,
              name: 'add members',
              action: () => setIsPopupVisible(true),
            },
          ];
        case 'expert':
          return [
            {
              id: expertId,
              name: 'add members',
              path: `/projects/eligible/${id}/add-members`,
            },
          ];

        default:
          return null;
      }
    };

    const buttons = opertaionToDo();
    const navigate = useNavigate();
    const { canEdit } = useStep();

    return (
      <div className="flex justify-between items-center py-2 border-y-[1px] border-[#AAAAAA]">
        <label className="font-bold text-[#1E4A28] text-[20px] mb-2">
          {label || null}
        </label>
        <div className="flex items-center gap-3">
          {canEdit &&
            buttons?.map((button, idx) => (
              <Button
                className={'shadow capitalize'}
                type={'button'}
                onClick={() => {
                  if (button.action) {
                    button.action();
                    setSelectedType(button.id);
                  } else if (button.path) {
                    navigate(button.path, {
                      state: {
                        typeId: button.id,
                        projectId: id,
                        escoId: userType, //esco id
                      },
                    });
                  }
                }}
                hasIcon
                size="sm"
                iconPosition="left"
                iconName={'addProjectGreen'}
                variant="secondary"
                key={idx}>
                <span>{button.name}</span>
              </Button>
            ))}
        </div>
      </div>
    );
  };
  const handleStatusChange = async (userId, isActive) => {
    const newStatus = isActive ? inActive : activeId;
    try {
      await updateProjectUserStatus({
        projectUserId: userId,
        statusId: newStatus,
      }).unwrap();
      refetch();
    } catch (error) {
      // Handle error (e.g., show an error notification)
    }
  };
  return (
    <div>
      <Header />
      <Table
        columns={teamsCols(handleStatusChange, membersType, isLoadingUpdate)}
        dataSource={data}
        bordered={false}
        pagination={false}
        rowKey={'userId'}
        // scroll={{ x: 'max-content' }}
        loading={isLoading || isLoadingStatus || isLoadingTypes}
      />

      {isPopupVisible && (
        <AddMembersPopup
          onClose={() => setIsPopupVisible(false)}
          typeId={selectedType}
        />
      )}
    </div>
  );
}

export default TeamTable;
