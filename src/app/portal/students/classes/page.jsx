// "use client"
// import React, { useState, useEffect } from 'react';
// import {
//     Card,
//     Typography,
//     Button,
//     List,
//     Modal,
//     Upload,
//     message
// } from 'antd';
// // import {
// //     FileOutlined,
// //     DownloadOutlined
// // } from '@ant-design/icons';
// import { createClient } from '@supabase/supabase-js';
//
// const { Title, Text } = Typography;
//
// const StudentClasses = () => {
//     const [enrolledClasses, setEnrolledClasses] = useState([]);
//     const [selectedClass, setSelectedClass] = useState(null);
//     const [classMaterials, setClassMaterials] = useState([]);
//     const [paymentModalVisible, setPaymentModalVisible] = useState(false);
//
//     // Supabase client setup
// //     const supabase = createClient(
// //         process.env.NEXT_PUBLIC_SUPABASE_URL!,
// //         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// // );
//
//     // useEffect(() => {
//     //     // Fetch enrolled classes for the student
//     //     const fetchClasses = async () => {
//     //         // Replace with actual student ID retrieval
//     //         const { data, error } = await supabase
//     //             .from('student_classes')
//     //             .select('classes(*)');
//     //
//     //         if (data) setEnrolledClasses(data.map(item => item.classes));
//     //     };
//     //
//     //     fetchClasses();
//     // }, []);
//
//     const handleViewClassMaterials = async (classId) => {
//         try {
//             // Fetch class materials from Supabase storage
//             // const { data, error } = await supabase.storage
//             //     .from('class-materials')
//             //     .list(`materials/${classId}`);
//
//             // if (data) setClassMaterials(data);
//             setSelectedClass(classId);
//         } catch (error) {
//             message.error('Failed to fetch class materials');
//         }
//     };
//
//     const handleUploadPaymentReceipt = async (info) => {
//         // const { status } = info.file;
//         const status = "done";
//         if (status === 'done') {
//             try {
//                 // Upload payment receipt to Supabase storage
//                 // const { data, error } = await supabase.storage
//                 //     .from('payment-receipts')
//                 //     .upload(`receipts/${selectedClass}/${info.file.name}`, info.file);
//                 //
//                 // if (error) throw error;
//
//                 message.success('Payment receipt uploaded successfully');
//                 setPaymentModalVisible(false);
//             } catch (error) {
//                 message.error(`Upload failed: ${error.message}`);
//             }
//         } else if (status === 'error') {
//             message.error('Upload failed');
//         }
//     };
//
//     const downloadMaterial = async (fileName) => {
//         try {
//             // const { data, error } = await supabase.storage
//             //     .from('class-materials')
//             //     .download(`materials/${selectedClass}/${fileName}`);
//             //
//             // if (error) throw error;
//             //
//             // // Create download link
//             // const url = URL.createObjectURL(data);
//             // const link = document.createElement('a');
//             // link.href = url;
//             // link.download = fileName;
//             // document.body.appendChild(link);
//             // link.click();
//             // document.body.removeChild(link);
//         } catch (error) {
//             message.error('Download failed');
//         }
//     };
//
//     return (
//         <div className="p-6 bg-white">
//             <Title level={3}>My Enrolled Classes</Title>
//
//             <List
//                 grid={{ gutter: 16, column: 4 }}
//                 dataSource={enrolledClasses}
//                 renderItem={(classItem) => (
//                     <List.Item>
//                         <Card
//                             title={classItem.name}
//                             extra={
//                                 <Button
//                                     type="link"
//                                     onClick={() => handleViewClassMaterials(classItem.id)}
//                                 >
//                                     View Materials
//                                 </Button>
//                             }
//                         >
//                             <Text strong>Subject: </Text>
//                             <Text>{classItem.subject}</Text>
//                             <div className="mt-4">
//                                 <Button
//                                     type="primary"
//                                     onClick={() => setPaymentModalVisible(true)}
//                                 >
//                                     Upload Payment Receipt
//                                 </Button>
//                             </div>
//                         </Card>
//                     </List.Item>
//                 )}
//             />
//
//             <Modal
//                 title="Class Materials"
//                 open={!!selectedClass}
//                 onCancel={() => setSelectedClass(null)}
//                 footer={null}
//             >
//                 <List
//                     itemLayout="horizontal"
//                     dataSource={classMaterials}
//                     renderItem={(material) => (
//                         <List.Item
//                             actions={[
//                                 <Button
//                                     key="download"
//                                     // icon={<DownloadOutlined />}
//                                     onClick={() => downloadMaterial(material.name)}
//                                 >
//                                     Download
//                                 </Button>
//                             ]}
//                         >
//                             <List.Item.Meta
//                                 // avatar={<FileOutlined />}
//                                 title={material.name}
//                             />
//                         </List.Item>
//                     )}
//                 />
//             </Modal>
//
//             <Modal
//                 title="Upload Payment Receipt"
//                 open={paymentModalVisible}
//                 onCancel={() => setPaymentModalVisible(false)}
//                 footer={null}
//             >
//                 <Upload
//                     name="paymentReceipt"
//                     multiple={false}
//                     onChange={handleUploadPaymentReceipt}
//                 >
//                     <Button>
//                         Upload Payment Receipt
//                     </Button>
//                 </Upload>
//             </Modal>
//         </div>
//     );
// };
//
// export default StudentClasses;

// "use client"
// import React, {useEffect, useState} from 'react';
// import {Table, Button, message} from 'antd';
//
// const StudentClasses = () => {
//     const [classes, setClasses] = useState([]);
//
//     // Sample data for available classes
//     const sampleClasses = [
//         {class_id: 1, name: "Math 101", description: "Introduction to Mathematics"},
//         {class_id: 2, name: "Physics 101", description: "Basics of Physics"},
//         {class_id: 3, name: "Chemistry 101", description: "Fundamentals of Chemistry"},
//     ];
//
//     useEffect(() => {
//         loadAvailableClasses();
//     }, []);
//
//     const loadAvailableClasses = () => {
//         setClasses(sampleClasses); // Load sample classes
//     };
//
//     const handleEnroll = (classId) => {
//         try {
//             message.success(`Enrolled in Class ID ${classId} successfully!`);
//             // In a real app you would update the state or make an API call here
//         } catch (error) {
//             message.error('Error enrolling in class.');
//         }
//     };
//
//     const columns = [
//         {
//             title: 'Class ID',
//             dataIndex: 'class_id',
//             key: 'class_id',
//         },
//         {
//             title: 'Class Name',
//             dataIndex: 'name',
//             key: 'name',
//         },
//         {
//             title: 'Description',
//             dataIndex: 'description',
//             key: 'description',
//         },
//         {
//             title: 'Action',
//             render: (_, record) => (
//                 <Button type="primary" onClick={() => handleEnroll(record.class_id)}>Enroll</Button>
//             ),
//         },
//     ];
//
//     return (
//         <div className="bg-white p-4 rounded-md flex-1 m-4">
//             <div className="flex items-center justify-between">
//                 <h1 className="hidden md:block text-lg font-semibold">My Classes</h1>
//             </div>
//             <div className="mt-6">
//                 <Table dataSource={classes} columns={columns} rowKey="class_id"/>
//             </div>
//         </div>
//     );
// };
//
// export default StudentClasses;


'use client';

import React, { useState } from 'react';
import { Table, Tag, Button, Modal, Descriptions, Timeline, Form, Input, Rate, message } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const StudentSession = () => {
    const [selectedSession, setSelectedSession] = useState(null);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
    const [form] = Form.useForm();

    const [reviews, setReviews] = useState({}); // Store reviews by session ID

    const sessions = [
        {
            id: '1',
            tutor: 'Kamal Perera',
            subject: 'Mathematics',
            date: '2024-02-15',
            time: '14:00 - 15:30',
            status: 'COMPLETED',
            zoomLink: 'https://zoom.us/j/123456789',
            materials: ['algebra_notes.pdf', 'practice_problems.docx']
        },
        {
            id: '2',
            tutor: 'Amal Perera',
            subject: 'Physics',
            date: '2024-02-20',
            time: '16:00 - 17:00',
            status: 'SCHEDULED',
            zoomLink: 'https://zoom.us/j/987654321',
            materials: []
        }
    ];

    const columns = [
        {
            title: 'Tutor',
            dataIndex: 'tutor',
            key: 'tutor'
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const statusMap = {
                    'SCHEDULED': <Tag color="blue" icon={<ClockCircleOutlined />}>Scheduled</Tag>,
                    'COMPLETED': <Tag color="green" icon={<CheckCircleOutlined />}>Completed</Tag>,
                    'CANCELLED': <Tag color="red" icon={<CloseCircleOutlined />}>Cancelled</Tag>
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
        const newReviews = { ...reviews, [selectedSession.id]: values };
        setReviews(newReviews);
        message.success('Thank you for your review!');
        setIsReviewModalVisible(false);
        form.resetFields();
    };

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4">
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">My Sessions</h1>
            </div>
            <div className="mt-6">
                <Table
                    columns={columns}
                    dataSource={sessions}
                    rowKey="id"
                    bordered
                />
            </div>

            {/* Session Details Modal */}
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
                                {selectedSession.tutor}
                            </Descriptions.Item>
                            <Descriptions.Item label="Subject">
                                {selectedSession.subject}
                            </Descriptions.Item>
                            <Descriptions.Item label="Date">
                                {selectedSession.date}
                            </Descriptions.Item>
                            <Descriptions.Item label="Time">
                                {selectedSession.time}
                            </Descriptions.Item>
                            <Descriptions.Item label="Status">
                                {selectedSession.status}
                            </Descriptions.Item>
                        </Descriptions>

                        <h3 className="mt-4 mb-2 text-lg font-semibold">
                            Session Materials
                        </h3>
                        {selectedSession.materials.length > 0 ? (
                            <Timeline>
                                {selectedSession.materials.map((material, index) => (
                                    <Timeline.Item key={index}>
                                        <a
                                            href={`/materials/${material}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {material}
                                        </a>
                                    </Timeline.Item>
                                ))}
                            </Timeline>
                        ) : (
                            <p>No materials uploaded for this session.</p>
                        )}
                    </div>
                )}
            </Modal>

            {/* Review Modal */}
            <Modal
                title={`Review Session with ${selectedSession?.tutor}`}
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
                            rules={[{ required: true, message: 'Please give a rating!' }]}
                        >
                            <Rate allowHalf />
                        </Form.Item>
                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: 'Please enter a review title!' }]}
                        >
                            <Input placeholder="Enter a brief title for your review" />
                        </Form.Item>
                        <Form.Item
                            name="comment"
                            label="Comment"
                            rules={[{ required: true, message: 'Please enter your review comment!' }]}
                        >
                            <Input.TextArea rows={4} placeholder="Write your review here" />
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </div>
    );
};

export default StudentSession;
