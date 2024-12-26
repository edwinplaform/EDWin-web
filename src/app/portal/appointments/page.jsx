"use client"
import React, {useEffect, useState} from 'react';
import {Table, Card, Typography, Button, Space, Tag, message, Modal, Input} from 'antd';
import TableSearch from "@/components/TableSearch";

const {Title} = Typography;

const Appointments = () => {

    const [appointments, setAppointments] = useState([
        {
            appointment_id: 1,
            student_name: "Amal",
            date: "2024-12-29",
            subject: "Physics",
            grade: 12,
            start_time: '09:00',
            end_time: '17:00',
            status: "PENDING",
            notes: 'Discussing advanced topics.'
        },
        {
            appointment_id: 2,
            student_name: "Sara",
            date: "2024-12-29",
            subject: "Mathematics",
            grade: 11,
            start_time: '10:30',
            end_time: '17:00',
            status: "CONFIRMED",
            notes: 'Reviewing calculus concepts.'
        },
        {
            appointment_id: 3,
            student_name: "John",
            date: "2024-12-29",
            subject: "Chemistry",
            grade: 10,
            start_time: '14:00',
            end_time: '17:00',
            status: "REJECTED",
            notes: 'Need to reschedule due to a conflict.'
        },
        {
            appointment_id: 4,
            student_name: "Emily",
            date: "2024-12-29",
            subject: "Biology",
            grade: 12,
            start_time: '11:00',
            end_time: '17:00',
            status: "PENDING",
            notes: 'Preparing for the upcoming exam.'
        },
        {
            appointment_id: 5,
            student_name: "Michael",
            date: "2024-12-29",
            subject: "English Literature",
            grade: 11,
            start_time: '15:00',
            end_time: '17:00',
            status: "CONFIRMED",
            notes: 'Discussing the themes of the latest novel.'
        },
        {
            appointment_id: 6,
            student_name: "Sophia",
            date: "2024-12-29",
            subject: "History",
            grade: 10,
            start_time: '13:00',
            end_time: '17:00',
            status: "PENDING",
            notes: 'Exploring World War II events.'
        },
        {
            appointment_id: 7,
            student_name: "David",
            date: "2024-12-29",
            subject: "Computer Science",
            grade: 12,
            start_time: '16:00',
            end_time: '17:00',
            status: "CONFIRMED",
            notes: 'Working on the final project.'
        }
    ]);

    const columns = [
        {
            title: 'Appointment ID',
            dataIndex: 'appointment_id',
            key: 'appointment_id',
        },
        {
            title: 'Student Name',
            dataIndex: 'student_name',
            key: 'student_name',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
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
            render: (_, session) => `${session.start_time} - ${session.end_time}`
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, {status}) => {
                let color;
                if (status === 'PENDING') {
                    color = 'yellow';
                } else if (status === 'CONFIRMED') {
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
        // {
        //     title: 'Proposed Rate',
        //     dataIndex: 'proposed_rate',
        //     key: 'proposed_rate',
        //     render: (text) => `$${text.toFixed(2)}`,
        // },
        {
            title: 'Notes',
            dataIndex: 'notes',
            key: 'notes',
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
                                    onClick={() => confirmAppointment(record.appointment_id)}
                                    style={{backgroundColor: '#4CAF50', borderColor: '#4CAF50', color: 'white'}}
                            >Confirm</Button>
                            <Button type="danger"
                                    onClick={() => openRejectionModal(record.appointment_id)}
                                    style={{backgroundColor: '#f44336', borderColor: '#f44336', color: 'white'}}
                            >Reject</Button>
                        </div>
                    ) : (
                        <Button danger onClick={() => showDeleteConfirm(record.appointment_id)}>Delete</Button>
                    )}
                </Space>
            ),
        },
    ];

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedAppointmentKey, setSelectedAppointmentKey] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [isRejectionModalVisible, setIsRejectionModalVisible] = useState(false);

    const confirmAppointment = (key) => {
        setAppointments(appointments.map(appointment =>
            appointment.appointment_id === key ? {...appointment, status: "CONFIRMED"} : appointment
        ));
        message.success(`Appointment ID: ${key} has been confirmed.`);
    }

    const openRejectionModal = (key) => {
        setIsRejectionModalVisible(true);
        setSelectedAppointmentKey(key);
    }

    // const confirmAppointment = async (key) => {
    //     const appointment = appointments.find(app => app.appointment_id === key);
    //     const sessionData = {
    //         subject: 'Your Subject Here', // Replace with actual subject
    //         session_date: appointment.proposed_date,
    //         start_time: appointment.start_time,
    //         end_time: appointment.end_time,
    //         student_id: appointment.student_id,
    //         tutor_id: appointment.tutor_id,
    //     };
    //
    //     try {
    //         // Call your backend API to create a session
    //         await fetch('/api/sessions', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(sessionData),
    //         });
    //         setAppointments(appointments.map(appointment =>
    //             appointment.appointment_id === key ? { ...appointment, status: "CONFIRMED" } : appointment
    //         ));
    //         message.success(`Appointment ID: ${key} has been confirmed and session created.`);
    //     } catch (error) {
    //         message.error('Error confirming appointment.');
    //     }
    // };

    const handleRejection = () => {
        const appointmentId = selectedAppointmentKey;

        try {
            // await fetch(`/api/appointments/${appointmentId}/reject`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ reason: rejectionReason }),
            // });

            setAppointments(appointments.map(appointment =>
                appointment.appointment_id === appointmentId ? {...appointment, status: "REJECTED"} : appointment
            ));
            message.success(`Appointment ID: ${appointmentId} has been rejected.`);
            console.log(rejectionReason);
            setIsRejectionModalVisible(false);
            setRejectionReason('');
        } catch (err) {
            console.log("--------------reject appointment err: ", err);
        }
    };

    const showDeleteConfirm = (key) => {
        setSelectedAppointmentKey(key);
        setIsModalVisible(true);
    };

    const handleDelete = () => {
        try {
            setAppointments(appointments.filter(appointment => appointment.appointment_id !== selectedAppointmentKey));
            message.success(`Appointment ID: ${selectedAppointmentKey} has been deleted.`);
        } catch (err) {
            console.error("--------------delete appointment: ", err);
            message.error(`Failed to delete Appointment ID: ${selectedAppointmentKey}`)
        } finally {
            setIsModalVisible(false);
            setSelectedAppointmentKey(null);
        }

    }

    const handleCancel = () => {
        setSelectedAppointmentKey(null);
        setIsModalVisible(false);
    };

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4">
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">Your Appointments</h1>
            </div>
            <div className="mt-6">
                <Table
                    dataSource={appointments}
                    columns={columns}
                    rowKey="appointment_id"
                    pagination={{pageSize: 10}}
                    bordered
                />
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