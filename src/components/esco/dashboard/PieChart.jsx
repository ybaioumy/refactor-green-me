import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);

const DoughnutGraph = ({ data }) => {
  const options = {
    layout: {
      padding: 5,
    },
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const myPlugin = {
    id: 'myPlugin',
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      const xCoor =
        chart.chartArea.left +
        (chart.chartArea.right - chart.chartArea.left) / 2;
      const yCoor =
        chart.chartArea.top +
        (chart.chartArea.bottom - chart.chartArea.top) / 2.4;
      ctx.save();
      ctx.font = '700 24px Abel';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${data.text}`, xCoor, yCoor);
      ctx.restore();
      const yCoor2 =
        chart.chartArea.top +
        (chart.chartArea.bottom - chart.chartArea.top) / 1.8;
      ctx.save();
      ctx.font = '400 17px Abel';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${data.text2}`, xCoor, yCoor2);
      ctx.restore();
      const yCoor3 =
        chart.chartArea.top +
        (chart.chartArea.bottom - chart.chartArea.top) / 1.5;
      ctx.save();
      ctx.font = '400 17px Abel';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${data.text3}`, xCoor, yCoor3);
      ctx.restore();
    },
  };

  const chartData = {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      borderWidth: 0,
    })),
  };

  return (
    <div className="flex justify-center">
      <div className="w-[180px] h-[180px] ">
        <Doughnut data={chartData} plugins={[myPlugin]} options={options} />
      </div>
    </div>
  );
};

const DisbursedPie = ({ data }) => {
  return (
    <div className="flex-1">
      <Header headline1={data.headline1} headline2={data.headline2} />
      <DoughnutGraph data={data} />
      <Tabs
        tabs={data.tabs}
        backgroundColors={data.datasets[0].backgroundColor}
      />
    </div>
  );
};

const Header = ({ headline1, headline2 }) => (
  <div className="flex flex-col items-center border-b-2 border-[#a6a6a6] text-center">
    <p className=" text-[#1E4A28] text-xl lg:text-2xl font-bold mb-2 line-clamp-2 max-w-[70%]">
      {headline1}
    </p>
    {/* <label className="block text-[#1E4A28] text-xl lg:text-2xl font-bold mb-2">
      {headline2}
    </label> */}
  </div>
);

const Tabs = ({ tabs, backgroundColors }) => (
  <div className="flex flex-col gap-1 mt-4">
    {tabs.map((tab, i) => (
      <Tab key={i} label={tab} backgroundColor={backgroundColors[i]} />
    ))}
  </div>
);

const Tab = ({ label, backgroundColor }) => (
  <div
    className="w-full px-2 py-1 rounded-2xl flex items-center justify-between"
    style={{ backgroundColor }}>
    <p className="text-sm lg:text-base abel text-white font-medium truncate">
      {label}
    </p>
    <ArrowIcon />
  </div>
);

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="17"
    viewBox="0 0 15 17"
    fill="none">
    <path
      d="M14.4323 8.70044L0.932253 16.4947L0.932254 0.90621L14.4323 8.70044Z"
      fill="white"
    />
  </svg>
);
export default DisbursedPie;
