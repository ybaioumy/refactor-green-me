import React from 'react';

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

// ProjectInfo component using the Item component to display data as read-only
const ProjectInfo = ({ data }) => {
  return (
    <div className="md:p-2 lg:p-4 flex flex-col gap-2 ">
      {/* Project Image and Title */}
      <div className="flex items-center gap-2">
        <img
          src="/path-to-project-image"
          alt="Project Icon"
          className="w-12 h-12 rounded-full"
        />
        <div className="text-xl font-bold">{data?.projectName}</div>
      </div>

      {/* Project Details using Item component */}
      <Item label="Project ID">
        <span className="ml-2 bg-red-200 text-red-600 px-2 py-1 rounded">
          {data?.projectId}
        </span>
      </Item>

      <Item label="Project Owner">{data?.projectOwner}</Item>

      <Item label="Last Update">{data?.lastUpdate}</Item>

      <Item label="Key Person">{data?.keyPerson}</Item>

      <Item label="Email">{data?.email}</Item>

      <Item label="Status">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded">
            {data?.status}
          </span>
          <span className="text-red-500">⚠️</span>
        </div>
      </Item>

      <Item label="Submitted By">{data?.submittedBy}</Item>

      <Item label="Assigned to Bank">{data?.assignedToBank}</Item>

      <Item label="Eligibility">{data?.eligibility}</Item>

      <Item label="Project Type">{data?.projectType}</Item>
    </div>
  );
};

export default ProjectInfo;
