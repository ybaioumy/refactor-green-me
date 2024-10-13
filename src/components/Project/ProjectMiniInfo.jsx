import React from 'react';
import { useSelector } from 'react-redux';
import ProjectImage from '../../assets/images/Ellipse.png';
import { getTimeAgo } from '../../utilits/helpers';
import { useGetAllCategoriesWithCrietriaQuery } from '../../redux/features/eligibility';
// Item component to display read-only inputs with labels
const Item = ({ label, children }) => {
  return (
    <div className="flex flex-col gap-1 flex-1">
      <label className="font-semibold">{label}</label>
      <div className="outline-none px-4 py-2 text-[14px] text-[#8e8e8e] font-[400] rounded-[7px] bg-[#e6e6e6] w-full">
        {children || 'Not Available'}
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
  const {
    data: categories,
    isLoading: isLoadingCategory,
    error: errorCategory,
  } = useGetAllCategoriesWithCrietriaQuery();
  const selectedCategory =
    categories?.find((cat) => cat?.id === projectObject?.categoryId)?.name ||
    '';
  if (!projectObject) return null;
  return (
    <div className="md:p-2 lg:px-4 flex flex-col gap-2  transition-all duration-200 ">
      {/* Project Image and Title */}
      <div className="flex items-center gap-2">
        <img
          src={ProjectImage}
          alt="Project Icon"
          className="w-24 h-w-24 rounded-full object-cover"
        />
        <div className="text-xl font-bold line-clamp-3">
          {projectObject?.projectName}
        </div>
      </div>

      {/* Project Details using Item component */}
      <div className="flex flex-col gap-1 flex-1">
        <label className="font-semibold">Projet ID</label>
        <div className="outline-none px-4 py-2 text-[14px]  font-[400] rounded-[7px] bg-red-200 text-red-500 w-full">
          {projectObject.id || 'Not Available'}
        </div>
      </div>

      <Item label="Project Owner">{projectObject?.projectOwner}</Item>

      <Item label="Last Update">{getTimeAgo(projectObject?.lastUpdate)}</Item>

      <Item label="Key Person">{projectObject?.keyPerson}</Item>

      <Item label="Email">{projectObject?.email}</Item>

      <Item label="Status">
        <div className="flex items-center gap-2">
          {projectObject?.status || 'Pending Status'}
          <span className="text-red-500">⚠️</span>
        </div>
      </Item>

      <Item label="Submitted By">{projectObject?.submittedBy}</Item>

      <Item label="Assigned to Bank">{projectObject?.assignedToBank}</Item>

      <Item label="Eligibility">{projectObject?.eligibility}</Item>

      <Item label="Project Type">
        {projectObject?.projectType || selectedCategory}
      </Item>
    </div>
  );
};

export default ProjectInfo;
