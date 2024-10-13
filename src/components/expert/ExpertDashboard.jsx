import React, { useEffect, useState } from 'react';
import ProjectTable from '../shared/Table';
import { useGetExpertAssignedProjectsQuery } from '../../redux/features/expert';
import { useNavigate } from 'react-router-dom';
import Loader from '../shared/Loader';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';
import EmptyList from '../shared/EmptyList';

function ExpertDashboard() {
  const { invitationToken } = useSelector((state) => state.invitation);
  const searchObject = useSelector((state) => state.search);

  const navigate = useNavigate();

  const {
    data: expertProjects,
    isLoading,
    isError,
    error,
  } = useGetExpertAssignedProjectsQuery(searchObject);

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (invitationToken) {
      setIsModalVisible(true);
    }
  }, [invitationToken]);

  const handleAccept = () => {
    navigate(`/join-project`);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    // Prevent closing the modal by doing nothing or provide feedback
    // Optionally, you could show a message or something
  };

  if (isLoading) return <Loader />;
  if (isError) return <EmptyList message={'No data to show'} />;
  return (
    <div className="relative">
      <ProjectTable data={expertProjects} />

      <Modal
        width={640}
        title="Attention Required: Project Invitaion"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <button key="accept" onClick={handleAccept}>
            View Invitaion Details
          </button>,
        ]}
        closable={false}>
        <p>You have been Invited to project, Click to handle this invitation</p>
      </Modal>
    </div>
  );
}

export default ExpertDashboard;
