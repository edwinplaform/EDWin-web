"use client"
import React, {useState} from 'react';
import {Table, Button, Space, Tag, message, Modal, Input, Spin} from 'antd';
import {useAppointmentByTutorId, useDeleteAppointment, useUpdateAppointment} from "@/hooks/useAppointments";
import {useCreateSession} from "@/hooks/useSessions";
import {useCurrentUser} from "@/util/auth";

const Appointments = () => {

    // const tutorId = "user_2o7YCKjTb6j4WK9loeH6hOElBXD"
    const user = useCurrentUser();
    const tutorId = user?.id;
    console.log("-----------studentId: ", tutorId);

    const {data: appointments = [], error, isLoading} = useAppointmentByTutorId(tutorId);
    const deleteAppointmentMutation = useDeleteAppointment();
    const updateAppointmentMutation = useUpdateAppointment();
    // const createSessionMutation = useCreateSession();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedAppointmentKey, setSelectedAppointmentKey] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [isRejectionModalVisible, setIsRejectionModalVisible] = useState(false);

    const showDeleteConfirm = (key) => {
        setSelectedAppointmentKey(key);
        setIsModalVisible(true);
    };

    const handleDelete = async () => {
        try {
            await deleteAppointmentMutation.mutateAsync(selectedAppointmentKey);
            setIsModalVisible(false);
            message.success("Appointment deleted successfully");
        } catch (err) {
            console.error("--------------delete appointment: ", err);
            message.error("Error deleting appointment:", err)
        } finally {
            setIsModalVisible(false);
            setSelectedAppointmentKey(null);
        }
    };

    const confirmAppointment = async (key) => {
        const appointment = appointments.find(app => app.id === key);
        if (!appointment) {
            message.error("Appointment not found!");
            return;
        }

        try {
            await updateAppointmentMutation.mutateAsync({id: key, data: {status: "ACCEPTED"}});
            message.success(`Appointment ID: ${key} has been accepted.`);

            // const sessionData = {
            //     appointmentId: appointment.id,
            //     studentId: appointment.studentId,
            //     tutorId: tutorId,
            //     subject: appointment.subject,
            //     date: appointment.date,
            //     startTime: appointment.startTime,
            //     endTime: appointment.endTime
            // }
            //
            // await createSessionMutation.mutateAsync(sessionData);
            // console.log(`Session created for Appointment ID: ${key}.`);

        } catch (err) {
            message.error(`Error accepting appointment: ${err.message}`);
        }
    };

    const openRejectionModal = (key) => {
        setIsRejectionModalVisible(true);
        setSelectedAppointmentKey(key);
    }

    const handleRejection = async () => {
        const appointmentId = selectedAppointmentKey;

        try {
            await updateAppointmentMutation.mutateAsync({
                id: appointmentId,
                data: {status: "REJECTED", reason: rejectionReason}
            });
            message.success(`Appointment ID: ${appointmentId} has been rejected.`);
            console.log(rejectionReason);
            setIsRejectionModalVisible(false);
            setRejectionReason('');
        } catch (err) {
            message.error(`Error rejecting appointment: ${err.message}`);
            console.log("--------------reject appointment err: ", err);
        }
    };

    const handleCancel = () => {
        setSelectedAppointmentKey(null);
        setIsModalVisible(false);
    };

    if (error) {
        return <div>Error fetching appointments: {error.message}</div>
    }

    if (appointments.length === 0) {
        return <div>No appointments found.</div>
    }

    const columns = [
        {
            title: 'Appointment ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Student Name',
            dataIndex: 'Student',
            key: 'student_name',
            render: (student) => `${student.firstName} ${student.lastName}`
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: 'Grade',
            dataIndex: 'grade',
            key: 'grade',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            render: (_, record) => `${record.startTime} - ${record.endTime}`
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, {status}) => {
                let color;
                if (status === 'PENDING') {
                    color = 'yellow';
                } else if (status === 'ACCEPTED') {
                    color = 'green';
                } else if (status === 'REJECTED') {
                    color = 'red'
                }
                return (
                    <Tag color={color} key={status}>
                        {status.toUpperCase()}
                    </Tag>
                );
            }
        },
        {
            title: 'Notes',
            dataIndex: 'comment',
            key: 'comment',
            render: (text) => (text ? text : 'No notes provided'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {record.status === "PENDING" ? (
                        <div className="flex gap-3">
                            <Button type="primary"
                                    onClick={() => confirmAppointment(record.id)}
                                    style={{backgroundColor: '#4CAF50', borderColor: '#4CAF50', color: 'white'}}
                            >Confirm</Button>
                            <Button type="danger"
                                    onClick={() => openRejectionModal(record.id)}
                                    style={{backgroundColor: '#f44336', borderColor: '#f44336', color: 'white'}}
                            >Reject</Button>
                        </div>
                    ) : (
                        <Button danger onClick={() => showDeleteConfirm(record.id)}>Delete</Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4">
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">Your Appointments</h1>
            </div>
            <div className="mt-6">
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
                        dataSource={appointments}
                        columns={columns}
                        rowKey="appointment_id"
                        pagination={{pageSize: 10}}
                        bordered
                    />
                )}
            </div>
            <Modal
                title="Confirm Deletion"
                open={isModalVisible}
                onOk={handleDelete}
                onCancel={handleCancel}
                okText="Yes, Delete"
                cancelText="No, Cancel"
            >
                <p>Are you sure you want to delete this appointment?</p>
            </Modal>
            <Modal
                title="Confirm Rejection"
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

export default Appointments;