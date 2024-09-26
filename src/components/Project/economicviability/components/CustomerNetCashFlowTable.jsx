import React from 'react';
import { Table } from 'antd';

const CustomerNetCashFlowTable = () => {
  const columns = [
    {
      title: <p className='text-[#1E4A28] font-[700] text-[15px]'>Client Net Cash-flow (USD $)</p>,
      dataIndex: 'netCashFlow',
      key: 'netCashFlow',
      render: (text) => <p className='text-[#1E4A28] text-[13px] abel font-[400]'>{text}</p>,
    },
    {
        title: <p className='text-[#1E4A28] font-[700] text-[15px]'>Year O</p>,
        dataIndex: 'yearO',
        key: 'yearO',
        render: (text) => <p className='text-[#1E4A28] text-[13px] abel font-[400]'>{text}</p>
    },
    {
        title: <p className='text-[#1E4A28] font-[700] text-[15px]'>Year 1</p>,
        dataIndex: 'year1',
        key: 'year1',
        render: (text) => <p className='text-[#1E4A28] text-[13px] abel font-[400]'>{text}</p>
    },
    {
        title: <p className='text-[#1E4A28] font-[700] text-[15px]'>Year 2</p>,
        dataIndex: 'year2',
        key: 'year2',
        render: (text) => <p className='text-[#1E4A28] text-[13px] abel font-[400]'>{text}</p>
    },
    {
        title: <p className='text-[#1E4A28] font-[700] text-[15px]'>Year 3</p>,
        dataIndex: 'year3',
        key: 'year3',
        render: (text) => <p className='text-[#1E4A28] text-[13px] abel font-[400]'>{text}</p>
    },
    {
        title: <p className='text-[#1E4A28] font-[700] text-[15px]'>Year (N)</p>,
        dataIndex: 'yearN',
        key: 'yearN',
        render: (text) => <p className='text-[#1E4A28] text-[13px] abel font-[400]'>{text}</p>
    },
    {
        title: <p className='text-[#1E4A28] font-[700] text-[15px]'>Total Years(1 to N)</p>,
        dataIndex: 'totalYears',
        key: 'totalYears',
        render: (text) => <p className='text-[#1E4A28] text-[13px] abel font-[400]'>{text}</p>
    },
  ];

  const data = [
    {
      netCashFlow: 'Investment (CAPEX)',
      yearO: "(626,00)",
      year1: "",
      year2: "",
      year3: "",
      yearN: "",
      totalYears: "",
    },
    {
      netCashFlow: 'Annual Savings on Customer Bill',
      yearO: '',
      year1: "183,886",
      year2: "183,886",
      year3: "183,886",
      yearN: "183,886",
      totalYears: "183,886",
    },
    {
      netCashFlow: '% Savings Accrued to Customer',
      yearO: "",
      year1: "100%",
      year2: "100%",
      year3: "100%",
      yearN: "100%",
      totalYears: "100%",
    },
    {
      netCashFlow: 'Customer Savings as % Total Savings',
      yearO: "",
      year1: "183,886",
      year2: "183,886",
      year3: "183,886",
      yearN: "183,886",
      totalYears: "183,886",
    },
    {
      netCashFlow: 'OPEX',
      yearO: "",
      year1: "7,392",
      year2: "7,392",
      year3: "7,392",
      yearN: "7,392",
      totalYears: "7,392",
    },
    {
      netCashFlow: 'O&M and M&V fees',
      yearO: "",
      year1: "15,323",
      year2: "15,323",
      year3: "15,323",
      yearN: "15,323",
      totalYears: "15,323",
    },
    {
      netCashFlow: 'Net Cash-flow',
      yearO: "(626,000)",
      year1: "201,938",
      year2: "201,938",
      year3: "201,938",
      yearN: "201,938",
      totalYears: "201,938",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      pagination={false}
      size="small"
      scroll={{ x: "max-content" }}
    />
  );
};

export default CustomerNetCashFlowTable;