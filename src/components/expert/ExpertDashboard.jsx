import React, { useEffect, useState } from 'react';
import ProjectsListing from '../shared/ProjectListing';
import ProjectTable from '../shared/Table';
import { useGetExpertAssignedProjectsQuery } from '../../redux/features/expert';
import Sidebar from './components/SideBar';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetuserId } from '../../hooks/useCookies';
import Loader from '../shared/Loader';
import { useSelector } from 'react-redux';
import { Modal } from 'antd'; // Import Modal from antd

function ExpertDashboard() {
  const { invitationToken } = useSelector((state) => state.invitation);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isToggled, setIsToggled] = useState(false);
  const expertId = useGetuserId();
  const {
    data: expertProjects,
    isLoading,
    isError,
    error,
  } = useGetExpertAssignedProjectsQuery();

  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

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
      link: `expert/${id}/details`,
    },
    {
      name: 'Assigned Projects',
      icon: 'settings',
      link: `/`,
    },
    {
      name: 'Missions / Work',
      icon: 'progress',
      link: `expert/${id}/missions`,
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
      <div>
        <ProjectTable data={expertProjects} />
      </div>

      <Modal
        width={640}
        title="Invitation Required"
        visible={isModalVisible}
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
