// 'use client';
//
// import React, {useState} from 'react';
// import {
//     Table,
//     Tag,
//     Button,
//     Modal,
//     Descriptions,
//     Timeline,
//     Form,
//     Input,
//     Rate,
//     message,
//     Spin,
//     Card,
//     Statistic
// } from 'antd';
// import {
//     ClockCircleOutlined,
//     CheckCircleOutlined,
//     CloseCircleOutlined,
//     CalendarOutlined,
//     BookOutlined,
//     StarOutlined,
//     TeamOutlined
// } from '@ant-design/icons';
// import {usePaidSessionByStudentId} from "@/hooks/useSessions";
// import moment from "moment/moment";
// import {useCreateReview, useReviewsBySessionId} from "@/hooks/useReviews";
//
// const StudentSession = () => {
//     const studentId = "user_2qFEXIj6bQcfU40oNBTKcNXt6iD";
//     const {data: sessions = [], isLoading, error} = usePaidSessionByStudentId(studentId);
//     const createReviewMutation = useCreateReview()
//
//     const [selectedSession, setSelectedSession] = useState(null);
//     const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
//     const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
//     const [form] = Form.useForm();
//     // const [reviews, setReviews] = useState({});
//
//     const {data: reviews = [], isLoading: reviewsLoading} = useReviewsBySessionId(selectedSession?.id);
//
//     // Calculate statistics
//     const completedSessions = sessions.filter(session => session.status === 'COMPLETED').length;
//     const upcomingSessions = sessions.filter(session => session.status === 'SCHEDULED').length;
//     const totalHours = sessions.reduce((acc, session) => {
//         if (session.status === 'COMPLETED') {
//             const start = moment(session.startTime, 'HH:mm:ss');
//             const end = moment(session.endTime, 'HH:mm:ss');
//             return acc + moment.duration(end.diff(start)).asHours();
//         }
//         return acc;
//     }, 0);
//
//     const columns = [
//         {
//             title: 'Tutor',
//             dataIndex: 'tutor',
//             key: 'tutor',
//             render: (text, record) => (
//                 <div className="flex items-center space-x-2">
//                     <TeamOutlined className="text-blue-500"/>
//                     <span>{`${record.tutor.firstName} ${record.tutor.lastName}`}</span>
//                 </div>
//             ),
//         },
//         {
//             title: 'Subject',
//             dataIndex: 'subject',
//             key: 'subject',
//             render: (text) => (
//                 <div className="flex items-center space-x-2">
//                     <BookOutlined className="text-green-500"/>
//                     <span>{text}</span>
//                 </div>
//             ),
//         },
//         {
//             title: 'Date & Time',
//             key: 'datetime',
//             render: (_, session) => (
//                 <div className="flex items-center space-x-2">
//                     <CalendarOutlined className="text-orange-500"/>
//                     <div>
//                         <div>{moment(session.date).format('MMM DD, YYYY')}</div>
//                         <div className="text-gray-500 text-sm">
//                             {`${moment(session.startTime, 'HH:mm:ss').format('HH:mm')} - ${moment(session.endTime, 'HH:mm:ss').format('HH:mm')}`}
//                         </div>
//                     </div>
//                 </div>
//             ),
//         },
//         {
//             title: 'Status',
//             dataIndex: 'status',
//             key: 'status',
//             render: (status) => {
//                 const statusMap = {
//                     'SCHEDULED': <Tag color="blue" icon={<ClockCircleOutlined/>}>Scheduled</Tag>,
//                     'COMPLETED': <Tag color="green" icon={<CheckCircleOutlined/>}>Completed</Tag>,
//                     'CANCELLED': <Tag color="red" icon={<CloseCircleOutlined/>}>Cancelled</Tag>
//                 };
//                 return statusMap[status];
//             }
//         },
//         {
//             title: 'Actions',
//             key: 'actions',
//             render: (session) => (
//                 <div className="space-x-2">
//                     <Button
//                         type="primary"
//                         ghost
//                         size="small"
//                         onClick={() => {
//                             setSelectedSession(session);
//                             setIsDetailModalVisible(true);
//                         }}
//                     >
//                         View Details
//                     </Button>
//                     {session.status === 'COMPLETED' && !reviews.length && !reviewsLoading && (
//                         <Button
//                             type="primary"
//                             size="small"
//                             onClick={() => {
//                                 setSelectedSession(session);
//                                 setIsReviewModalVisible(true);
//                             }}
//                         >
//                             Review Session
//                         </Button>
//                     )}
//                     {reviews.length > 0 && (
//                         <Tag icon={<StarOutlined/>} color="gold">Reviewed</Tag>
//                     )}
//                 </div>
//             )
//         }
//     ];
//
//     const handleReviewSubmit = async (values) => {
//         try {
//             await createReviewMutation.mutateAsync({
//                 sessionId: selectedSession.id,
//                 rating: values.rating,
//                 title: values.title,
//                 comment: values.comment,
//             });
//             message.success('Thank you for your review!');
//             setIsReviewModalVisible(false);
//             form.resetFields();
//         } catch (err) {
//             message.error('Failed to submit review');
//         }
//     };
//
//     if (error) {
//         return (
//             <div className="flex items-center justify-center h-screen">
//                 <Card className="text-center p-8 shadow-lg">
//                     <CloseCircleOutlined className="text-4xl text-red-500 mb-4"/>
//                     <h2 className="text-xl font-semibold mb-2">Error Loading Sessions</h2>
//                     <p className="text-gray-600">{error.message}</p>
//                 </Card>
//             </div>
//         );
//     }
//
//     return (
//         <div className="min-h-screen bg-gray-50 p-6">
//             <div className="max-w-7xl mx-auto">
//                 {/* Header Section */}
//                 <div className="mb-8">
//                     <h1 className="text-3xl font-bold text-gray-800 mb-2">My Learning Journey</h1>
//                     <p className="text-gray-600">Track your tutoring sessions and progress</p>
//                 </div>
//
//                 {/* Statistics Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//                     <Card className="shadow-md hover:shadow-lg transition-shadow">
//                         <Statistic
//                             title="Completed Sessions"
//                             value={completedSessions}
//                             prefix={<CheckCircleOutlined className="text-green-500"/>}
//                         />
//                     </Card>
//                     <Card className="shadow-md hover:shadow-lg transition-shadow">
//                         <Statistic
//                             title="Upcoming Sessions"
//                             value={upcomingSessions}
//                             prefix={<ClockCircleOutlined className="text-blue-500"/>}
//                         />
//                     </Card>
//                     <Card className="shadow-md hover:shadow-lg transition-shadow">
//                         <Statistic
//                             title="Total Hours"
//                             value={totalHours.toFixed(1)}
//                             suffix="hrs"
//                             prefix={<CalendarOutlined className="text-orange-500"/>}
//                         />
//                     </Card>
//                     <Card className="shadow-md hover:shadow-lg transition-shadow">
//                         <Statistic
//                             title="Reviews Given"
//                             value={Object.keys(reviews).length}
//                             prefix={<StarOutlined className="text-yellow-500"/>}
//                         />
//                     </Card>
//                 </div>
//
//                 {/* Sessions Table */}
//                 <Card className="shadow-lg">
//                     <div className="flex items-center justify-between mb-6">
//                         <h2 className="text-xl font-semibold text-gray-800">Session History</h2>
//                         <div className="space-x-4">
//                             <Button type="primary" icon={<CalendarOutlined/>}>
//                                 Calendar View
//                             </Button>
//                         </div>
//                     </div>
//
//                     {isLoading ? (
//                         <div className="flex justify-center items-center py-12">
//                             <Spin size="large"/>
//                         </div>
//                     ) : (
//                         <Table
//                             columns={columns}
//                             dataSource={sessions}
//                             rowKey="id"
//                             className="shadow-sm"
//                             pagination={{
//                                 pageSize: 8,
//                                 showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} sessions`
//                             }}
//                         />
//                     )}
//                 </Card>
//
//                 {/* Session Details Modal */}
//                 <Modal
//                     title={
//                         <div className="flex items-center space-x-2">
//                             <CalendarOutlined className="text-blue-500"/>
//                             <span>Session Details</span>
//                         </div>
//                     }
//                     open={isDetailModalVisible}
//                     onCancel={() => setIsDetailModalVisible(false)}
//                     footer={[
//                         selectedSession?.status === 'SCHEDULED' && (
//                             <Button
//                                 key="join"
//                                 type="primary"
//                                 icon={<TeamOutlined/>}
//                                 onClick={() => window.open(selectedSession.zoomLink, '_blank')}
//                             >
//                                 Join Session
//                             </Button>
//                         )
//                     ]}
//                     width={600}
//                 >
//                     {selectedSession && (
//                         <div className="space-y-6">
//                             <Descriptions bordered column={1} className="bg-gray-50 rounded-lg">
//                                 <Descriptions.Item label={<span className="font-semibold">Tutor</span>}>
//                                     {`${selectedSession.tutor.firstName} ${selectedSession.tutor.lastName}`}
//                                 </Descriptions.Item>
//                                 <Descriptions.Item label={<span className="font-semibold">Subject</span>}>
//                                     {selectedSession.subject}
//                                 </Descriptions.Item>
//                                 <Descriptions.Item label={<span className="font-semibold">Date</span>}>
//                                     {moment(selectedSession.date).format('MMMM DD, YYYY')}
//                                 </Descriptions.Item>
//                                 <Descriptions.Item label={<span className="font-semibold">Time</span>}>
//                                     {`${moment(selectedSession.startTime, 'HH:mm:ss').format('HH:mm')} - ${moment(selectedSession.endTime, 'HH:mm:ss').format('HH:mm')}`}
//                                 </Descriptions.Item>
//                                 <Descriptions.Item label={<span className="font-semibold">Status</span>}>
//                                     {selectedSession.status}
//                                 </Descriptions.Item>
//                             </Descriptions>
//
//                             <div>
//                                 <h3 className="text-lg font-semibold mb-4">Session Materials</h3>
//                                 {selectedSession.materialUrl ? (
//                                     <Timeline>
//                                         <Timeline.Item>
//                                             <a
//                                                 href={selectedSession.materialUrl}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 className="text-blue-500 hover:text-blue-700"
//                                             >
//                                                 View Materials
//                                             </a>
//                                         </Timeline.Item>
//                                     </Timeline>
//                                 ) : (
//                                     <p className="text-gray-500 italic">No materials uploaded for this session.</p>
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                 </Modal>
//
//                 {/* Review Modal */}
//                 <Modal
//                     title={
//                         <div className="flex items-center space-x-2">
//                             <StarOutlined className="text-yellow-500"/>
//                             <span>{`Review Session with ${selectedSession?.tutor.firstName} ${selectedSession?.tutor.lastName}`}</span>
//                         </div>
//                     }
//                     open={isReviewModalVisible}
//                     onCancel={() => setIsReviewModalVisible(false)}
//                     footer={[
//                         <Button key="cancel" onClick={() => setIsReviewModalVisible(false)}>
//                             Cancel
//                         </Button>,
//                         <Button key="submit" type="primary" onClick={() => form.submit()}>
//                             Submit Review
//                         </Button>
//                     ]}
//                 >
//                     {selectedSession && (
//                         <Form form={form} layout="vertical" onFinish={handleReviewSubmit}>
//                             <Form.Item
//                                 name="rating"
//                                 label="Rating"
//                                 rules={[{required: true, message: 'Please give a rating!'}]}
//                             >
//                                 <Rate className="text-yellow-500"/>
//                             </Form.Item>
//                             <Form.Item
//                                 name="title"
//                                 label="Title"
//                                 rules={[{required: true, message: 'Please enter a review title!'}]}
//                             >
//                                 <Input placeholder="Enter a brief title for your review"/>
//                             </Form.Item>
//                             <Form.Item
//                                 name="comment"
//                                 label="Comment"
//                                 rules={[{required: true, message: 'Please enter your review comment!'}]}
//                             >
//                                 <Input.TextArea rows={4} placeholder="Write your review here"/>
//                             </Form.Item>
//                         </Form>
//                     )}
//                 </Modal>
//             </div>
//         </div>
//     );
// };
//
// export default StudentSession;

"use client";

import React, {useState} from "react";
import {
    Table,
    Tag,
    Button,
    Modal,
    Descriptions,
    Timeline,
    Form,
    Input,
    Rate,
    message,
    Spin,
    Card,
    Statistic,
} from "antd";
import {
    ClockCircleOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    CalendarOutlined,
    BookOutlined,
    StarOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import {usePaidSessionByStudentId} from "@/hooks/useSessions";
import {useCreateReview, useReviewsBySessionId} from "@/hooks/useReviews";
import moment from "moment/moment";
import {useCurrentUser} from "@/util/auth";

const StudentSession = () => {
    // const studentId = "user_2qFEXIj6bQcfU40oNBTKcNXt6iD";
    const user = useCurrentUser();
    const studentId = user.id;
    console.log("-----------studentId: ", studentId);

    const {data: sessions = [], isLoading, error} = usePaidSessionByStudentId(studentId);
    const createReviewMutation = useCreateReview();

    const [selectedSession, setSelectedSession] = useState(null);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
    const [form] = Form.useForm();

    const {data: reviews = [], isLoading: reviewsLoading} = useReviewsBySessionId(selectedSession?.id);

    // Calculate statistics
    const completedSessions = sessions.filter((session) => session.status === "COMPLETED").length;
    const upcomingSessions = sessions.filter((session) => session.status === "SCHEDULED").length;
    const totalHours = sessions.reduce((acc, session) => {
        if (session.status === "COMPLETED") {
            const start = moment(session.startTime, "HH:mm:ss");
            const end = moment(session.endTime, "HH:mm:ss");
            return acc + moment.duration(end.diff(start)).asHours();
        }
        return acc;
    }, 0);

    const columns = [
        {
            title: "Tutor",
            dataIndex: "tutor",
            key: "tutor",
            render: (text, record) => (
                <div className="flex items-center space-x-2">
                    <TeamOutlined className="text-blue-500"/>
                    <span className="truncate">{`${record.tutor.firstName} ${record.tutor.lastName}`}</span>
                </div>
            ),
        },
        {
            title: "Subject",
            dataIndex: "subject",
            key: "subject",
            render: (text) => (
                <div className="flex items-center space-x-2">
                    <BookOutlined className="text-green-500"/>
                    <span className="truncate">{text}</span>
                </div>
            ),
        },
        {
            title: "Date & Time",
            key: "datetime",
            render: (_, session) => (
                <div className="flex items-center space-x-2">
                    <CalendarOutlined className="text-orange-500"/>
                    <div>
                        <div>{moment(session.date).format("MMM DD, YYYY")}</div>
                        <div className="text-gray-500 text-xs">
                            {`${moment(session.startTime, "HH:mm:ss").format("HH:mm")} - ${moment(session.endTime, "HH:mm:ss").format("HH:mm")}`}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const statusMap = {
                    SCHEDULED: <Tag color="blue" icon={<ClockCircleOutlined/>}>Scheduled</Tag>,
                    COMPLETED: <Tag color="green" icon={<CheckCircleOutlined/>}>Completed</Tag>,
                    CANCELLED: <Tag color="red" icon={<CloseCircleOutlined/>}>Cancelled</Tag>,
                };
                return statusMap[status];
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (session) => (
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                    <Button
                        type="primary"
                        ghost
                        size="small"
                        onClick={() => {
                            setSelectedSession(session);
                            setIsDetailModalVisible(true);
                        }}
                        className="w-full sm:w-auto"
                    >
                        Details
                    </Button>
                    {session.status === "COMPLETED" && !reviews.length && !reviewsLoading && (
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => {
                                setSelectedSession(session);
                                setIsReviewModalVisible(true);
                            }}
                            className="w-full sm:w-auto"
                        >
                            Review
                        </Button>
                    )}
                    {reviews.length > 0 && (
                        <Tag icon={<StarOutlined/>} color="gold" className="w-full sm:w-auto text-center">
                            Reviewed
                        </Tag>
                    )}
                </div>
            ),
        },
    ];

    const handleReviewSubmit = async (values) => {
        try {
            await createReviewMutation.mutateAsync({
                sessionId: selectedSession.id,
                rating: values.rating,
                title: values.title,
                comment: values.comment,
            });
            message.success("Thank you for your review!");
            setIsReviewModalVisible(false);
            form.resetFields();
        } catch (err) {
            message.error("Failed to submit review");
        }
    };

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <Card className="text-center p-6 shadow-lg w-full max-w-md">
                    <CloseCircleOutlined className="text-4xl text-red-500 mb-4"/>
                    <h2 className="text-lg font-semibold mb-2">Error Loading Sessions</h2>
                    <p className="text-gray-600">{error.message}</p>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-6 text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">My Learning Journey</h1>
                    <p className="text-sm sm:text-base text-gray-600">Track your tutoring sessions and progress</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <Card className="shadow-md hover:shadow-lg transition-shadow">
                        <Statistic
                            title="Completed"
                            value={completedSessions}
                            prefix={<CheckCircleOutlined className="text-green-500"/>}
                            valueStyle={{fontSize: "1.25rem"}}
                        />
                    </Card>
                    <Card className="shadow-md hover:shadow-lg transition-shadow">
                        <Statistic
                            title="Upcoming"
                            value={upcomingSessions}
                            prefix={<ClockCircleOutlined className="text-blue-500"/>}
                            valueStyle={{fontSize: "1.25rem"}}
                        />
                    </Card>
                    <Card className="shadow-md hover:shadow-lg transition-shadow">
                        <Statistic
                            title="Total Hours"
                            value={totalHours.toFixed(1)}
                            suffix="hrs"
                            prefix={<CalendarOutlined className="text-orange-500"/>}
                            valueStyle={{fontSize: "1.25rem"}}
                        />
                    </Card>
                    <Card className="shadow-md hover:shadow-lg transition-shadow">
                        <Statistic
                            title="Reviews"
                            value={reviews.length}
                            prefix={<StarOutlined className="text-yellow-500"/>}
                            valueStyle={{fontSize: "1.25rem"}}
                        />
                    </Card>
                </div>

                {/* Sessions Table */}
                <Card className="shadow-lg">
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-0">
                            Session History
                        </h2>
                        <Button
                            type="primary"
                            icon={<CalendarOutlined/>}
                            className="w-full sm:w-auto"
                        >
                            Calendar View
                        </Button>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <Spin size="large"/>
                        </div>
                    ) : (
                        <Table
                            columns={columns}
                            dataSource={sessions}
                            rowKey="id"
                            className="shadow-sm overflow-x-auto"
                            pagination={{
                                pageSize: 8,
                                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} sessions`,
                                responsive: true,
                            }}
                            scroll={{x: "max-content"}} // Horizontal scroll on small screens
                        />
                    )}
                </Card>

                {/* Session Details Modal */}
                <Modal
                    title={
                        <div className="flex items-center space-x-2">
                            <CalendarOutlined className="text-blue-500"/>
                            <span>Session Details</span>
                        </div>
                    }
                    open={isDetailModalVisible}
                    onCancel={() => setIsDetailModalVisible(false)}
                    footer={[
                        selectedSession?.status === "SCHEDULED" && (
                            <Button
                                key="join"
                                type="primary"
                                icon={<TeamOutlined/>}
                                onClick={() => window.open(selectedSession.zoomLink, "_blank")}
                                className="w-full sm:w-auto"
                            >
                                Join Session
                            </Button>
                        ),
                    ]}
                    width="90%"
                    className="max-w-lg mx-auto"
                >
                    {selectedSession && (
                        <div className="space-y-6">
                            <Descriptions bordered column={1} className="bg-gray-50 rounded-lg text-sm">
                                <Descriptions.Item label={<span className="font-semibold">Tutor</span>}>
                                    {`${selectedSession.tutor.firstName} ${selectedSession.tutor.lastName}`}
                                </Descriptions.Item>
                                <Descriptions.Item label={<span className="font-semibold">Subject</span>}>
                                    {selectedSession.subject}
                                </Descriptions.Item>
                                <Descriptions.Item label={<span className="font-semibold">Date</span>}>
                                    {moment(selectedSession.date).format("MMMM DD, YYYY")}
                                </Descriptions.Item>
                                <Descriptions.Item label={<span className="font-semibold">Time</span>}>
                                    {`${moment(selectedSession.startTime, "HH:mm:ss").format("HH:mm")} - ${moment(selectedSession.endTime, "HH:mm:ss").format("HH:mm")}`}
                                </Descriptions.Item>
                                <Descriptions.Item label={<span className="font-semibold">Status</span>}>
                                    {selectedSession.status}
                                </Descriptions.Item>
                            </Descriptions>

                            <div>
                                <h3 className="text-base font-semibold mb-4">Session Materials</h3>
                                {selectedSession.materialUrl ? (
                                    <Timeline>
                                        <Timeline.Item>
                                            <a
                                                href={selectedSession.materialUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                View Materials
                                            </a>
                                        </Timeline.Item>
                                    </Timeline>
                                ) : (
                                    <p className="text-gray-500 italic text-sm">No materials uploaded.</p>
                                )}
                            </div>
                        </div>
                    )}
                </Modal>

                {/* Review Modal */}
                <Modal
                    title={
                        <div className="flex items-center space-x-2">
                            <StarOutlined className="text-yellow-500"/>
                            <span>{`Review Session with ${selectedSession?.tutor.firstName} ${selectedSession?.tutor.lastName}`}</span>
                        </div>
                    }
                    open={isReviewModalVisible}
                    onCancel={() => setIsReviewModalVisible(false)}
                    footer={[
                        <Button
                            key="cancel"
                            onClick={() => setIsReviewModalVisible(false)}
                            className="w-full sm:w-auto"
                        >
                            Cancel
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            onClick={() => form.submit()}
                            className="w-full sm:w-auto"
                        >
                            Submit Review
                        </Button>,
                    ]}
                    width="90%"
                    className="max-w-lg mx-auto"
                >
                    {selectedSession && (
                        <Form form={form} layout="vertical" onFinish={handleReviewSubmit}>
                            <Form.Item
                                name="rating"
                                label="Rating"
                                rules={[{required: true, message: "Please give a rating!"}]}
                            >
                                <Rate className="text-yellow-500"/>
                            </Form.Item>
                            <Form.Item
                                name="title"
                                label="Title"
                                rules={[{required: true, message: "Please enter a review title!"}]}
                            >
                                <Input placeholder="Enter a brief title"/>
                            </Form.Item>
                            <Form.Item
                                name="comment"
                                label="Comment"
                                rules={[{required: true, message: "Please enter your review comment!"}]}
                            >
                                <Input.TextArea rows={4} placeholder="Write your review here"/>
                            </Form.Item>
                        </Form>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default StudentSession;