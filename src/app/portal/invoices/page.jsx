'use client';

import React, {useState} from 'react';
import {Table, Tag, Button, Modal, Form,Upload, message, Descriptions} from 'antd';
import {UploadOutlined, EyeOutlined, InboxOutlined} from '@ant-design/icons';

const StudentInvoice = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [form] = Form.useForm();

    const invoices = [
        {
            id: '1',
            subject: 'Mathematics',
            tutor: 'Kamal Perera',
            date: '2024-02-15',
            amount: 3000,
            status: 'Pending',
            bankDetails: {
                bank: 'Bank of Ceylon',
                accountNumber: '123456789',
                branch: 'Colombo Main',
                holderName: 'Kamal Perera'
            }
        },
        {
            id: '2',
            subject: 'Physics',
            tutor: 'Amal Perera',
            date: '2024-02-15',
            amount: 4500,
            status: 'Paid',
            bankDetails: {
                bank: 'Commercial Bank',
                accountNumber: '987654321',
                branch: 'Kandy Branch',
                holderName: 'Amal Perera'
            }
        }
    ];

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            responsive: ['md']
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject'
        },
        {
            title: 'Tutor',
            dataIndex: 'tutor',
            key: 'tutor'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => `Rs. ${amount}`
        },
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
        {
            title: 'Actions',
            key: 'actions',
            render: (invoice) => (
                <>
                    {invoice.status === 'Pending' ? (
                        <Button
                            icon={<UploadOutlined />}
                            type="link"
                            onClick={() => handleUploadClick(invoice)}
                        >
                            Upload Receipt
                        </Button>
                    ) : (
                        <Button icon={<EyeOutlined />} type="link">
                            View Receipt
                        </Button>
                    )}
                </>
            )
        }
    ];

    const handleUploadClick = (invoice) => {
        setSelectedInvoice(invoice);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedInvoice(null);
        form.resetFields();
    };

    const handleFormSubmit = (values) => {
        message.success('Payment slip uploaded successfully!');
        setIsModalVisible(false);
        form.resetFields();
        console.log('Uploaded Data:', values, 'Invoice:', selectedInvoice);
    };

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4">
            <h1 className="hidden md:block text-lg font-semibold mb-4">My Invoices</h1>
            <Table
                columns={columns}
                dataSource={invoices}
                rowKey="id"
                bordered
                pagination={{pageSize: 5}}
            />

            <Modal
                title={`Bank Details for ${selectedInvoice?.tutor}`}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={() => form.submit()}
                    >
                        Submit Payment
                    </Button>,
                ]}
            >
                <div className="mb-4">
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Bank">
                                {selectedInvoice?.bankDetails.bank}
                            </Descriptions.Item>
                            <Descriptions.Item label="Account Holder">
                                {selectedInvoice?.bankDetails.holderName}
                            </Descriptions.Item>
                            <Descriptions.Item label="Account Number">
                                {selectedInvoice?.bankDetails.accountNumber}
                            </Descriptions.Item>
                            <Descriptions.Item label="Branch">
                                {selectedInvoice?.bankDetails.branch}
                            </Descriptions.Item>
                        </Descriptions>
                </div>
                <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                    <Form.Item
                        name="paymentSlip"
                        label="Upload Payment Slip"
                        valuePropName="file"
                        rules={[{ required: true, message: 'Please upload a payment slip!' }]}
                    >
                        <Upload.Dragger
                            name="files"
                            accept="image/*,application/pdf"
                            maxCount={1}
                            beforeUpload={() => false}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Click or drag file to this area to upload
                            </p>
                            <p className="ant-upload-hint">
                                Supported formats: JPG, PNG, PDF
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default StudentInvoice;


