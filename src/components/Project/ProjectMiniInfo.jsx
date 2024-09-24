import React from 'react';
import { useSelector } from 'react-redux';
import ProjectImage from '../../assets/images/Ellipse.png';
// Item component to display read-only inputs with labels
const Item = ({ label, children }) => {
  return (
    <div className="flex flex-col gap-1 flex-1">
      <label className="font-semibold">{label}</label>
      <div className="outline-none px-4 py-2 text-[14px] text-[#8e8e8e] font-[400] rounded-[7px] bg-[#e6e6e6] w-full">
        {children}
      </div>
    </div>
  );
};

const Badge = (type) => {
  const sourse = () => {
    switch (type) {
      case 1:
        return '../../../assets/images/Ellipse.png';
      default:
        return '../../../assets/images/Ellipse.png';
    }
  };
};
// ProjectInfo component using the Item component to display projectObject as read-only
const ProjectInfo = () => {
  const { projectObject } = useSelector((state) => state.project);
  return (
    <div className="md:p-2 lg:px-4 flex flex-col gap-2  transition-all duration-200 ">
      {/* Project Image and Title */}
      <div className="flex items-center gap-2">
        <img
          src={ProjectImage}
          alt="Project Icon"
          className="w-24 h-w-24 rounded-full object-cover"
        />
        <div className="text-xl font-bold">{projectObject?.projectName}</div>
      </div>

      {/* Project Details using Item component */}
      <Item label="Project ID">
        <span className="ml-2 bg-red-200 text-red-600 px-2 py-1 rounded">
          {projectObject?.projectId}
        </span>
      </Item>

      <Item label="Project Owner">{projectObject?.projectOwner}</Item>

      <Item label="Last Update">{projectObject?.lastUpdate}</Item>

      <Item label="Key Person">{projectObject?.keyPerson}</Item>

      <Item label="Email">{projectObject?.email}</Item>

      <Item label="Status">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded">
            {projectObject?.status}
          </span>
          <span className="text-red-500">⚠️</span>
        </div>
      </Item>

      <Item label="Submitted By">{projectObject?.submittedBy}</Item>

      <Item label="Assigned to Bank">{projectObject?.assignedToBank}</Item>

      <Item label="Eligibility">{projectObject?.eligibility}</Item>

      <Item label="Project Type">{projectObject?.projectType}</Item>
    </div>
  );
};

export default ProjectInfo;
