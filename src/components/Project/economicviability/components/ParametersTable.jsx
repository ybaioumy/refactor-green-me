import React from 'react';
import { Table } from 'antd';

function ParametersTable() {
    const columns = [
        {
            title: 'Project Parameters',
            dataIndex: 'parameter',
            key: 'parameter',
            width:'30%'
        },
        {
            title: '',
            dataIndex: 'value',
            key: 'value',
        },
    ];
    const data = [
        {
            parameter: 'Baseline Energy Consumption',
            value: 183886,
        },
        {
            parameter: '% Savings',
            value: 25,
        },
        {
            parameter: 'Annual Cost Savings',
            value: 183886,
        },
        {
            parameter: 'Total Investment In ECMS',
            value: 626771,
        },
        {
            parameter: 'Years ESCO Contract, Years',
            value: 7,
        },
        {
            parameter: 'Annual inflation %',
            value: 10,
        },
        {
            parameter: 'Annual M&V costs',
            value: 5518,
        },
        {
            parameter: 'Annual O&M costs',
            value: 12201,
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered={true}
            scroll={{ x: "max-content" }}
        />
    )
}

export default ParametersTable