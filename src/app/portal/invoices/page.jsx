'use client';

import React, {useState} from 'react';
import {Table, Tag, Button, Modal, Form, Upload, message, Descriptions, Spin} from 'antd';
import {UploadOutlined, EyeOutlined, InboxOutlined} from '@ant-design/icons';
import {useStudentInvoices, useUpdateInvoicePayment} from "@/hooks/useInvoices";
import {uploadFile} from "@/util/upload";
import moment from "moment/moment";

const StudentInvoice = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [form] = Form.useForm();

    const studentId = "user_2qFEXIj6bQcfU40oNBTKcNXt6iD";

    const {data: invoices = [], isLoading, error} = useStudentInvoices(studentId);
    const useUpdateInvoicePaymentMutation = useUpdateInvoicePayment();
    console.log(invoices);

    const columns = [
        {
            title: 'Invoice ID',
            dataIndex: 'invoiceId',
            key: 'invoiceId',
            responsive: ['md']
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject'
        },
        {
            title: 'Tutor',
            dataIndex: 'Session.tutor.firstName',
            key: 'tutor',
            render: (text, record) => `${record.Session.tutor.firstName} ${record.Session.tutor.lastName}`,
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'date',
            render: (date) => moment(date).format('YYYY-MM-DD'),
        },
        {
            title: 'Amount',
            dataIndex: 'totalAmount',
            key: 'amount',
            render: (amount) => `Rs. ${amount}`
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color;
                if (status === 'PENDING'){
                    color = 'blue'
                } else if(status === 'PAID') {
                    color = 'yellow';
                } else if (status === 'APPROVED') {
                    color = 'green';
                } else if (status === 'REJECTED') {
                    color = 'red'
                }
                return (
                <Tag color={color} key={status}>
                    {status.toUpperCase()}
                </Tag>
                )
            }
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (invoice) => (
                <>
                    {invoice.status === 'PENDING' || invoice.status === 'REJECTED' ? (
                        <Button
                            icon={<UploadOutlined/>}
                            type="link"
                            onClick={() => handleUploadClick(invoice)}
                        >
                            Upload Receipt
                        </Button>
                    ) : (
                        <Button
                            icon={<EyeOutlined/>}
                            type="link"
                            onClick={() => window.open(invoice.paymentReceiptUrl, "_blank")}
                        >
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

    const handleFormSubmit = async (values) => {
        try {
            const {paymentSlip} = values;

            if (paymentSlip && paymentSlip.fileList.length > 0) {
                const file = paymentSlip.fileList[0].originFileObj;

                const paymentReceiptUrl = await uploadFile(file, 'invoices');

                await useUpdateInvoicePaymentMutation.mutateAsync({
                    invoiceId: selectedInvoice.invoiceId,
                    data: {status: "PAID", paymentReceiptUrl: paymentReceiptUrl}
                });

                console.log('Uploaded invoices url: ', paymentReceiptUrl);
                message.success('Payment slip uploaded successfully!');
            } else {
                message.error('Please upload a payment slip!');
            }
            setIsModalVisible(false);
            form.resetFields();
        } catch (err) {
            message.error('Failed to upload payment slip: ' + error.message);
        }

        // console.log('Uploaded Data:', values, 'Invoice:', selectedInvoice);
    };

    if (error) {
        return <div>Error fetching invoices: {error.message}</div>
    }

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4">
            <h1 className="hidden md:block text-lg font-semibold mb-4">My Invoices</h1>
            {isLoading ? (
                <Spin style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    width: "100vw",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    backgroundColor: "transparent",
                    zIndex: 9999
                }} size="large"/>
            ) : (
                <Table
                    columns={columns}
                    dataSource={invoices}
                    rowKey="id"
                    bordered
                    pagination={{pageSize: 5}}
                />
            )}
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
                            {selectedInvoice?.Session?.tutor?.Tutor?.bankDetails?.bank}
                        </Descriptions.Item>
                        <Descriptions.Item label="Account Holder">
                            {selectedInvoice?.Session?.tutor?.Tutor?.bankDetails?.holderName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Account Number">
                            {selectedInvoice?.Session?.tutor?.Tutor?.bankDetails?.accountNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="Branch">
                            {selectedInvoice?.Session?.tutor?.Tutor?.bankDetails?.branch}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
                <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                    <Form.Item
                        name="paymentSlip"
                        label="Upload Payment Slip"
                        valuePropName="file"
                        rules={[{required: true, message: 'Please upload a payment slip!'}]}
                    >
                        <Upload.Dragger
                            name="files"
                            accept="image/*,application/pdf"
                            maxCount={1}
                            beforeUpload={() => false}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined/>
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


