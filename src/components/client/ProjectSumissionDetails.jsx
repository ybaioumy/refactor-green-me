import React, { useEffect, useState } from 'react';
import Select from '../shared/Select';
import EmptyList from '../shared/EmptyList';
import SkeltonLoader from '../shared/SkeltonLoader';

const ProjectSubmissionDetails = ({ data, isLoading, isError }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (data && data?.length > 0) {
      setSelectedProject(data[0]);
    }
  }, [data]);

  const handleSelectChange = (selectedOption) => {
    setSelectedProject(selectedOption);
  };
  if (isLoading) return <SkeltonLoader />;
  if (isError) return <EmptyList message={'Some thing went wrong'} />;
  return (
    <div className="flex flex-col  md:flex-row justify-start flex-1 w-full md:w-full lg:w-1/2 bg-[#F3F3F3] p-4 md:p-6 gap-6 md:gap-10 rounded-lg shadow">
      <div className="flex flex-col gap-5 w-full md:w-1/2">
        <div className="max-w-[100%] md:max-w-[300px]">
          <Select
            options={data?.data}
            onChange={handleSelectChange}
            value={selectedProject?.id || null}
            placeholder="Select a project"
            disabled={isLoading}
          />
        </div>
        <ProjectPipelineCard totalProjects={data?.data?.length || 0} />
        <div>
          <ProgressBarItem
            label="Pending Documents"
            current={0}
            total={30}
            color="#f10000"
          />
          <ProgressBarItem
            label="LEMCs"
            current={0}
            total={64}
            color="#286b2f"
          />
          <ProgressBarItem
            label="Economic Viability"
            current={0}
            total={4}
            color="#009af1"
          />
          <ProgressBarItem
            label="Investment Indicators"
            current={0}
            total={4}
            color="#f19100"
          />
        </div>
      </div>
      <div className="w-full">
        <label className="block text-[#1E4A28] text-[16px] md:text-[18px] lg:text-[24px] mb-2 font-bold">
          Project Submission Status / Actions Needed
        </label>
        <div
          className="max-h-[calc(100%-50px)] overflow-y-scroll md:p-2 border-t border-black h-[250px] md:h-[450px]"
          role="region"
          aria-label="Project submission status and actions needed">
          {/* {selectedProject.flagsCount.map((item) => (
            <div
              className="rounded mb-2 bg-white p-2 h-[100px] md:h-[300px]"
              key={item.id}
              style={{
                borderLeft: `4px solid ${
                  item.status === 'complete' ? '#54A967' : '#EF4848'
                }`,
              }}
              role="article"
              aria-labelledby={`status-${item.id}`}
            >
              <p id={`status-${item.id}`}>Status: {item.status}</p>
              <p>Date: {item.date}</p>
            </div>
          ))} */}
          <EmptyList message={'No History Found'} />
        </div>
      </div>
    </div>
  );
};

export default ProjectSubmissionDetails;

const ProjectPipelineCard = ({ totalProjects }) => {
  return (
    <div className="bg-[#1e4a28] rounded-lg p-4 shadow-md flex items-center relative overflow-hidden max-w-[100%] md:max-w-[300px]">
      <div className="flex-grow">
        <div className="flex items-end justify-end w-full">
          <div className="flex-shrink-0 absolute -left-10 -top-[50px] rotate-90">
            <SVG />
          </div>
          <div className="flex justify-end flex-col items-center w-1/2 md:w-1/3 ">
            <div className="text-[#1e4a28] text-4xl font-bold rounded-full bg-white w-[50px] h-[50px] text-center">
              <p className="leading-normal">{totalProjects}</p>
            </div>
            <div className="text-white text-md">Projects Pipeline</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgressBarItem = ({ label, current, total, color }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-1 max-w-full md:max-w-[300px]">
      <div className="flex flex-col justify-between text-[#7a7a7a] mb-1">
        <span>{label}</span>
        <span className={`text-[14px]`}>
          <span style={{ color: color }}>{current}</span>/{total}
        </span>
      </div>
      <div className="w-full bg-[#e6e6e6] rounded-full h-2.5">
        <div
          className="h-2.5 rounded-full"
          style={{
            width: `${percentage}%`,
            background: color,
            transition: 'width 0.5s ease-in-out',
          }}></div>
      </div>
    </div>
  );
};

const SVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="200"
    height="200"
    viewBox="0 0 24 24"
    version="1.1">
    <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Shape" transform="translate(-288.000000, -48.000000)">
        <g id="triangle_fill" transform="translate(288.000000, 48.000000)">
          <path
            d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
            id="MingCute"
            fillRule="nonzero"></path>
          <path
            d="M10.7009,3.14771 C11.2783,2.14771 12.7217,2.1477 13.299,3.1477 L21.933,18.1022 C22.5103,19.1022 21.7887,20.3522 20.634,20.3522 L3.36601,20.3522 C2.21131,20.3522 1.48962,19.1022 2.06697,18.1022 L10.7009,3.14771 Z"
            id="路径"
            fill="#7da782"></path>
        </g>
      </g>
    </g>
  </svg>
);
