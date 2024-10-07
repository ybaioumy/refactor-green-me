import React from 'react';
import Button from '../../shared/Button';
import SkeltonLoader from '../../shared/SkeltonLoader';
import { getTimeAgo } from '../../../utilits/helpers';
const OpportunitiesList = ({ data, loading }) => {
  return (
    <div className="bg-[#F3F3F3] p-2 rounded-2xl shadow w-full relative ">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col w-full border-b border-opacity-50 border-[#000] pb-4">
          <h2 className="text-[24px] font-bold text-[#1E4A28]">
            Opportunities
          </h2>
          <p className="text-[#1E4A28] text-[18px] font-semibold">
            Recently Submitted
          </p>
        </div>
        <span className="absolute bg-[#EC0000] border-4 border-white text-white rounded-full px-4 py-2 text-m -top-5 right-5 shadow-md">
          3
        </span>
      </div>
      <div className="mb-4 flex gap-2">
        <Button
          type="link"
          to={'/projects/opportunities'}
          className={'w-full font-semibold'}>
          See All
        </Button>
      </div>
      <div className="h-[350px] overflow-y-auto">
        {/* {!data && <EmptyList />} */}
        {loading && <SkeltonLoader />}
        {data?.map((item, idx) => (
          <div
            className="p-1 mb-4 border-b border-black border-opacity-50	"
            key={item.id}>
            <h3 className="font-bold text-[20px] text-[#1E4A28]">
              {item.projectName || `Project 0${idx + 1}`}
            </h3>
            <p className="text-md text-[#202020] font-abel">
              <span className="">Submitted On:</span>{' '}
              {getTimeAgo(item.submittedOn || item.lastUpdate)}
            </p>
            <p className="text-md text-[#202020] font-abel">
              <span className="">Last Update:</span>{' '}
              {getTimeAgo(item.lastUpdate)}
            </p>
            <p className="text-md text-[#202020] font-abel">
              Client: Confidential
            </p>
            <p className="text-md text-[#202020] font-abel">
              Finance: Not Allocated
            </p>
            <p className="text-md text-[#202020] font-abel">ESCO: Required</p>
            <Button
              className="mt-2 font-semibold"
              type="link"
              to={'/projects/opportunities/project-details/' + item.id}
              state={item}>
              Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReadyForBundlingList = ({ data, loading }) => {
  // if (!data?.data) return <EmptyList />;
  return (
    <div className="bg-[#D8F99280] p-2 rounded-2xl shadow w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[24px] font-bold text-[#1E4A28] md:w-2/3">
          Ready For Bundling
        </h2>
        <span className="bg-[#EC0000] border-4 border-white text-white rounded-full px-4 py-2 text-m">
          3
        </span>
      </div>
      <div className="mb-4 flex gap-2">
        <Button className="w-full font-semibold">See All</Button>
      </div>
      <div className="overflow-y-auto px-2 h-[400px]">
        {loading && <SkeltonLoader />}

        {data
          ? data?.map((project, index) => (
              <div key={index} className="mb-4 border-b border-black py-3">
                <h3 className="font-semibold text-[#1E4A28]">
                  {project.projectName}
                </h3>
                <p className="text-m text-gray-600">{project.timeAgo}</p>
                <p className="text-m text-gray-600">Client: {project.client}</p>
                <p className="text-m text-gray-600">
                  Finance: {project.finance}
                </p>
                <p className="text-m text-gray-600">ESCO: {project.esco}</p>
                <Button
                  className="mt-2 font-semibold"
                  type="link"
                  to={'/projects/eligible/' + project.id}>
                  Details
                </Button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export { ReadyForBundlingList, OpportunitiesList };
