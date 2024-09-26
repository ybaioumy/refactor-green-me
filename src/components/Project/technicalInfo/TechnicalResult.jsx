import React from 'react';
import ProjectInfo from '../ProjectMiniInfo';

const ViabilityStatus = ({ data }) => {
  return (
    <div className="flex w-full items-center justify-between sm:flex-col md:flex-row">
      {/* <ProjectInfo /> */}
      <ProjectMetrics metrics={data} />
      {!data.isViable ? (
        <div className="flex flex-col items-center px-[20px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="150"
            height="214"
            viewBox="0 0 214 214"
            fill="none">
            <path
              d="M88.152 123.443L63.8773 104.058L43.9841 128.939L93.9923 168.919L170.855 65.7341L145.304 46.7331L88.152 123.443Z"
              fill="#54A967"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M213.735 106.868C213.735 165.889 165.889 213.735 106.868 213.735C47.8462 213.735 0 165.889 0 106.868C0 47.8462 47.8462 0 106.868 0C165.889 0 213.735 47.8462 213.735 106.868ZM195.696 106.868C195.696 155.926 155.926 195.696 106.868 195.696C57.8089 195.696 18.039 155.926 18.039 106.868C18.039 57.8089 57.8089 18.039 106.868 18.039C155.926 18.039 195.696 57.8089 195.696 106.868Z"
              fill="#54A967"
            />
          </svg>
          <p>Viable</p>
        </div>
      ) : (
        <div className="flex flex-col items-center px-[20px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="150"
            height="214"
            viewBox="0 0 214 214"
            fill="none">
            <path
              d="M58.4163 81.0956L80.8351 58.6768L106.951 84.7924L133.327 58.4163L155.745 80.8351L129.369 107.211L155.435 133.277L133.017 155.696L106.951 129.63L81.145 155.435L58.7262 133.017L84.5318 107.211L58.4163 81.0956Z"
              fill="#EF4848"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M106.868 213.735C165.889 213.735 213.735 165.889 213.735 106.868C213.735 47.8462 165.889 0 106.868 0C47.8462 0 0 47.8462 0 106.868C0 165.889 47.8462 213.735 106.868 213.735ZM106.868 195.696C155.926 195.696 195.696 155.926 195.696 106.868C195.696 57.8089 155.926 18.039 106.868 18.039C57.8089 18.039 18.039 57.8089 18.039 106.868C18.039 155.926 57.8089 195.696 106.868 195.696Z"
              fill="#EF4848"
            />
          </svg>
          <p>Not Viable</p>
        </div>
      )}
    </div>
  );
};

export default ViabilityStatus;

const ProjectMetrics = ({ metrics }) => {
  const Item = ({ label, value, unit }) => {
    return (
      <div className="w-full">
        <p className="text-[#1E4A28] abel text-[15px] font-[700]">{label}</p>
        <div className="w-full flex text-[#1e4a28] text-[17px] font-[600] justify-start gap-2 px-2 flex-row items-center rounded-[15px] border border-dotted border-[#1e4a28] h-[50px] bg-[#BFE0C6]">
          {/* Metric value */}
          <p className="text-[#1e4a28] text-[20px] font-[700] mr-auto">
            {value}
          </p>
          {/* Metric unit */}
          <p className="border-l border-[#000000] pl-2 text-[#1e4a28] text-[14px] font-[400]">
            {unit}
          </p>
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-10 w-[60%] border-r border-black px-6 h-full ">
      <Item label="Energy Yield" value="123" unit="GWh/year" />
      <Item label="Energy Saved" value="123" unit="GWh/year" />
      <Item label="Emissions Avoided" value="123" unit="tCO2eq/year" />
      <Item label="Monetary Savings" value="123" unit="tCO2eq/year" />
      <Item label="Expected Income" value="123" unit="$/year" />
    </div>
  );
};
