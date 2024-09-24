import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';

const uData = [32, 37, 44, 46, 51, 57];
const pData = [12, 28, 22, 32, 32, 32];
const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

function CumulativeGraph() {
  return (
    <div className="flex flex-1 flex-col ">
      <div>
        <label className="block text-[#1E4A28] text-[24px] font-bold">
          Cumulative
        </label>{' '}
        <label className="block text-[#1E4A28] text-[24px]  font-bold">
          Investments/Earnings
        </label>
      </div>

      <div className="flex items-start gap-2 border-y-[2px] border-[#a6a6a6] py-2 w-full h-[300px]">
        <LineChart
          //   height={250}
          //   width={500}
          series={[
            { data: pData, label: 'Portfolio Earning', color: '#54A967' },
            {
              data: uData,
              label: 'Total Portfolio Investments',
              color: '#005bc6',
            },
          ]}
          xAxis={[{ scaleType: 'point', data: xLabels }]}
          slotProps={{ legend: { hidden: true } }}
          yAxis={[{ label: 'USD Millions' }]}
        />
      </div>
      <div className="flex gap-8 mt-2">
        <div className="flex items-center gap-1">
          <div className="w-[25px] h-[3px] bg-[#005bc6]"></div>
          <div>
            <p className="text-[#787878] text-[10px] font-[700] ">
              Total Portfolio{' '}
            </p>
            <p className="text-[#787878] text-[10px] font-[700] ">
              Investments
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-[25px] h-[3px] bg-[#54A967]"></div>
          <div>
            <p className="text-[#787878] text-[10px] font-[700] ">Portfolio</p>
            <p className="text-[#787878] text-[10px] font-[700] ">Earnings</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CumulativeGraph;
