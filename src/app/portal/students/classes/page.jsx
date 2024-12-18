'use client';

import React, {useState} from 'react';
import {Table, Tag, Button, Modal, Descriptions, Timeline, Form, Input, Rate, message, Spin} from 'antd';
import {ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import {usePaidSessionByStudentId} from "@/hooks/useSessions";
import moment from "moment/moment";

const StudentSession = () => {

    const studentId = "user_2qFEXIj6bQcfU40oNBTKcNXt6iD";

    const {data: sessions = [], isLoading, error} = usePaidSessionByStudentId(studentId);
    console.log(sessions);

    const [selectedSession, setSelectedSession] = useState(null);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [reviews, setReviews] = useState({});

    const columns = [
        {
            title: 'Tutor',
            dataIndex: 'tutor',
            key: 'tutor',
            render: (text, record) => `${record.tutor.firstName} ${record.tutor.lastName}`,
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => moment(date).format('YYYY-MM-DD'),
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            render: (_, session) => `${moment(session.startTime, 'HH:mm:ss').format('HH:mm')} - ${moment(session.endTime, 'HH:mm:ss').format('HH:mm')}`
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const statusMap = {
                    'SCHEDULED': <Tag color="blue" icon={<ClockCircleOutlined/>}>Scheduled</Tag>,
                    'COMPLETED': <Tag color="green" icon={<CheckCircleOutlined/>}>Completed</Tag>,
                    'CANCELLED': <Tag color="red" icon={<CloseCircleOutlined/>}>Cancelled</Tag>
                };
                return statusMap[status];
            }
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (session) => (
                <div>
                    <Button
                        type="link"
                        onClick={() => {
                            setSelectedSession(session);
                            setIsDetailModalVisible(true);
                        }}
                    >
                        View Details
                    </Button>
                    {session.status === 'COMPLETED' && !reviews[session.id] && (
                        <Button
                            type="link"
                            onClick={() => {
                                setSelectedSession(session);
                                setIsReviewModalVisible(true);
                            }}
                        >
                            Review Session
                        </Button>
                    )}
                    {reviews[session.id] && <Tag color="gold">Reviewed</Tag>}
                </div>
            )
        }
    ];

    const handleReviewSubmit = (values) => {
        const newReviews = {...reviews, [selectedSession.id]: values};
        setReviews(newReviews);
        message.success('Thank you for your review!');
        setIsReviewModalVisible(false);
        form.resetFields();
    };

    if (error) {
        return <div>Error fetching sessions: {error.message}</div>;
    }

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4">
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">My Sessions</h1>
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
                        columns={columns}
                        dataSource={sessions}
                        rowKey="id"
                        bordered
                    />
                )}
            </div>

            <Modal
                title="Session Details"
                open={isDetailModalVisible}
                onCancel={() => setIsDetailModalVisible(false)}
                footer={[
                    selectedSession?.status === 'SCHEDULED' && (
                        <Button
                            key="join"
                            type="primary"
                            onClick={() => window.open(selectedSession.zoomLink, '_blank')}
                        >
                            Join Session
                        </Button>
                    )
                ]}
            >
                {selectedSession && (
                    <div>
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Tutor">
                                {selectedSession.tutor.firstName} {selectedSession.tutor.lastName}
                            </Descriptions.Item>
                            <Descriptions.Item label="Subject">
                                {selectedSession.subject}
                            </Descriptions.Item>
                            <Descriptions.Item label="Date">
                                {moment(selectedSession.date).format('YYYY-MM-DD')}
                            </Descriptions.Item>
                            <Descriptions.Item label="Time">
                                {`${moment(selectedSession.startTime, 'HH:mm:ss').format('HH:mm')} - ${moment(selectedSession.endTime, 'HH:mm:ss').format('HH:mm')}`}
                            </Descriptions.Item>
                            <Descriptions.Item label="Status">
                                {selectedSession.status}
                            </Descriptions.Item>
                        </Descriptions>

                        <h3 className="mt-4 mb-2 text-lg font-semibold">
                            Session Materials
                        </h3>
                        {selectedSession.materialUrl ? (
                            <Timeline>
                                {/*{selectedSession.materials.map((material, index) => (*/}
                                    <Timeline.Item>
                                        <a
                                            href={selectedSession.materialUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Material Link
                                        </a>
                                    </Timeline.Item>
                                {/*))}*/}
                            </Timeline>
                        ) : (
                            <p>No materials uploaded for this session.</p>
                        )}
                    </div>
                )}
            </Modal>

            {/* Review Modal */}
            <Modal
                title={`Review Session with ${selectedSession?.tutor.firstName} ${selectedSession?.tutor.lastName}`}
                open={isReviewModalVisible}
                onCancel={() => setIsReviewModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsReviewModalVisible(false)}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => form.submit()}>
                        Submit Review
                    </Button>
                ]}
            >
                {selectedSession && (
                    <Form form={form} layout="vertical" onFinish={handleReviewSubmit}>
                        <Form.Item
                            name="rating"
                            label="Rating"
                            rules={[{required: true, message: 'Please give a rating!'}]}
                        >
                            <Rate allowHalf/>
                        </Form.Item>
                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[{required: true, message: 'Please enter a review title!'}]}
                        >
                            <Input placeholder="Enter a brief title for your review"/>
                        </Form.Item>
                        <Form.Item
                            name="comment"
                            label="Comment"
                            rules={[{required: true, message: 'Please enter your review comment!'}]}
                        >
                            <Input.TextArea rows={4} placeholder="Write your review here"/>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </div>
    );
};

export default StudentSession;
