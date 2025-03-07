// 'use client';
//
// import React, {useState} from 'react';
// import {
//     Table,
//     Tag,
//     Button,
//     Modal,
//     Form,
//     Input,
//     message,
//     Popconfirm,
//     Upload,
//     TimePicker,
//     Spin,
//     Card,
//     Statistic,
//     Avatar,
//     Tooltip,
//     Progress
// } from 'antd';
// import {
//     ClockCircleOutlined,
//     EditOutlined,
//     DeleteOutlined,
//     FileAddOutlined,
//     VideoCameraOutlined,
//     MessageOutlined,
//     UserOutlined,
//     CheckCircleOutlined,
//     CalendarOutlined,
//     BookOutlined,
//     BarChartOutlined,
//     CloudUploadOutlined,
//     CheckOutlined
// } from '@ant-design/icons';
// import moment from "moment";
// import {useSessionsByTutorId, useUpdateSession, useUpdateSessionStatus} from "@/hooks/useSessions";
// import {uploadFile} from "@/util/upload";
// import TutorChatModal from "@/components/chat/TutorChatModal";
//
// const TutorSession = () => {
//     const tutorId = "user_2o7YCKjTb6j4WK9loeH6hOElBXD";
//     const {data: sessions = [], error, isLoading} = useSessionsByTutorId(tutorId);
//     const updateSessionMutation = useUpdateSession();
//     const updateSessionStatus = useUpdateSessionStatus();
//
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [editingSession, setEditingSession] = useState(null);
//     const [form] = Form.useForm();
//
//     const [chatModalVisible, setChatModalVisible] = useState(false);
//     const [selectedStudent, setSelectedStudent] = useState(null);
//
//     // Calculate statistics
//     const totalSessions = sessions.length;
//     const completedSessions = sessions.filter(s => s.status === 'COMPLETED').length;
//     const pendingSessions = sessions.filter(s => s.status === 'PENDING').length;
//     const completionRate = totalSessions ? Math.round((completedSessions / totalSessions) * 100) : 0;
//
//     const handleFormSubmit = async (values) => {
//         const startTime = moment(values.startTime).format('HH:mm');
//         const endTime = moment(values.endTime).format('HH:mm');
//         const date = moment(values.date).format('YYYY-MM-DD');
//         const newValues = {...values, date, startTime, endTime};
//
//         if (editingSession) {
//             try {
//                 await updateSessionMutation.mutateAsync({sessionId: editingSession.id, data: newValues});
//                 message.success('Session updated successfully!');
//             } catch (err) {
//                 message.error('Failed to update session');
//             }
//         }
//
//         setIsModalVisible(false);
//         setEditingSession(null);
//         form.resetFields();
//     };
//
//     const handleDelete = (id) => {
//         message.success('Session deleted successfully!');
//     };
//
//     const handleSchedule = async (session) => {
//         try {
//             await updateSessionStatus.mutateAsync({sessionId: session.id, status: {status: "SCHEDULED"}});
//             message.success('Session scheduled successfully!');
//         } catch (err) {
//             message.error('Failed to schedule session');
//         }
//     };
//
//     const handleComplete = async (session) => {
//         const now = moment();
//         const endTime = moment(`${session.date} ${session.endTime}`, "YYYY-MM-DD HH:mm:ss");
//         if (now.isBefore(endTime)) {
//             message.error('Cannot mark as completed before the session end time!');
//             return;
//         }
//         try {
//             await updateSessionStatus.mutateAsync({sessionId: session.id, status: {status: "COMPLETED"}});
//             message.success("Session marked as completed!");
//         } catch (err) {
//             message.error("Failed to mark session as completed.");
//         }
//     };
//
//     const handleMaterialUpload = async (sessionId, file) => {
//         const validFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
//         if (!validFileTypes.includes(file.type)) {
//             message.error('Invalid file type. Please upload a JPEG, PNG, or PDF file.');
//             return;
//         }
//
//         try {
//             const materialUrl = await uploadFile(file, "materials");
//             await updateSessionMutation.mutateAsync({
//                 sessionId, data: {materialUrl: materialUrl}
//             });
//             message.success(`${file.name} uploaded successfully!`);
//         } catch (err) {
//             message.error('Failed to upload material');
//         }
//     };
//
//     const columns = [
//         {
//             title: 'Student',
//             dataIndex: 'student',
//             key: 'student',
//             render: (student) => (
//                 <div className="flex items-center space-x-2">
//                     <Avatar icon={<UserOutlined/>} className="bg-blue-500"/>
//                     <span>{student ? `${student.firstName} ${student.lastName}` : 'Unknown Student'}</span>
//                 </div>
//             ),
//         },
//         {
//             title: 'Subject & Grade',
//             key: 'subject',
//             render: (_, record) => (
//                 <div>
//                     <div className="font-medium">{record.subject}</div>
//                     <div className="text-gray-500 text-sm">
//                         Grade: {record.appointment?.grade || 'N/A'}
//                     </div>
//                 </div>
//             ),
//         },
//         {
//             title: 'Date & Time',
//             key: 'datetime',
//             render: (_, session) => (
//                 <div>
//                     <div className="font-medium">{moment(session.date).format('MMM DD, YYYY')}</div>
//                     <div className="text-gray-500 text-sm">
//                         {`${moment(session.startTime, 'HH:mm:ss').format('HH:mm')} - ${moment(session.endTime, 'HH:mm:ss').format('HH:mm')}`}
//                     </div>
//                 </div>
//             ),
//         },
//         {
//             title: 'Status',
//             dataIndex: 'status',
//             key: 'status',
//             render: (status) => {
//                 const statusConfig = {
//                     'PENDING': {color: 'orange', icon: <ClockCircleOutlined/>},
//                     'SCHEDULED': {color: 'blue', icon: <CalendarOutlined/>},
//                     'COMPLETED': {color: 'green', icon: <CheckCircleOutlined/>}
//                 };
//                 return (
//                     <Tag color={statusConfig[status].color} icon={statusConfig[status].icon}>
//                         {status}
//                     </Tag>
//                 );
//             }
//         },
//         {
//             title: 'Actions',
//             key: 'actions',
//             render: (_, session) => (
//                 <div className="flex flex-wrap gap-2">
//                     <Tooltip title={session.status === 'PENDING' ? 'Edit Session' : 'Reschedule'}>
//                         <Button
//                             type="default"
//                             icon={<EditOutlined/>}
//                             size="small"
//                             onClick={() => {
//                                 setEditingSession(session);
//                                 setIsModalVisible(true);
//                                 form.setFieldsValue({
//                                     ...session,
//                                     student: session.student ? `${session.student.firstName} ${session.student.lastName}` : 'Unknown Student',
//                                     startTime: moment(session.startTime, 'HH:mm'),
//                                     endTime: moment(session.endTime, 'HH:mm')
//                                 });
//                             }}
//                         />
//                     </Tooltip>
//
//                     <Tooltip title="Upload Material">
//                         <Upload
//                             showUploadList={false}
//                             beforeUpload={(file) => {
//                                 handleMaterialUpload(session.id, file);
//                                 return false;
//                             }}
//                         >
//                             <Button type="default" icon={<CloudUploadOutlined/>} size="small"/>
//                         </Upload>
//                     </Tooltip>
//
//                     {session.status === 'PENDING' && (
//                         <Tooltip title="Schedule Session">
//                             <Button
//                                 type="primary"
//                                 icon={<VideoCameraOutlined/>}
//                                 size="small"
//                                 onClick={() => handleSchedule(session)}
//                             />
//                         </Tooltip>
//                     )}
//
//                     {session.status === 'SCHEDULED' && session.zoomLink && (
//                         <Tooltip title="Join Session">
//                             <Button
//                                 type="primary"
//                                 icon={<VideoCameraOutlined/>}
//                                 size="small"
//                                 onClick={() => window.open(session.zoomLink, '_blank')}
//                             />
//                         </Tooltip>
//                     )}
//
//                     {session.status === "SCHEDULED" && (
//                         <Tooltip title="Mark as Completed">
//                             <Button
//                                 type='primary'
//                                 icon={<CheckOutlined/>}
//                                 size="small"
//                                 onClick={() => handleComplete(session)}
//                             />
//                         </Tooltip>
//                     )}
//
//                     <Tooltip title="Chat with Student">
//                         {/*<Button type="default" icon={<MessageOutlined />} size="small" />*/}
//                         <Button
//                             type="default"
//                             icon={<MessageOutlined/>}
//                             size="small"
//                             onClick={() => {
//                                 setSelectedStudent({
//                                     id: session.student.id,
//                                     name: `${session.student.firstName} ${session.student.lastName}`
//                                 });
//                                 setChatModalVisible(true);
//                             }}
//                         />
//                     </Tooltip>
//
//                     <Tooltip title="Delete Session">
//                         <Popconfirm
//                             title="Are you sure you want to delete this session?"
//                             onConfirm={() => handleDelete(session.id)}
//                             okText="Yes"
//                             cancelText="No"
//                         >
//                             <Button type="danger" icon={<DeleteOutlined/>} size="small"/>
//                         </Popconfirm>
//                     </Tooltip>
//                 </div>
//             )
//         }
//     ];
//
//     if (error) {
//         return (
//             <div className="flex items-center justify-center h-screen">
//                 <Card className="text-center p-8 shadow-lg">
//                     <DeleteOutlined className="text-4xl text-red-500 mb-4"/>
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
//                     <h1 className="text-3xl font-bold text-gray-800 mb-2">Tutor Dashboard</h1>
//                     <p className="text-gray-600">Manage your teaching sessions and student interactions</p>
//                 </div>
//
//                 {/* Statistics Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//                     <Card className="shadow-md hover:shadow-lg transition-shadow">
//                         <Statistic
//                             title="Total Sessions"
//                             value={totalSessions}
//                             prefix={<BarChartOutlined className="text-blue-500"/>}
//                         />
//                     </Card>
//                     <Card className="shadow-md hover:shadow-lg transition-shadow">
//                         <Statistic
//                             title="Completed"
//                             value={completedSessions}
//                             prefix={<CheckCircleOutlined className="text-green-500"/>}
//                         />
//                     </Card>
//                     <Card className="shadow-md hover:shadow-lg transition-shadow">
//                         <Statistic
//                             title="Pending"
//                             value={pendingSessions}
//                             prefix={<ClockCircleOutlined className="text-orange-500"/>}
//                         />
//                     </Card>
//                     <Card className="shadow-md hover:shadow-lg transition-shadow">
//                         <div className="text-sm text-gray-600 mb-2">Completion Rate</div>
//                         <Progress
//                             percent={completionRate}
//                             status="active"
//                             strokeColor={{from: '#108ee9', to: '#87d068'}}
//                         />
//                     </Card>
//                 </div>
//
//                 {/* Sessions Table */}
//                 <Card className="shadow-lg">
//                     <div className="flex items-center justify-between mb-6">
//                         <h2 className="text-xl font-semibold text-gray-800">Session Management</h2>
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
//                 {/* Edit Session Modal */}
//                 <Modal
//                     title={
//                         <div className="flex items-center space-x-2">
//                             <CalendarOutlined className="text-blue-500"/>
//                             <span>{editingSession ? 'Edit Session' : 'Create Session'}</span>
//                         </div>
//                     }
//                     open={isModalVisible}
//                     onCancel={() => {
//                         setIsModalVisible(false);
//                         setEditingSession(null);
//                     }}
//                     footer={null}
//                     width={600}
//                 >
//                     <Form
//                         form={form}
//                         onFinish={handleFormSubmit}
//                         layout="vertical"
//                         className="mt-4"
//                     >
//                         <Form.Item
//                             name="student"
//                             label="Student Name"
//                             rules={[{required: true, message: "Please enter a student name"}]}
//                         >
//                             <Input disabled prefix={<UserOutlined/>}/>
//                         </Form.Item>
//                         <Form.Item
//                             name="subject"
//                             label="Subject"
//                             rules={[{required: true, message: "Please enter a subject"}]}
//                         >
//                             <Input disabled prefix={<BookOutlined/>}/>
//                         </Form.Item>
//                         <Form.Item
//                             name="date"
//                             label="Date"
//                             rules={[{required: true, message: "Please select a date"}]}
//                         >
//                             <Input type="date" prefix={<CalendarOutlined/>}/>
//                         </Form.Item>
//                         <Form.Item label="Time" required>
//                             <div className="flex gap-4">
//                                 <Form.Item
//                                     name="startTime"
//                                     rules={[{required: true, message: "Please select a start time!"}]}
//                                     noStyle
//                                 >
//                                     <TimePicker
//                                         format="HH:mm"
//                                         placeholder="Start Time"
//                                         className="flex-1"
//                                     />
//                                 </Form.Item>
//                                 <Form.Item
//                                     name="endTime"
//                                     rules={[{required: true, message: "Please select an end time!"}]}
//                                     noStyle
//                                 >
//                                     <TimePicker
//                                         format="HH:mm"
//                                         placeholder="End Time"
//                                         className="flex-1"
//                                     />
//                                 </Form.Item>
//                             </div>
//                         </Form.Item>
//                         <Button
//                             type="primary"
//                             htmlType="submit"
//                             block
//                             icon={editingSession ? <EditOutlined/> : <CalendarOutlined/>}
//                         >
//                             {editingSession ? 'Update Session' : 'Create Session'}
//                         </Button>
//                     </Form>
//                 </Modal>
//
//                 <TutorChatModal
//                     isOpen={chatModalVisible}
//                     onClose={() => {
//                         setChatModalVisible(false);
//                         setSelectedStudent(null);
//                     }}
//                     tutorId={tutorId}
//                     studentId={selectedStudent?.id}
//                     studentName={selectedStudent?.name}
//                 />
//
//             </div>
//         </div>
//     );
// };
//
// export default TutorSession;

"use client";

import React, {useState} from "react";
import {
    Table,
    Tag,
    Button,
    Modal,
    Form,
    Input,
    message,
    Popconfirm,
    Upload,
    TimePicker,
    Spin,
    Card,
    Statistic,
    Avatar,
    Tooltip,
    Progress,
} from "antd";
import {
    ClockCircleOutlined,
    EditOutlined,
    DeleteOutlined,
    FileAddOutlined,
    VideoCameraOutlined,
    MessageOutlined,
    UserOutlined,
    CheckCircleOutlined,
    CalendarOutlined,
    BookOutlined,
    BarChartOutlined,
    CloudUploadOutlined,
    CheckOutlined,
} from "@ant-design/icons";
import moment from "moment";
import {useSessionsByTutorId, useUpdateSession, useUpdateSessionStatus} from "@/hooks/useSessions";
import {uploadFile} from "@/util/upload";
import TutorChatModal from "@/components/chat/TutorChatModal";
import {useCurrentUser} from "@/util/auth";

const TutorSession = () => {
    // const tutorId = "user_2o7YCKjTb6j4WK9loeH6hOElBXD";
    const user = useCurrentUser();
    const tutorId = user.id;
    console.log("-----tutorId: ", tutorId);

    const {data: sessions = [], error, isLoading} = useSessionsByTutorId(tutorId);
    const updateSessionMutation = useUpdateSession();
    const updateSessionStatus = useUpdateSessionStatus();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingSession, setEditingSession] = useState(null);
    const [form] = Form.useForm();

    const [chatModalVisible, setChatModalVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    // Calculate statistics
    const totalSessions = sessions.length;
    const completedSessions = sessions.filter((s) => s.status === "COMPLETED").length;
    const pendingSessions = sessions.filter((s) => s.status === "PENDING").length;
    const completionRate = totalSessions ? Math.round((completedSessions / totalSessions) * 100) : 0;

    const handleFormSubmit = async (values) => {
        const startTime = moment(values.startTime).format("HH:mm");
        const endTime = moment(values.endTime).format("HH:mm");
        const date = moment(values.date).format("YYYY-MM-DD");
        const newValues = {...values, date, startTime, endTime};

        if (editingSession) {
            try {
                await updateSessionMutation.mutateAsync({sessionId: editingSession.id, data: newValues});
                message.success("Session updated successfully!");
            } catch (err) {
                message.error("Failed to update session");
            }
        }

        setIsModalVisible(false);
        setEditingSession(null);
        form.resetFields();
    };

    const handleDelete = (id) => {
        message.success("Session deleted successfully!"); // Placeholder; add actual delete logic if needed
    };

    const handleSchedule = async (session) => {
        try {
            await updateSessionStatus.mutateAsync({sessionId: session.id, status: {status: "SCHEDULED"}});
            message.success("Session scheduled successfully!");
        } catch (err) {
            message.error("Failed to schedule session");
        }
    };

    const handleComplete = async (session) => {
        const now = moment();
        const endTime = moment(`${session.date} ${session.endTime}`, "YYYY-MM-DD HH:mm:ss");
        if (now.isBefore(endTime)) {
            message.error("Cannot mark as completed before the session end time!");
            return;
        }
        try {
            await updateSessionStatus.mutateAsync({sessionId: session.id, status: {status: "COMPLETED"}});
            message.success("Session marked as completed!");
        } catch (err) {
            message.error("Failed to mark session as completed.");
        }
    };

    const handleMaterialUpload = async (sessionId, file) => {
        const validFileTypes = ["image/jpeg", "image/png", "application/pdf"];
        if (!validFileTypes.includes(file.type)) {
            message.error("Invalid file type. Please upload a JPEG, PNG, or PDF file.");
            return;
        }

        try {
            const materialUrl = await uploadFile(file, "materials");
            await updateSessionMutation.mutateAsync({
                sessionId,
                data: {materialUrl: materialUrl},
            });
            message.success(`${file.name} uploaded successfully!`);
        } catch (err) {
            message.error("Failed to upload material");
        }
    };

    const columns = [
        {
            title: "Student",
            dataIndex: "student",
            key: "student",
            render: (student) => (
                <div className="flex items-center space-x-2">
                    <Avatar icon={<UserOutlined/>} className="bg-blue-500"/>
                    <span className="truncate">{student ? `${student.firstName} ${student.lastName}` : "Unknown"}</span>
                </div>
            ),
        },
        {
            title: "Subject & Grade",
            key: "subject",
            render: (_, record) => (
                <div>
                    <div className="font-medium truncate">{record.subject}</div>
                    <div className="text-gray-500 text-xs">Grade: {record.appointment?.grade || "N/A"}</div>
                </div>
            ),
        },
        {
            title: "Date & Time",
            key: "datetime",
            render: (_, session) => (
                <div>
                    <div className="font-medium">{moment(session.date).format("MMM DD, YYYY")}</div>
                    <div className="text-gray-500 text-xs">
                        {`${moment(session.startTime, "HH:mm:ss").format("HH:mm")} - ${moment(session.endTime, "HH:mm:ss").format("HH:mm")}`}
                    </div>
                </div>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const statusConfig = {
                    PENDING: {color: "orange", icon: <ClockCircleOutlined/>},
                    SCHEDULED: {color: "blue", icon: <CalendarOutlined/>},
                    COMPLETED: {color: "green", icon: <CheckCircleOutlined/>},
                };
                return (
                    <Tag color={statusConfig[status].color} icon={statusConfig[status].icon}>
                        {status}
                    </Tag>
                );
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, session) => (
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 flex-wrap">
                    <Tooltip title={session.status === "PENDING" ? "Edit Session" : "Reschedule"}>
                        <Button
                            type="default"
                            icon={<EditOutlined/>}
                            size="small"
                            onClick={() => {
                                setEditingSession(session);
                                setIsModalVisible(true);
                                form.setFieldsValue({
                                    ...session,
                                    student: session.student
                                        ? `${session.student.firstName} ${session.student.lastName}`
                                        : "Unknown Student",
                                    startTime: moment(session.startTime, "HH:mm"),
                                    endTime: moment(session.endTime, "HH:mm"),
                                });
                            }}
                            className="w-full sm:w-auto"
                        />
                    </Tooltip>
                    <Tooltip title="Upload Material">
                        <Upload
                            showUploadList={false}
                            beforeUpload={(file) => {
                                handleMaterialUpload(session.id, file);
                                return false;
                            }}
                        >
                            <Button type="default" icon={<CloudUploadOutlined/>} size="small"
                                    className="w-full sm:w-auto"/>
                        </Upload>
                    </Tooltip>
                    {session.status === "PENDING" && (
                        <Tooltip title="Schedule Session">
                            <Button
                                type="primary"
                                icon={<VideoCameraOutlined/>}
                                size="small"
                                onClick={() => handleSchedule(session)}
                                className="w-full sm:w-auto"
                            />
                        </Tooltip>
                    )}
                    {session.status === "SCHEDULED" && session.zoomLink && (
                        <Tooltip title="Join Session">
                            <Button
                                type="primary"
                                icon={<VideoCameraOutlined/>}
                                size="small"
                                onClick={() => window.open(session.zoomLink, "_blank")}
                                className="w-full sm:w-auto"
                            />
                        </Tooltip>
                    )}
                    {session.status === "SCHEDULED" && (
                        <Tooltip title="Mark as Completed">
                            <Button
                                type="primary"
                                icon={<CheckOutlined/>}
                                size="small"
                                onClick={() => handleComplete(session)}
                                className="w-full sm:w-auto"
                            />
                        </Tooltip>
                    )}
                    <Tooltip title="Chat with Student">
                        <Button
                            type="default"
                            icon={<MessageOutlined/>}
                            size="small"
                            onClick={() => {
                                setSelectedStudent({
                                    id: session.student.id,
                                    name: `${session.student.firstName} ${session.student.lastName}`,
                                });
                                setChatModalVisible(true);
                            }}
                            className="w-full sm:w-auto"
                        />
                    </Tooltip>
                    <Tooltip title="Delete Session">
                        <Popconfirm
                            title="Are you sure you want to delete this session?"
                            onConfirm={() => handleDelete(session.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="danger" icon={<DeleteOutlined/>} size="small" className="w-full sm:w-auto"/>
                        </Popconfirm>
                    </Tooltip>
                </div>
            ),
        },
    ];

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <Card className="text-center p-6 shadow-lg w-full max-w-md">
                    <DeleteOutlined className="text-4xl text-red-500 mb-4"/>
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
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Tutor Dashboard</h1>
                    <p className="text-sm sm:text-base text-gray-600">Manage your teaching sessions and student
                        interactions</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <Card className="shadow-md hover:shadow-lg transition-shadow">
                        <Statistic
                            title="Total Sessions"
                            value={totalSessions}
                            prefix={<BarChartOutlined className="text-blue-500"/>}
                            valueStyle={{fontSize: "1.25rem"}}
                        />
                    </Card>
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
                            title="Pending"
                            value={pendingSessions}
                            prefix={<ClockCircleOutlined className="text-orange-500"/>}
                            valueStyle={{fontSize: "1.25rem"}}
                        />
                    </Card>
                    <Card className="shadow-md hover:shadow-lg transition-shadow">
                        <div className="text-sm text-gray-600 mb-2">Completion Rate</div>
                        <Progress
                            percent={completionRate}
                            status="active"
                            strokeColor={{from: "#108ee9", to: "#87d068"}}
                            size="small"
                        />
                    </Card>
                </div>

                {/* Sessions Table */}
                <Card className="shadow-lg">
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-0">
                            Session Management
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

                {/* Edit Session Modal */}
                <Modal
                    title={
                        <div className="flex items-center space-x-2">
                            <CalendarOutlined className="text-blue-500"/>
                            <span>{editingSession ? "Edit Session" : "Create Session"}</span>
                        </div>
                    }
                    open={isModalVisible}
                    onCancel={() => {
                        setIsModalVisible(false);
                        setEditingSession(null);
                    }}
                    footer={null}
                    width="90%"
                    className="max-w-lg mx-auto"
                >
                    <Form
                        form={form}
                        onFinish={handleFormSubmit}
                        layout="vertical"
                        className="mt-4"
                    >
                        <Form.Item
                            name="student"
                            label="Student Name"
                            rules={[{required: true, message: "Please enter a student name"}]}
                        >
                            <Input disabled prefix={<UserOutlined/>}/>
                        </Form.Item>
                        <Form.Item
                            name="subject"
                            label="Subject"
                            rules={[{required: true, message: "Please enter a subject"}]}
                        >
                            <Input disabled prefix={<BookOutlined/>}/>
                        </Form.Item>
                        <Form.Item
                            name="date"
                            label="Date"
                            rules={[{required: true, message: "Please select a date"}]}
                        >
                            <Input type="date" prefix={<CalendarOutlined/>}/>
                        </Form.Item>
                        <Form.Item label="Time" required>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Form.Item
                                    name="startTime"
                                    rules={[{required: true, message: "Please select a start time!"}]}
                                    noStyle
                                >
                                    <TimePicker
                                        format="HH:mm"
                                        placeholder="Start Time"
                                        className="w-full"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="endTime"
                                    rules={[{required: true, message: "Please select an end time!"}]}
                                    noStyle
                                >
                                    <TimePicker
                                        format="HH:mm"
                                        placeholder="End Time"
                                        className="w-full"
                                    />
                                </Form.Item>
                            </div>
                        </Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            icon={editingSession ? <EditOutlined/> : <CalendarOutlined/>}
                            className="w-full"
                        >
                            {editingSession ? "Update Session" : "Create Session"}
                        </Button>
                    </Form>
                </Modal>

                <TutorChatModal
                    isOpen={chatModalVisible}
                    onClose={() => {
                        setChatModalVisible(false);
                        setSelectedStudent(null);
                    }}
                    tutorId={tutorId}
                    studentId={selectedStudent?.id}
                    studentName={selectedStudent?.name}
                />
            </div>
        </div>
    );
};

export default TutorSession;