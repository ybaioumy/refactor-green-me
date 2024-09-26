import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function VerticalBarChart() {
  const data = {
    labels: ['Y1', 'Y2', 'Y3', 'Y4', 'Y5', 'Y6', 'Y7', 'Y8', 'Y9', 'Y10'],
    datasets: [
      {
        label: 'Cash Outflows',
        data: [0, 1, 2, 3, 4, 4, 6, 7, 9, 12],
        backgroundColor: '#ADD312',
        barThickness: 10,
        order: 3,
      },
      {
        label: 'Cash Inflows',
        data: [-9, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#EA9251',
        barThickness: 10,
        order: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom', // Use 'as const' to explicitly set the type
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 12 },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Net Cash Flow (Millions AED)',
        },
        suggestedMin: -25,
        suggestedMax: 25,
      },
    },
  };

  return (
    <>
      <Bar width="900" height="600" data={data} options={options} />
    </>
  );
}

export default VerticalBarChart;
