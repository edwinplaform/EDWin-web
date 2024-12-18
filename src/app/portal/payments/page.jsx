'use client';

import React, {useState} from 'react';
import {Button, Input, message, Modal, Space, Spin, Table, Tag} from 'antd';
import {useStudentPayments, useUpdateInvoicePayment} from "@/hooks/useInvoices";
import {EyeOutlined, UploadOutlined} from "@ant-design/icons";
import moment from "moment/moment";

const TutorPayment = () => {
    const tutorId = "user_2o7YCKjTb6j4WK9loeH6hOElBXD"
    const {data: payments = [], isLoading, error} = useStudentPayments(tutorId);
    const useUpdateInvoicePaymentMutation = useUpdateInvoicePayment();
    console.log(payments);

    const [selectedPaymentKey, setSelectedPaymentKey] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [isRejectionModalVisible, setIsRejectionModalVisible] = useState(false);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'invoiceId',
            key: 'id',
            responsive: ['md']
        },
        {
            title: 'Student',
            dataIndex: 'student',
            key: 'student',
            render: (text, record) => `${record.Session.student.firstName} ${record.Session.student.lastName}`,
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
            render: (text, record) => `${record.Session.subject}`,
        },
        {
            title: 'Date',
            dataIndex: 'updatedAt',
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
                if (status === 'PAID') {
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
            render: (payment) => (
                <>
                    <Space size="middle">
                        <Button
                            icon={<EyeOutlined/>}
                            type="link"
                            onClick={() => window.open(payment.paymentReceiptUrl, "_blank")}
                        >
                            View Receipt
                        </Button>

                        {payment.status === "PAID" ? (
                            <div className="flex gap-3">
                                <Button type="primary"
                                        onClick={() => approvePayment(payment.invoiceId)}
                                        style={{backgroundColor: '#4CAF50', borderColor: '#4CAF50', color: 'white'}}
                                >Approve</Button>
                                <Button type="danger"
                                        onClick={() => openRejectionModal(payment.invoiceId)}
                                        style={{backgroundColor: '#f44336', borderColor: '#f44336', color: 'white'}}
                                >Reject</Button>
                            </div>
                        ) : (
                            <Button danger onClick={() => showDeleteConfirm(payment.invoiceId)}>Delete</Button>
                        )}
                    </Space>

                </>
            )
        }
    ];

    const approvePayment = async (id) => {
        console.log(id);
        try {
            await useUpdateInvoicePaymentMutation.mutateAsync({
                invoiceId: id,
                data: {status: "APPROVED"}
            });

            message.success(`Payment ID: ${id} has been approved.`);
        } catch (err) {
            message.error(`Error approving payment: ${err.message}`);
        }
    };

    const openRejectionModal = (key) => {
        setIsRejectionModalVisible(true);
        setSelectedPaymentKey(key);
    }

    const showDeleteConfirm = (invoiceId) => {
        console.log(invoiceId);
    };

    const handleRejection = async () => {
        const invoiceId = selectedPaymentKey;

        try {
            await useUpdateInvoicePaymentMutation.mutateAsync({
                invoiceId: invoiceId,
                data: {status: "REJECTED"}
            });
            message.success(`Payment ID: ${invoiceId} has been rejected.`);
            console.log(rejectionReason);
            setIsRejectionModalVisible(false);
            setRejectionReason('');
        } catch (err) {
            message.error(`Error rejecting appointment: ${err.message}`);
            console.log("--------------reject appointment err: ", err);
        }
    };

    if (error) {
        return <div>Error fetching sessions: {error.message}</div>;
    }

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4">
            <h1 className="hidden md:block text-lg font-semibold mb-4">Payment Details</h1>
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
                    dataSource={payments}
                    rowKey="id"
                    bordered
                    pagination={{pageSize: 5}}
                />
            )}
            <Modal
                title="Payment Rejection"
                open={isRejectionModalVisible}
                onCancel={() => setIsRejectionModalVisible(false)}
                onOk={handleRejection}
            >
                <Input.TextArea
                    rows={5}
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Please provide a reason for rejection"
                />
            </Modal>
        </div>
    );
};

export default TutorPayment;