import React, { useState } from 'react';
import Button from '../../shared/Button';
import SkeltonLoader from '../../shared/SkeltonLoader';
import Select from '../../shared/Select';
import SwitchButton from '../../shared/SwitchButton';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { LineChart } from '@mui/x-charts';

const SustainabilityDashboard = ({ data, loading }) => {
  const emissionsData = [
    { label: 'CO2', progress: 336, unit: 'mtCO2e' },
    { label: 'CH4', progress: 1, unit: 'g' },
    { label: 'N2O', progress: 2, unit: 'g' },
    { label: 'SF6', progress: 0, unit: 'kg' },
    { label: 'HFC’s', progress: 0, unit: 'kg' },
    { label: 'PFC’s', progress: 0, unit: 'kg' },
    { label: 'NF3', progress: 0, unit: 'kg' },
    { label: 'Others', progress: 14, unit: 'kg' },
  ];

  const maxProgress = Math.max(
    ...emissionsData.map((emission) => emission.progress)
  );

  return (
    <div className="flex flex-col w-full">
      <DashboardHeader title="Sustainability Dash" subtitle="FUJIRAH Tour" />

      <DashboardContent
        emissionsData={emissionsData}
        maxProgress={maxProgress}
        data={data}
        loading={loading}
      />
    </div>
  );
};

const DashboardHeader = ({ title }) => (
  <div className="flex justify-between rounded-lg mb-2 ml-4">
    <p className="text-[24px] font-bold text-[#1E4A28]">{title}</p>
  </div>
);

const DashboardContent = ({ emissionsData, maxProgress, data, loading }) => {
  const [selectedProject, setSelectProject] = useState(null);
  if (loading) return <SkeltonLoader />;

  return (
    <div className="p-4 bg-[#F3F3F3] rounded-2xl">
      <div className="w-full flex flex-wrap gap-2 justify-between items-end border-b-[1px] border-[#B5B5B5] pb-2 mb-2">
        <Select
          value="Select Facility"
          options={data}
          onChange={(e) => setSelectProject(e.projectName)}
        />

        <p className="text-[#202020] md:text-[25px] ml-2 font-bold">
          {selectedProject || 'Select Project to display details'}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <EmissionsOverview />
        <EmissionsDetails
          emissionsData={emissionsData}
          maxProgress={maxProgress}
        />
      </div>
    </div>
  );
};
const EmissionsOverview = () => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-xl font-bold">Scope 1 Emissions (mtCO₂e)</h2>
    <div className="flex items-center justify-between mt-4 border-y-[1px] border-black py-2">
      <div>
        <div className="text-4xl font-bold">451</div>
        <div className="text-sm text-gray-500">
          Previous period 555 (-18.760%)
        </div>
      </div>
      <div className="text-green-500">
        <i className="fas fa-chart-line"></i>
        <div className="text-sm">
          <svg
            width="66"
            height="59"
            viewBox="0 0 66 59"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M-0.00231934 29.2154C-0.00231934 15.5047 -0.00231934 8.64937 4.75989 4.38842C9.5286 0.130371 17.1924 0.130371 32.5264 0.130371C47.8605 0.130371 55.5275 0.130371 60.2897 4.38842C65.0552 8.65228 65.0552 15.5047 65.0552 29.2154C65.0552 42.926 65.0552 49.7814 60.2897 54.0394C55.5307 58.3004 47.8605 58.3004 32.5264 58.3004C17.1924 58.3004 9.52535 58.3004 4.75989 54.0394C-0.00231934 49.7843 -0.00231934 42.926 -0.00231934 29.2154Z"
              fill="#54A967"
            />
            <path
              d="M59.4231 17.581C59.4231 19.8951 58.395 22.1145 56.5649 23.7508C54.7348 25.3872 52.2527 26.3065 49.6645 26.3065C47.0764 26.3065 44.5942 25.3872 42.7641 23.7508C40.934 22.1145 39.9059 19.8951 39.9059 17.581C39.9059 15.2668 40.934 13.0475 42.7641 11.4111C44.5942 9.77476 47.0764 8.85547 49.6645 8.85547C52.2527 8.85547 54.7348 9.77476 56.5649 11.4111C58.395 13.0475 59.4231 15.2668 59.4231 17.581ZM35.0266 41.5761C34.3795 41.5761 33.759 41.8059 33.3015 42.215C32.844 42.6241 32.5869 43.1789 32.5869 43.7575C32.5869 44.336 32.844 44.8909 33.3015 45.2999C33.759 45.709 34.3795 45.9389 35.0266 45.9389H43.1588C43.8058 45.9389 44.4263 45.709 44.8839 45.2999C45.3414 44.8909 45.5984 44.336 45.5984 43.7575V36.4862C45.5984 35.9077 45.3414 35.3528 44.8839 34.9438C44.4263 34.5347 43.8058 34.3048 43.1588 34.3048C42.5117 34.3048 41.8912 34.5347 41.4337 34.9438C40.9761 35.3528 40.7191 35.9077 40.7191 36.4862V38.4931L34.1711 32.6383C33.1036 31.6845 31.6563 31.1488 30.1473 31.1488C28.6382 31.1488 27.1909 31.6845 26.1235 32.6383L20.9644 37.2512C20.8889 37.3189 20.7991 37.3726 20.7003 37.4093C20.6015 37.4459 20.4956 37.4648 20.3886 37.4648C20.2817 37.4648 20.1758 37.4459 20.077 37.4093C19.9782 37.3726 19.8884 37.3189 19.8129 37.2512L12.354 30.582C11.8916 30.1966 11.2799 29.9869 10.6478 29.9968C10.0158 30.0068 9.41277 30.2358 8.96578 30.6354C8.51879 31.0351 8.26275 31.5743 8.2516 32.1394C8.24045 32.7045 8.47506 33.2515 8.906 33.665L16.3648 40.3342C17.4323 41.2879 18.8796 41.8237 20.3886 41.8237C21.8977 41.8237 23.345 41.2879 24.4124 40.3342L29.5715 35.7213C29.647 35.6536 29.7368 35.5998 29.8356 35.5632C29.9344 35.5265 30.0403 35.5077 30.1473 35.5077C30.2542 35.5077 30.3601 35.5265 30.4589 35.5632C30.5577 35.5998 30.6475 35.6536 30.723 35.7213L37.2678 41.5761H35.0266Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
    <SourceTypes />
  </div>
);

const SourceTypes = () => (
  <div className="mt-4">
    <h3 className="text-sm font-bold">Source Type</h3>
    <SourceType label="Stationary combustion" value="268" />
    <SourceType label="Fugitive emissions" value="113" />
    <SourceType label="Mobile combustion" value="70" />
    <SourceType label="Industrial process" value="0" />
  </div>
);

const SourceType = ({ label, value }) => (
  <div className="flex items-center justify-between mt-2">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);
const SusGraph = () => {
  const [showFilterPerYear, setShowFilterPerYear] = useState(false);
  const uData = [32, 37, 44, 46, 51, 57];
  const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const filters = [
    'Scope1 emissions',
    'Scope1 emissions by source',
    'Scope1 emissions by source (Line chart)',
  ];
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              className="text-[#1E4A28] font-semibold md:w-1/4 truncate bg-slate-100 rounded-md p-2 focus:outline"
              key={Math.random()}>
              {filter}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <SwitchButton
            handleChange={() => setShowFilterPerYear((prev) => !prev)}
            isChecked={showFilterPerYear}
          />
          <span className="text-[#1E4A28] text-[14px]">
            Show comparison by year {showFilterPerYear ? 'On' : 'Off'}
          </span>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <LineChart
          height={250}
          series={[
            {
              data: uData,
              color: '#54A967',
            },
          ]}
          xAxis={[
            {
              scaleType: 'point',
              data: xLabels,
            },
          ]}
          slotProps={{ legend: { hidden: true } }}
          yAxis={[
            {
              label: 'Emissions (mt CO2e)',
              labelStyle: { fontWeight: 700, fontSize: 14, fill: '#1E4A28' },
            },
          ]}
          grid={{ horizontal: true }}
          sx={(theme) => ({
            [`.${axisClasses.root}`]: {
              [`.${axisClasses.tickLabel}`]: {
                fill: '#1E4A28',
              },
            },
          })}
        />
      </div>
      {showFilterPerYear ? (
        <div className="flex justify-between items-center transition-opacity duration-500 ease-in-out opacity-100 gap-10">
          {/* Years data from api*/}
          <Select options={[]} onChange={(e) => console.log(e)} />

          <div className="flex items-center justify-between gap-2 w-full flex-wrap">
            <Button
              hasIcon
              iconPosition="left"
              iconName={'chev-left'}
              variant="secondary"
              className={'w-[30px]'}
            />
            <p className="text-[#1E4A28] font-semibold">Chart Period</p>
            <Button
              hasIcon
              iconPosition="right"
              iconName={'chev-right'}
              variant="secondary"
              className={'w-[30px]'}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
const EmissionsDetails = ({ emissionsData, maxProgress }) => (
  <div className="col-span-2">
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-lg p-2 max-h-fit">
        <SusGraph />
      </div>
      <div className="p-4 bg-white rounded-lg">
        <h2 className="text-[#1E4A28] text-[18px] mb-4 font-bold">
          Greenhouse emissions
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {/* {emissionsData.map((emission, index) => (
            <ProgressBar
              key={index}
              progress={emission.progress}
              maxProgress={maxProgress}
              label={emission.label}
              unit={emission.unit}
            />
          ))} */}
        </div>
      </div>
    </div>
  </div>
);

export default SustainabilityDashboard;
