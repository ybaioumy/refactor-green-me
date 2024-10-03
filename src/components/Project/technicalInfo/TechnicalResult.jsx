import React from 'react';
import successAnimation from '../../../assets/animations/Animation-success.json';
import Lottie from 'react-lottie';
import { useGetProjectImpactViabilityQuery } from '../../../redux/features/project';
import Loader from '../../shared/Loader';
import { Result } from 'antd';
import Button from '../../shared/Button';
import { useStep } from '../../../context/formContext';
const ViabilityStatus = ({ id }) => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    // rendererSettings: {
    //   preserveAspectRatio: 'xMidYMid slice',
    // },
  };
  const { data, isLoading, error, isError } =
    useGetProjectImpactViabilityQuery(id);
  const { setCurrentChildIndex } = useStep();
  if (isLoading) return <Loader />;
  if (isError)
    return (
      <>
        <Result
          status="error"
          title="Submission Failed"
          subTitle={`Please check and modify the following information before resubmitting: ${error.message} `}
          extra={[
            <Button variant="secondary" onClick={() => setCurrentChildIndex(0)}>
              Go Agin
            </Button>,
          ]}
        />
      </>
    );
  if (!data) return null;
  return (
    <div className="flex w-full items-center justify-between sm:flex-col md:flex-row">
      {/* <ProjectInfo /> */}
      <ProjectMetrics metrics={data} />
      {data?.isViable ? (
        <div className="flex flex-col items-center md:px-[20px]">
          <Lottie options={defaultOptions} height={200} width={200} />
          <p className="text-[#1E4A28] font-bold text-[26px]">Viable</p>
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
          <p className="text-[#1E4A28] font-bold text-[26px]">Not Viable</p>
        </div>
      )}
    </div>
  );
};

export default ViabilityStatus;

const ProjectMetrics = ({ metrics }) => {
  if (!metrics) return null;
  const Item = ({ label, value, unit }) => {
    return (
      <div className="w-full">
        <p className="text-[#1E4A28] abel text-[15px] font-[700]">{label}</p>
        <div className="w-full flex text-[#1e4a28] text-[17px] font-[600] justify-start gap-2 px-2 flex-row items-center rounded-[15px] border border-dotted border-[#1e4a28] h-[50px] bg-[#BFE0C6]">
          {/* Metric value */}
          <p className="text-[#1e4a28] text-[20px] font-[700] mr-auto">
            {value || 'NA'}
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
    <div className="flex flex-col gap-10 w-[60%] border-r border-black pr-6 md:px-6 h-full ">
      <Item label="Energy Yield" value={metrics.energyYield} unit="GWh/year" />
      <Item
        label="Energy Saved"
        value={metrics.totalEnergySaved}
        unit="GWh/year"
      />
      <Item
        label="Emissions Avoided"
        value={metrics.emissionsAvoided}
        unit="tCO2eq/year"
      />
      <Item
        label="Monetary Savings"
        value={metrics.monetarySavings}
        unit="tCO2eq/year"
      />
      <Item
        label="Expected Income"
        value={metrics.expectedIncome}
        unit="$/year"
      />
    </div>
  );
};
