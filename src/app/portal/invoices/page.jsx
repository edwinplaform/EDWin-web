// 'use client';
//
// import React, {useState} from 'react';
// import {Table, Tag, Button, Modal, Form, Upload, message, Descriptions, Spin} from 'antd';
// import {UploadOutlined, EyeOutlined, InboxOutlined} from '@ant-design/icons';
// import {useStudentInvoices, useUpdateInvoicePayment} from "@/hooks/useInvoices";
// import {uploadFile} from "@/util/upload";
// import moment from "moment/moment";
// import {useCurrentUser} from "@/util/auth";
//
// const StudentInvoice = () => {
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [selectedInvoice, setSelectedInvoice] = useState(null);
//     const [form] = Form.useForm();
//
//     // const studentId = "user_2qFEXIj6bQcfU40oNBTKcNXt6iD";
//     const user = useCurrentUser();
//     const studentId = user?.id;
//     console.log("-----------studentId: ", studentId);
//
//     const {data: invoices = [], isLoading, error} = useStudentInvoices(studentId);
//     const useUpdateInvoicePaymentMutation = useUpdateInvoicePayment();
//     console.log(invoices);
//
//     const columns = [
//         {
//             title: 'Invoice ID',
//             dataIndex: 'invoiceId',
//             key: 'invoiceId',
//             responsive: ['md']
//         },
//         {
//             title: 'Subject',
//             dataIndex: 'subject',
//             key: 'subject'
//         },
//         {
//             title: 'Tutor',
//             dataIndex: 'Session.tutor.firstName',
//             key: 'tutor',
//             render: (text, record) => `${record.Session.tutor.firstName} ${record.Session.tutor.lastName}`,
//         },
//         {
//             title: 'Date',
//             dataIndex: 'createdAt',
//             key: 'date',
//             render: (date) => moment(date).format('YYYY-MM-DD'),
//         },
//         {
//             title: 'Amount',
//             dataIndex: 'totalAmount',
//             key: 'amount',
//             render: (amount) => `Rs. ${amount}`
//         },
//         {
//             title: 'Status',
//             dataIndex: 'status',
//             key: 'status',
//             render: (status) => {
//                 let color;
//                 if (status === 'PENDING'){
//                     color = 'blue'
//                 } else if(status === 'PAID') {
//                     color = 'yellow';
//                 } else if (status === 'APPROVED') {
//                     color = 'green';
//                 } else if (status === 'REJECTED') {
//                     color = 'red'
//                 }
//                 return (
//                 <Tag color={color} key={status}>
//                     {status.toUpperCase()}
//                 </Tag>
//                 )
//             }
//         },
//         {
//             title: 'Actions',
//             key: 'actions',
//             render: (invoice) => (
//                 <>
//                     {invoice.status === 'PENDING' || invoice.status === 'REJECTED' ? (
//                         <Button
//                             icon={<UploadOutlined/>}
//                             type="link"
//                             onClick={() => handleUploadClick(invoice)}
//                         >
//                             Upload Receipt
//                         </Button>
//                     ) : (
//                         <Button
//                             icon={<EyeOutlined/>}
//                             type="link"
//                             onClick={() => window.open(invoice.paymentReceiptUrl, "_blank")}
//                         >
//                             View Receipt
//                         </Button>
//                     )}
//                 </>
//             )
//         }
//     ];
//
//     const handleUploadClick = (invoice) => {
//         setSelectedInvoice(invoice);
//         setIsModalVisible(true);
//     };
//
//     const handleCancel = () => {
//         setIsModalVisible(false);
//         setSelectedInvoice(null);
//         form.resetFields();
//     };
//
//     const handleFormSubmit = async (values) => {
//         try {
//             const {paymentSlip} = values;
//
//             if (paymentSlip && paymentSlip.fileList.length > 0) {
//                 const file = paymentSlip.fileList[0].originFileObj;
//
//                 const paymentReceiptUrl = await uploadFile(file, 'invoices');
//
//                 await useUpdateInvoicePaymentMutation.mutateAsync({
//                     invoiceId: selectedInvoice.invoiceId,
//                     data: {status: "PAID", paymentReceiptUrl: paymentReceiptUrl}
//                 });
//
//                 console.log('Uploaded invoices url: ', paymentReceiptUrl);
//                 message.success('Payment slip uploaded successfully!');
//             } else {
//                 message.error('Please upload a payment slip!');
//             }
//             setIsModalVisible(false);
//             form.resetFields();
//         } catch (err) {
//             message.error('Failed to upload payment slip: ' + error.message);
//         }
//     };
//
//     if (error) {
//         return <div>Error fetching invoices: {error.message}</div>
//     }
//
//     return (
//         <div className="bg-white p-4 rounded-md flex-1 m-4">
//             <h1 className="hidden md:block text-lg font-semibold mb-4">My Invoices</h1>
//             {isLoading ? (
//                 <Spin style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     height: "100vh",
//                     width: "100vw",
//                     position: "fixed",
//                     top: 0,
//                     left: 0,
//                     backgroundColor: "transparent",
//                     zIndex: 9999
//                 }} size="large"/>
//             ) : (
//                 <Table
//                     columns={columns}
//                     dataSource={invoices}
//                     rowKey="id"
//                     bordered
//                     pagination={{pageSize: 5}}
//                 />
//             )}
//             <Modal
//                 title={`Bank Details for ${selectedInvoice?.tutor}`}
//                 open={isModalVisible}
//                 onCancel={handleCancel}
//                 footer={[
//                     <Button key="cancel" onClick={handleCancel}>
//                         Cancel
//                     </Button>,
//                     <Button
//                         key="submit"
//                         type="primary"
//                         onClick={() => form.submit()}
//                     >
//                         Submit Payment
//                     </Button>,
//                 ]}
//             >
//                 <div className="mb-4">
//                     <Descriptions bordered column={1}>
//                         <Descriptions.Item label="Bank">
//                             {selectedInvoice?.Session?.tutor?.Tutor?.bankDetails?.bank}
//                         </Descriptions.Item>
//                         <Descriptions.Item label="Account Holder">
//                             {selectedInvoice?.Session?.tutor?.Tutor?.bankDetails?.holderName}
//                         </Descriptions.Item>
//                         <Descriptions.Item label="Account Number">
//                             {selectedInvoice?.Session?.tutor?.Tutor?.bankDetails?.accountNumber}
//                         </Descriptions.Item>
//                         <Descriptions.Item label="Branch">
//                             {selectedInvoice?.Session?.tutor?.Tutor?.bankDetails?.branch}
//                         </Descriptions.Item>
//                     </Descriptions>
//                 </div>
//                 <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
//                     <Form.Item
//                         name="paymentSlip"
//                         label="Upload Payment Slip"
//                         valuePropName="file"
//                         rules={[{required: true, message: 'Please upload a payment slip!'}]}
//                     >
//                         <Upload.Dragger
//                             name="files"
//                             accept="image/*,application/pdf"
//                             maxCount={1}
//                             beforeUpload={() => false}
//                         >
//                             <p className="ant-upload-drag-icon">
//                                 <InboxOutlined/>
//                             </p>
//                             <p className="ant-upload-text">
//                                 Click or drag file to this area to upload
//                             </p>
//                             <p className="ant-upload-hint">
//                                 Supported formats: JPG, PNG, PDF
//                             </p>
//                         </Upload.Dragger>
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </div>
//     );
// };
//
// export default StudentInvoice;
//
//

"use client";

import React, { useState } from "react";
import { Table, Tag, Button, Modal, Form, Upload, message, Descriptions, Spin } from "antd";
import { UploadOutlined, EyeOutlined, InboxOutlined } from "@ant-design/icons";
import { useStudentInvoices, useUpdateInvoicePayment } from "@/hooks/useInvoices";
import { uploadFile } from "@/util/upload";
import moment from "moment/moment";
import { useCurrentUser } from "@/util/auth";

const StudentInvoice = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [form] = Form.useForm();

    const user = useCurrentUser();
    const studentId = user?.id;
    console.log("-----------studentId: ", studentId);

    const { data: invoices = [], isLoading, error } = useStudentInvoices(studentId);
    const useUpdateInvoicePaymentMutation = useUpdateInvoicePayment();
    console.log(invoices);

    const columns = [
        {
            title: "Invoice ID",
            dataIndex: "invoiceId",
            key: "invoiceId",
            responsive: ["md"], // Hidden on mobile
        },
        {
            title: "Subject",
            dataIndex: "subject",
            key: "subject",
        },
        {
            title: "Tutor",
            dataIndex: "Session.tutor.firstName",
            key: "tutor",
            render: (text, record) => `${record.Session.tutor.firstName} ${record.Session.tutor.lastName}`,
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            key: "date",
            render: (date) => moment(date).format("YYYY-MM-DD"),
            responsive: ["sm"], // Hidden on extra small screens
        },
        {
            title: "Amount",
            dataIndex: "totalAmount",
            key: "amount",
            render: (amount) => `Rs. ${amount}`,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const statusMap = {
                    PENDING: "blue",
                    PAID: "yellow",
                    APPROVED: "green",
                    REJECTED: "red",
                };
                return <Tag color={statusMap[status]}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (invoice) => (
                <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                    {invoice.status === "PENDING" || invoice.status === "REJECTED" ? (
                        <Button
                            icon={<UploadOutlined />}
                            type="link"
                            onClick={() => handleUploadClick(invoice)}
                            className="w-full sm:w-auto text-blue-500"
                        >
                            Upload
                        </Button>
                    ) : (
                        <Button
                            icon={<EyeOutlined />}
                            type="link"
                            onClick={() => window.open(invoice.paymentReceiptUrl, "_blank")}
                            className="w-full sm:w-auto text-green-500"
                        >
                            View
                        </Button>
                    )}
                </div>
            ),
        },
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
            const { paymentSlip } = values;

            if (paymentSlip && paymentSlip.fileList.length > 0) {
                const file = paymentSlip.fileList[0].originFileObj;
                const paymentReceiptUrl = await uploadFile(file, "invoices");

                await useUpdateInvoicePaymentMutation.mutateAsync({
                    invoiceId: selectedInvoice.invoiceId,
                    data: { status: "PAID", paymentReceiptUrl },
                });

                console.log("Uploaded invoice URL: ", paymentReceiptUrl);
                message.success("Payment slip uploaded successfully!");
            } else {
                message.error("Please upload a payment slip!");
            }
            setIsModalVisible(false);
            form.resetFields();
        } catch (err) {
            message.error(`Failed to upload payment slip: ${err.message}`);
        }
    };

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-md">
                    <h2 className="text-lg font-semibold text-red-600 mb-2">Error</h2>
                    <p className="text-gray-600">{error.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
                    My Invoices
                </h1>

                {isLoading ? (
                    <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
                        <Spin size="large" tip="Loading invoices..." />
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                        <Table
                            columns={columns}
                            dataSource={invoices}
                            rowKey="id"
                            bordered
                            pagination={{
                                pageSize: 5,
                                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} invoices`,
                                responsive: true,
                            }}
                            scroll={{ x: "max-content" }} // Enables horizontal scrolling on small screens
                            className="overflow-x-auto"
                        />
                    </div>
                )}

                <Modal
                    title={
                        <span className="text-base sm:text-lg">
              Bank Details for {selectedInvoice?.Session?.tutor?.firstName}
            </span>
                    }
                    open={isModalVisible}
                    onCancel={handleCancel}
                    footer={[
                        <Button
                            key="cancel"
                            onClick={handleCancel}
                            className="w-full sm:w-auto mb-2 sm:mb-0 sm:mr-2"
                        >
                            Cancel
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            onClick={() => form.submit()}
                            className="w-full sm:w-auto"
                        >
                            Submit Payment
                        </Button>,
                    ]}
                    width="100%"
                    className="max-w-md sm:max-w-lg top-10"
                >
                    <div className="space-y-4">
                        <Descriptions
                            bordered
                            column={1}
                            size="small"
                            className="text-xs sm:text-sm bg-gray-50 rounded-lg"
                        >
                            <Descriptions.Item label="Bank">
                                {selectedInvoice?.Session?.tutor?.Tutor?.bankDetails?.bank || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Account Holder">
                                {selectedInvoice?.Session?.tutor?.Tutor?.bankDetails?.holderName || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Account Number">
                                {selectedInvoice?.Session?.tutor?.Tutor?.bankDetails?.accountNumber || "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Branch">
                                {selectedInvoice?.Session?.tutor?.Tutor?.bankDetails?.branch || "N/A"}
                            </Descriptions.Item>
                        </Descriptions>

                        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                            <Form.Item
                                name="paymentSlip"
                                label="Upload Payment Slip"
                                valuePropName="file"
                                rules={[{ required: true, message: "Please upload a payment slip!" }]}
                            >
                                <Upload.Dragger
                                    name="files"
                                    accept="image/*,application/pdf"
                                    maxCount={1}
                                    beforeUpload={() => false}
                                    className="p-2 sm:p-4"
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined className="text-3xl sm:text-4xl text-blue-500" />
                                    </p>
                                    <p className="ant-upload-text text-sm sm:text-base">
                                        Click or drag file to upload
                                    </p>
                                    <p className="ant-upload-hint text-xs sm:text-sm">
                                        Supported formats: JPG, PNG, PDF
                                    </p>
                                </Upload.Dragger>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default StudentInvoice;
