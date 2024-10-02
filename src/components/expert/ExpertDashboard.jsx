import React, { useState } from 'react';
import ProjectsListing from '../shared/ProjectListing';
import ProjectTable from '../shared/Table';
import { useGetExpertAssignedProjectsQuery } from '../../redux/features/expert';
import Sidebar from './components/SideBar';
import { useParams } from 'react-router-dom';
import { useGetuserId } from '../../hooks/useCookies';
import Loader from '../shared/Loader';
function ExpertDashboard() {
  const { id } = useParams();
  const [isToggled, setIsToggled] = useState(false);
  const expertId = useGetuserId();
  const {
    data: expertProjects,
    isLoading,
    isError,
    error,
  } = useGetExpertAssignedProjectsQuery();
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
    </div>
  );
}

export default ExpertDashboard;
