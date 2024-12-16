'use client';

import React, {useState} from 'react';
import {Table, Tag, Button, Modal, Form, Input, message, Popconfirm, Upload, TimePicker, Spin} from 'antd';
import {
    ClockCircleOutlined,
    EditOutlined,
    DeleteOutlined,
    FileAddOutlined,
    VideoCameraOutlined,
    MessageOutlined
} from '@ant-design/icons';
import moment from "moment";
import {useSessionsByTutorId, useUpdateSession, useUpdateSessionStatus} from "@/hooks/useSessions";
import {uploadFile} from "@/util/upload";

const TutorSession = () => {

    const status = "ACCEPTED";
    const tutorId = "user_2o7YCKjTb6j4WK9loeH6hOElBXD";

    const {data: sessions = [], error, isLoading} = useSessionsByTutorId(tutorId);
    const updateSessionMutation = useUpdateSession();
    const updateSessionStatus = useUpdateSessionStatus();
    console.log(sessions);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingSession, setEditingSession] = useState(null);

    const [form] = Form.useForm();

    const handleFormSubmit = async (values) => {
        const startTime = moment(values.startTime).format('HH:mm');
        const endTime = moment(values.endTime).format('HH:mm');
        const date = moment(values.date).format('YYYY-MM-DD');
        const newValues = {...values, date, startTime, endTime};

        if (editingSession) {
            try {
                await updateSessionMutation.mutateAsync({sessionId: editingSession.id, data: newValues});
                message.success('Session updated successfully!');
            } catch (err) {
                console.error("------edit session: ", err);
            }
        }

        setIsModalVisible(false);
        setEditingSession(null);
        form.resetFields();

    };

    const handleDelete = (id) => {
        // setSessions(sessions.filter(session => session.id !== id));
        message.success('Session deleted successfully!');
    };

    const handleSchedule = async (session) => {
        try {
            await updateSessionStatus.mutateAsync({sessionId: session.id, status: {status: "SCHEDULED"}});
            message.success('Session scheduled successfully!');
        } catch (err) {
            console.error("-------Session status updating error: ", err);
        }

    };

    const handleMaterialUpload = async (sessionId, file) => {
        const validFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!validFileTypes.includes(file.type)) {
            message.error('Invalid file type. Please upload a JPEG, PNG, or PDF file.');
            return;
        }

        try {
            const materialUrl = await uploadFile(file, "materials");

            console.log("Material URL:", materialUrl);

            await updateSessionMutation.mutateAsync({
                sessionId, data: {materialUrl: materialUrl}
            });

            message.success(`${file.name} uploaded successfully!`);

        } catch (err) {
            console.error('Error uploading material:', error);
            message.error('Failed to upload material');
        }
    };

    const columns = [
        {
            title: 'Student',
            dataIndex: 'student',
            key: 'student',
            responsive: ['md'],
            render: (student) => {
                if (student) {
                    return `${student.firstName} ${student.lastName}`
                }
                return 'Unknown Student';
            },
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject'
        },
        {
            title: 'Grade',
            dataIndex: 'appointment',
            key: 'grade',
            render: (appointment) => {
                if (appointment && appointment.grade) {
                    return appointment.grade;
                }
                return 'N/A';
            }
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => moment(date).format('YYYY-MM-DD'),
        },
        {
            title: 'Time',
            key: 'time',
            render: (_, session) => `${moment(session.startTime, 'HH:mm:ss').format('HH:mm')} - ${moment(session.endTime, 'HH:mm:ss').format('HH:mm')}`
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag
                    color={status === 'PENDING' ? 'orange' : 'green'}
                    icon={<ClockCircleOutlined/>}
                >
                    {status}
                </Tag>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, session) => (
                <div className="flex gap-2">
                    <Button
                        type="default"
                        icon={<EditOutlined/>}
                        size="small"
                        onClick={() => {
                            setEditingSession(session);
                            setIsModalVisible(true);
                            form.setFieldsValue({
                                ...session,
                                student: session.student ? `${session.student.firstName} ${session.student.lastName}` : 'Unknown Student',
                                startTime: moment(session.startTime, 'HH:mm'),
                                endTime: moment(session.endTime, 'HH:mm')
                            });
                        }}
                    >
                        {session.status === 'PENDING' ? 'Edit' : 'Reschedule'}
                    </Button>

                    <Upload
                        showUploadList={false}
                        beforeUpload={(file) => {
                            handleMaterialUpload(session.id, file);
                            return false;
                        }}
                    >
                        <Button type="default" icon={<FileAddOutlined/>} size="small">
                            Upload Material
                        </Button>
                    </Upload>

                    {session.status === 'PENDING' && (
                        <Button
                            type="primary"
                            icon={<VideoCameraOutlined/>}
                            size="small"
                            onClick={() => handleSchedule(session)}
                        >
                            Schedule
                        </Button>
                    )}

                    {session.status === 'SCHEDULED' && session.zoomLink && (
                        <Button
                            type="default"
                            icon={<VideoCameraOutlined/>}
                            size="small"
                            onClick={() => window.open(session.zoomLink, '_blank')}
                        >
                            Join
                        </Button>
                    )}

                    <Button type="default" icon={<MessageOutlined/>} size="small">
                        Chat
                    </Button>

                    <Popconfirm
                        title="Are you sure you want to delete this session?"
                        onConfirm={() => handleDelete(session.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="danger" icon={<DeleteOutlined/>} size="small">
                            Delete
                        </Button>
                    </Popconfirm>
                </div>
            )
        }
    ];

    if (error) {
        return <div>Error fetching sessions: {error.message}</div>;
    }

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4">
            <h1 className="hidden md:block text-lg font-semibold">Tutor Sessions</h1>
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
                        columns={columns}
                        dataSource={sessions}
                        rowKey="id"
                        bordered
                        pagination={{pageSize: 5}}
                    />
                )}
            </div>
            <Modal
                title={editingSession ? 'Edit Session' : 'Create Session'}
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    setEditingSession(null);
                }}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={handleFormSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        name="student"
                        label="Student Name"
                        initialValue={editingSession?.student ? `${editingSession.student.firstName} ${editingSession.student.lastName}` : ""}
                        rules={[{required: true, message: "Please enter a student name"}]}
                    >
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item
                        name="subject"
                        label="Subject"
                        rules={[{required: true, message: "Please enter a subject"}]
                        }>
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item
                        name="date"
                        label="Date"
                        rules={[{required: true, message: "Please select a date"}]}
                    >
                        <Input type="date"/>
                    </Form.Item>
                    <Form.Item
                        label="Time"
                        required
                    >
                        <div className="flex gap-3 justify-between">
                            <Form.Item
                                name="startTime"
                                label="Start Time"
                                rules={[{required: true, message: "Please select a start time!"}]}
                                noStyle
                            >
                                <TimePicker
                                    format="HH:mm"
                                    placeholder="Start Time"
                                    style={{flex: 1}}
                                />
                            </Form.Item>
                            <Form.Item
                                name="endTime"
                                label="End Time"
                                rules={[{required: true, message: "Please select an end time!"}]}
                                noStyle
                            >
                                <TimePicker
                                    format="HH:mm"
                                    placeholder="End Time"
                                    style={{flex: 1}}
                                />
                            </Form.Item>
                        </div>
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                    >
                        {editingSession ? 'Update Session' : 'Create Session'}
                    </Button>
                </Form>
            </Modal>
        </div>
    );
};

export default TutorSession;