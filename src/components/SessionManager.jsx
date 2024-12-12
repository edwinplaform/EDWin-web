"use client"
import React, {useState, useEffect} from 'react';
import {
    Table,
    Card,
    Typography,
    Button,
    Modal,
    Form,
    Select,
    DatePicker,
    TimePicker,
    message
} from 'antd';
// import {
//     PlusOutlined,
//     EditOutlined,
//     DeleteOutlined
// } from '@ant-design/icons';
import {createClient} from '@supabase/supabase-js';
import moment from 'moment';

const {Title} = Typography;
const {Option} = Select;

const Sessions = () => {
    const [sessions, setSessions] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentSession, setCurrentSession] = useState(null);
    const [form] = Form.useForm();

    // Supabase client setup
//     const supabase = createClient(
//         process.env.NEXT_PUBLIC_SUPABASE_URL!,
//         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

    // useEffect(() => {
    //     fetchSessions();
    // }, []);

    // const fetchSessions = async () => {
    //     const { data, error } = await supabase
    //         .from('sessions')
    //         .select('*, classes(*), students(*), tutors(*)');
    //
    //     if (data) setSessions(data);
    //     if (error) message.error('Failed to fetch sessions');
    // };

    const columns = [
        {
            title: 'Class',
            dataIndex: ['classes', 'name'],
            key: 'className',
        },
        {
            title: 'Date',
            dataIndex: 'session_date',
            key: 'date',
            render: (date) => moment(date).format('YYYY-MM-DD'),
        },
        {
            title: 'Start Time',
            dataIndex: 'start_time',
            key: 'startTime',
        },
        {
            title: 'End Time',
            dataIndex: 'end_time',
            key: 'endTime',
        },
        {
            title: 'Student',
            dataIndex: ['students', 'name'],
            key: 'studentName',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <div className="space-x-2">
                    <Button
                        // icon={<EditOutlined />}
                        onClick={() => handleEditSession(record)}
                    >
                        Edit
                    </Button>
                    <Button
                        danger
                        // icon={<DeleteOutlined />}
                        onClick={() => handleDeleteSession(record.id)}
                    >
                        Delete
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => handleStartSession(record)}
                    >
                        Start Session
                    </Button>
                </div>
            ),
        },
    ];

    const handleAddSession = () => {
        setIsModalVisible(true);
        setCurrentSession(null);
        form.resetFields();
    };

    const handleEditSession = (session) => {
        setCurrentSession(session);
        setIsModalVisible(true);
        form.setFieldsValue({
            ...session,
            session_date: moment(session.session_date),
            start_time: moment(session.start_time, 'HH:mm'),
            end_time: moment(session.end_time, 'HH:mm'),
        });
    };

    const handleDeleteSession = async (sessionId) => {
        try {
            // await supabase
            //     .from('sessions')
            //     .delete()
            //     .eq('id', sessionId);

            setSessions(sessions.filter(s => s.id !== sessionId));
            message.success('Session deleted successfully');
        } catch (error) {
            message.error('Failed to delete session');
        }
    };

    const handleStartSession = (session) => {
        // Implement session start logic
        // Could open a chat interface or redirect to session room
        Modal.info({
            title: 'Start Session',
            content: (
                <div>
                    <p>Starting session for {session.classes.name}</p>
                    <p>Date: {moment(session.session_date).format('YYYY-MM-DD')}</p>
                    <p>Time: {session.start_time} - {session.end_time}</p>
                </div>
            ),
            onOk() {
                // Implement actual session start logic
                // Could involve creating a chat room, video call, etc.
            },
        });
    };

    const onFinish = async (values) => {
        try {
            const sessionData = {
                ...values,
                session_date: values.session_date.format('YYYY-MM-DD'),
                start_time: values.start_time.format('HH:mm'),
                end_time: values.end_time.format('HH:mm'),
            };

            if (currentSession) {
                // Update existing session
                // await supabase
                //     .from('sessions')
                //     .update(sessionData)
                //     .eq('id', currentSession.id);
            } else {
                // Create new session
                //     await supabase
                //         .from('sessions')
                //         .insert(sessionData);
                }

                // fetchSessions(); // Refresh sessions list
                setIsModalVisible(false);
                message.success(currentSession ? 'Session updated' : 'Session created');
            }
        catch(err)
            {
                message.error('Operation failed');
            }
    };

    return (
        <div className="p-6 bg-white">
            <div className="flex justify-between items-center mb-6">
                <Title level={3}>Tutoring Sessions</Title>
                <Button
                    type="primary"
                    // icon={<PlusOutlined/>}
                    onClick={handleAddSession}
                >
                    Schedule New Session
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={sessions}
                rowKey="id"
            />

            <Modal
                title={currentSession ? "Edit Session" : "Create New Session"}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="class_id"
                        label="Select Class"
                        rules={[{required: true, message: 'Please select a class'}]}
                    >
                        <Select placeholder="Select a class">
                            {/* Populate with actual classes from Supabase */}
                            <Option value="1">Mathematics 101</Option>
                            <Option value="2">English Composition</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="session_date"
                        label="Session Date"
                        rules={[{required: true, message: 'Please select a date'}]}
                    >
                        <DatePicker className="w-full"/>
                    </Form.Item>

                    <Form.Item
                        name="start_time"
                        label="Start Time"
                        rules={[{required: true, message: 'Please select start time'}]}
                    >
                        <TimePicker className="w-full" format="HH:mm"/>
                    </Form.Item>

                    <Form.Item
                        name="end_time"
                        label="End Time"
                        rules={[{required: true, message: 'Please select end time'}]}
                    >
                        <TimePicker className="w-full" format="HH:mm"/>
                    </Form.Item>

                    <Form.Item
                        name="student_id"
                        label="Select Student"
                        rules={[{required: true, message: 'Please select a student'}]}
                    >
                        <Select placeholder="Select a student">
                            {/* Populate with actual students from Supabase */}
                            <Option value="1">John Doe</Option>
                            <Option value="2">Jane Smith</Option>
                        </Select>
                    </Form.Item>

                    <div className="flex justify-end space-x-2">
                        <Button onClick={() => setIsModalVisible(false)}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            {currentSession ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default Sessions;