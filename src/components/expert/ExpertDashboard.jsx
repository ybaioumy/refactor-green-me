import React, { useEffect, useState } from 'react';
import ProjectTable from '../shared/Table';
import { useGetExpertAssignedProjectsQuery } from '../../redux/features/expert';
import Sidebar from './components/SideBar';
import { useNavigate } from 'react-router-dom';
import Loader from '../shared/Loader';
import { useSelector } from 'react-redux';
import { Modal } from 'antd'; // Import Modal from antd

function ExpertDashboard() {
  const { invitationToken } = useSelector((state) => state.invitation);
  const searchObject = useSelector((state) => state.search);

  const navigate = useNavigate();
  const [isToggled, setIsToggled] = useState(false);

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
    setIsModalVisible(false); // Close the modal
  };

  const handleCancel = () => {
    // Prevent closing the modal by doing nothing or provide feedback
    // Optionally, you could show a message or something
  };

  const expertTabs = [
    {
      name: 'Expert Details',
      icon: 'details',
      link: `/profile`,
    },
    {
      name: 'Assigned Projects',
      icon: 'settings',
      link: `/`,
    },
    {
      name: 'Missions / Work',
      icon: 'progress',
      link: `/assigned-missions`,
    },
  ];

  if (isLoading) return <Loader />;

  return (
    <div className="relative">
      <Sidebar
        tabs={expertTabs}
        isToggled={isToggled}
        setIsToggled={setIsToggled}
      />

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
