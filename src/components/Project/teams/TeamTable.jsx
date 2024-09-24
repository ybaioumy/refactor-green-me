import React, { useState } from 'react';
import { Table } from 'antd';
import { teamsCols } from '../../../utilits/tablesColsDef';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../shared/Button';
import { useTypeId } from '../../../hooks/useCookies';
import AddMembersPopup from './InvitationModal'; // Import the Add Members Popup component

function TeamTable({ label, membersType, data }) {
  const { id } = useParams();
  const userType = useTypeId();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const Header = () => {
    const opertaionToDo = () => {
      switch (membersType) {
        case 'esco':
          return [
            {
              id: 2,
              name: 'add members',
              action: () => setIsPopupVisible(true),
            },
          ];
        case 'expert':
          return [
            {
              id: 3,
              name: 'add members',
              path: `/projects/eligible/${id}/add-members`,
            },
            // {
            //   id: 3,
            //   name: 'add Mission',
            //   path: `/projects/eligible/${id}/add-mission`,
            // },
          ];

        default:
          return null;
      }
    };

    const buttons = opertaionToDo();
    const navigate = useNavigate();
    return (
      <div className="flex justify-between items-center py-2 border-y-[1px] border-[#AAAAAA]">
        <label className="font-bold text-[#1E4A28] text-[20px] mb-2">
          {label || null}
        </label>
        <div className="flex items-center gap-3">
          {buttons?.map((button, idx) => (
            <Button
              className={'shadow capitalize'}
              type={'button'}
              onClick={() => {
                if (button.action) {
                  button.action();
                } else if (button.path) {
                  navigate(button.path, {
                    state: {
                      typeId: button.id,
                      projectId: id,
                      escoId: userType,
                    },
                  }); // Navigate to the path if action is not provided
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

  return (
    <div>
      <Header />
      <Table
        columns={teamsCols}
        dataSource={data}
        bordered={false}
        pagination={false}
        rowKey={'userId'}
        scroll={{ x: 'max-content' }}
      />

      {isPopupVisible && (
        <AddMembersPopup onClose={() => setIsPopupVisible(false)} />
      )}
    </div>
  );
}

export default TeamTable;
