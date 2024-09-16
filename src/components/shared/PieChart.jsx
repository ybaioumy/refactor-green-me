import React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const DisbursedPie = ({ data }) => (
  <div className="flex flex-col md:flex-row items-center justify-center mt-10 w-full">
    <div className="w-full  overflow-hidden">
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.value}%`,
            data: data.datasets[0].data.map((value, index) => ({
              id: index,
              value: value,
              label: data.tabs[index],
              color: data.datasets[0].backgroundColor[index],
            })),
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontFamily: 'Abel',
          },
        }}
        slotProps={{ legend: { hidden: true } }}
        width={400}
        height={200}
      />
    </div>
    <Tabs
      tabs={data.tabs}
      backgroundColors={data.datasets[0].backgroundColor}
    />
  </div>
);

const Tabs = ({ tabs, backgroundColors }) => (
  <div className="flex flex-col gap-1 mt-4 w-full">
    {tabs.map((tab, i) => (
      <Tab key={i} label={tab} backgroundColor={backgroundColors[i]} />
    ))}
  </div>
);

const Tab = ({ label, backgroundColor }) => (
  <div
    className="w-full lg:w-64 px-2 py-1 rounded-2xl flex items-center justify-between"
    style={{ backgroundColor }}>
    <p className="text-sm lg:text-base abel text-white font-medium">{label}</p>
  </div>
);

export default DisbursedPie;
