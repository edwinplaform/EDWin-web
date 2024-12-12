'use client';

import React from 'react';
import { Table, Tag } from 'antd';

const TutorPayment = () => {
    const payments = [
        {
            id: '1',
            student: 'John Doe',
            subject: 'Mathematics',
            date: '2024-02-15',
            amount: 3000,
            status: 'Paid'
        },
        {
            id: '2',
            student: 'Jane Smith',
            subject: 'Physics',
            date: '2024-02-15',
            amount: 4000,
            status: 'Pending'
        },
    ];

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            responsive: ['md']
        },
        {
            title: 'Student',
            dataIndex: 'student',
            key: 'student'
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject'
        },
        {
            title:'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => `Rs. ${amount}` },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'Paid' ? 'green' : 'orange'}>
                    {status}
                </Tag>
            )
        },
    ];

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4">
            <h1 className="hidden md:block text-lg font-semibold mb-4">Payment Details</h1>
            <Table
                columns={columns}
                dataSource={payments}
                rowKey="id"
                bordered
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
};

export default TutorPayment;