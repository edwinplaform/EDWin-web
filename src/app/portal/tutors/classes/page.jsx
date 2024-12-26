// "use client"
// import React, { useState, useEffect } from 'react';
// import {
//     Table,
//     Typography,
//     Button,
//     Modal,
//     Form,
//     Input,
//     Select,
//     Upload,
//     message
// } from 'antd';
// // import {
// //     UploadOutlined,
// //     PlusOutlined,
// //     EditOutlined,
// //     DeleteOutlined
// // } from '@ant-design/icons';
// // import { createClient } from '@supabase/supabase-js';
//
// const { Title } = Typography;
// const { Option } = Select;
//
// const TutorClasses = () => {
//     const [classes, setClasses] = useState([]);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [currentClass, setCurrentClass] = useState(null);
//     const [form] = Form.useForm();
//
//     // Supabase client setup (replace with your actual credentials)
// //     const supabase = createClient(
// //         process.env.NEXT_PUBLIC_SUPABASE_URL!,
// //         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// // );
//
//     const columns = [
//         {
//             title: 'Class Name',
//             dataIndex: 'name',
//             key: 'name',
//         },
//         {
//             title: 'Subject',
//             dataIndex: 'subject',
//             key: 'subject',
//         },
//         {
//             title: 'Students Enrolled',
//             dataIndex: 'studentCount',
//             key: 'studentCount',
//         },
//         {
//             title: 'Actions',
//             key: 'actions',
//             render: (text, record) => (
//                 <div className="space-x-2">
//                     <Button
//                         // icon={<EditOutlined />}
//                         onClick={() => handleEditClass(record)}
//                     >
//                         Edit
//                     </Button>
//                     <Button
//                         danger
//                         // icon={<DeleteOutlined />}
//                         onClick={() => handleDeleteClass(record.id)}
//                     >
//                         Delete
//                     </Button>
//                     <Button
//                         type="primary"
//                         onClick={() => handleManageClass(record)}
//                     >
//                         Manage
//                     </Button>
//                 </div>
//             ),
//         },
//     ];
//
//     const handleAddClass = () => {
//         setIsModalVisible(true);
//         setCurrentClass(null);
//         form.resetFields();
//     };
//
//     const handleEditClass = (classRecord) => {
//         setIsModalVisible(true);
//         setCurrentClass(classRecord);
//         form.setFieldsValue(classRecord);
//     };
//
//     const handleDeleteClass =  (classId) => {
//         try {
//             // Implement deletion logic with Supabase
//             // await supabase
//             //     .from('classes')
//             //     .delete()
//             //     .eq('id', classId);
//
//             setClasses(classes.filter(c => c.id !== classId));
//             message.success('Class deleted successfully');
//         } catch (error) {
//             message.error('Failed to delete class');
//         }
//     };
//
//     const handleManageClass = (classRecord) => {
//         // Navigate to class management page or open detailed modal
//         // Implement navigation or modal for managing class details
//     };
//
//     const handleUploadMaterial = async (info) => {
//         const { status } = info.file;
//         if (status === 'done') {
//             try {
//                 // Upload material to Supabase storage
//                 // const { data, error } = await supabase.storage
//                 //     .from('class-materials')
//                 //     .upload(`materials/${info.file.name}`, info.file);
//                 //
//                 // if (error) throw error;
//
//                 message.success(`${info.file.name} file uploaded successfully`);
//             } catch (error) {
//                 message.error(`File upload failed: ${error.message}`);
//             }
//         } else if (status === 'error') {
//             message.error(`${info.file.name} file upload failed.`);
//         }
//     };
//
//     const onFinish = async (values) => {
//         try {
//             if (currentClass) {
//                 // Update existing class
//                 // await supabase
//                 //     .from('classes')
//                 //     .update(values)
//                 //     .eq('id', currentClass.id);
//             } else {
//                 // Create new class
//                 // await supabase
//                 //     .from('classes')
//                 //     .insert(values);
//             }
//
//             // Refresh classes list
//             // In a real app, you'd fetch classes from Supabase
//             setClasses(prevClasses =>
//                 currentClass
//                     ? prevClasses.map(c => c.id === currentClass.id ? {...c, ...values} : c)
//                     : [...prevClasses, values]
//             );
//
//             setIsModalVisible(false);
//             message.success(currentClass ? 'Class updated' : 'Class created');
//         } catch (error) {
//             message.error('Operation failed');
//         }
//     };
//
//     return (
//         <div className="p-6 bg-white">
//             <div className="flex justify-between items-center mb-6">
//                 <Title level={3}>My Classes</Title>
//                 <Button
//                     type="primary"
//                     // icon={<PlusOutlined />}
//                     onClick={handleAddClass}
//                 >
//                     Add New Class
//                 </Button>
//             </div>
//
//             <Table
//                 columns={columns}
//                 dataSource={classes}
//                 rowKey="id"
//             />
//
//             <Modal
//                 title={currentClass ? "Edit Class" : "Create New Class"}
//                 open={isModalVisible}
//                 onCancel={() => setIsModalVisible(false)}
//                 footer={null}
//             >
//                 <Form
//                     form={form}
//                     layout="vertical"
//                     onFinish={onFinish}
//                 >
//                     <Form.Item
//                         name="name"
//                         label="Class Name"
//                         rules={[{ required: true, message: 'Please enter class name' }]}
//                     >
//                         <Input />
//                     </Form.Item>
//
//                     <Form.Item
//                         name="subject"
//                         label="Subject"
//                         rules={[{ required: true, message: 'Please select subject' }]}
//                     >
//                         <Select>
//                             <Option value="math">Mathematics</Option>
//                             <Option value="science">Science</Option>
//                             <Option value="english">English</Option>
//                         </Select>
//                     </Form.Item>
//
//                     <Form.Item
//                         name="materials"
//                         label="Upload Class Materials"
//                     >
//                         <Upload
//                             name="materials"
//                             multiple
//                             onChange={handleUploadMaterial}
//                         >
//                             <Button>Click to Upload</Button>
//                         </Upload>
//                     </Form.Item>
//
//                     <div className="flex justify-end space-x-2">
//                         <Button onClick={() => setIsModalVisible(false)}>
//                             Cancel
//                         </Button>
//                         <Button type="primary" htmlType="submit">
//                             {currentClass ? 'Update' : 'Create'}
//                         </Button>
//                     </div>
//                 </Form>
//             </Modal>
//         </div>
//     );
// };
//
// export default TutorClasses;

// "use client"
// import React, { useState, useEffect } from 'react';
// import {
//     Table,
//     Card,
//     Button,
//     Modal,
//     Form,
//     Input,
//     Select,
//     Upload,
//     message
// } from 'antd';
// import {
//     PlusOutlined,
//     UploadOutlined
// } from '@ant-design/icons';
//
// const { Option } = Select;
//
// const ClassesManagement = () => {
//     const [classes, setClasses] = useState([]);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
//     const [selectedClass, setSelectedClass] = useState(null);
//     const [form] = Form.useForm();
//
//     const columns = [
//         {
//             title: 'Subject',
//             dataIndex: 'subject',
//             key: 'subject'
//         },
//         {
//             title: 'Difficulty',
//             dataIndex: 'difficulty',
//             key: 'difficulty'
//         },
//         {
//             title: 'Description',
//             dataIndex: 'description',
//             key: 'description'
//         },
//         {
//             title: 'Actions',
//             key: 'actions',
//             render: (_, record) => (
//                 <div className="space-x-2">
//                     <Button
//                         type="primary"
//                         onClick={() => handleUploadMaterial(record)}
//                     >
//                         Upload Material
//                     </Button>
//                     <Button
//                         type="default"
//                         onClick={() => handleViewStudents(record)}
//                     >
//                         View Students
//                     </Button>
//                 </div>
//             )
//         }
//     ];
//
//     const handleCreateClass = () => {
//         setIsModalVisible(true);
//     };
//
//     const handleUploadMaterial = (classRecord) => {
//         setSelectedClass(classRecord);
//         setIsUploadModalVisible(true);
//     };
//
//     const handleViewStudents = (classRecord) => {
//         // Implement student list view or modal
//         console.log('View students for class:', classRecord);
//     };
//
//     const onFinish = (values) => {
//         // Implement class creation logic
//         const newClass = {
//             ...values,
//             id: Date.now().toString()
//         };
//         setClasses([...classes, newClass]);
//         setIsModalVisible(false);
//         form.resetFields();
//     };
//
//     const uploadProps = {
//         name: 'file',
//         multiple: false,
//         action: '/api/upload', // Replace with actual upload endpoint
//         onChange(info) {
//             const { status } = info.file;
//             if (status === 'done') {
//                 message.success(`${info.file.name} file uploaded successfully.`);
//             } else if (status === 'error') {
//                 message.error(`${info.file.name} file upload failed.`);
//             }
//         }
//     };
//
//     return (
//         <div className="p-4">
//             <Card
//                 title="My Classes"
//                 extra={
//                     <Button
//                         type="primary"
//                         // icon={<PlusOutlined />}
//                         onClick={handleCreateClass}
//                     >
//                         Create Class
//                     </Button>
//                 }
//             >
//                 <Table
//                     columns={columns}
//                     dataSource={classes}
//                     rowKey="id"
//                 />
//             </Card>
//
//             <Modal
//                 title="Create New Class"
//                 open={isModalVisible}
//                 onCancel={() => setIsModalVisible(false)}
//                 footer={null}
//             >
//                 <Form
//                     form={form}
//                     layout="vertical"
//                     onFinish={onFinish}
//                 >
//                     <Form.Item
//                         name="subject"
//                         label="Subject"
//                         rules={[{ required: true }]}
//                     >
//                         <Input />
//                     </Form.Item>
//                     <Form.Item
//                         name="difficulty"
//                         label="Difficulty"
//                         rules={[{ required: true }]}
//                     >
//                         <Select>
//                             <Option value="BEGINNER">Beginner</Option>
//                             <Option value="INTERMEDIATE">Intermediate</Option>
//                             <Option value="ADVANCED">Advanced</Option>
//                         </Select>
//                     </Form.Item>
//                     <Form.Item
//                         name="description"
//                         label="Description"
//                     >
//                         <Input.TextArea rows={4} />
//                     </Form.Item>
//                     <Form.Item>
//                         <Button type="primary" htmlType="submit">
//                             Create Class
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </Modal>
//
//             <Modal
//                 title="Upload Session Material"
//                 visible={isUploadModalVisible}
//                 onCancel={() => setIsUploadModalVisible(false)}
//                 footer={null}
//             >
//                 <Upload.Dragger {...uploadProps}>
//                     <p className="ant-upload-drag-icon">
//                         {/*<UploadOutlined />*/}
//                     </p>
//                     <p className="ant-upload-text">
//                         Click or drag file to upload materials
//                     </p>
//                     <p className="ant-upload-hint">
//                         Support for PDF, DOCX, PPTX, and video files
//                     </p>
//                 </Upload.Dragger>
//             </Modal>
//         </div>
//     );
// };
//
// export default ClassesManagement;


// 'use client';
//
// import React, { useState } from 'react';
// import { Table, Tag, Button, Modal, Form, Input, Upload, message } from 'antd';
// import { UploadOutlined, ClockCircleOutlined } from '@ant-design/icons';
//
// const TutorSession = () => {
//     const [isCreateSessionModalVisible, setIsCreateSessionModalVisible] = useState(false);
//     const [sessions, setSessions] = useState([
//         {
//             id: '1',
//             student: 'John Doe',
//             subject: 'Mathematics',
//             date: '2024-02-15',
//             time: '14:00 - 15:30',
//             status: 'SCHEDULED',
//         }
//     ]);
//
//     const handleCreateSession = (values) => {
//         const newSession = {
//             id: Math.random().toString(),
//             ...values,
//             status: 'SCHEDULED',
//         };
//         setSessions([...sessions, newSession]);
//         setIsCreateSessionModalVisible(false);
//         message.success('Session created successfully!');
//     };
//
//     const columns = [
//         { title: 'Student', dataIndex: 'student', key: 'student' },
//         { title: 'Subject', dataIndex: 'subject', key: 'subject' },
//         { title: 'Date', dataIndex: 'date', key: 'date' },
//         { title: 'Time', dataIndex: 'time', key: 'time' },
//         {
//             title: 'Actions',
//             key: 'actions',
//             render: (_, session) => (
//                 <>
//                     <Button type="link" className="mr-2">
//                         Chat
//                     </Button>
//                     <Button type="link" className="mr-2" onClick={() => setIsCreateSessionModalVisible(true)}>
//                         Create Session
//                     </Button>
//                 </>
//             ),
//         }
//     ];
//
//     return (
//         <div className="bg-white p-4 rounded-md">
//             <h1 className="text-xl font-bold mb-4">Tutor Sessions</h1>
//             <Table columns={columns} dataSource={sessions} rowKey="id" bordered />
//             <Modal
//                 title="Create Session"
//                 open={isCreateSessionModalVisible}
//                 onCancel={() => setIsCreateSessionModalVisible(false)}
//                 footer={null}
//             >
//                 <Form onFinish={handleCreateSession} layout="vertical">
//                     <Form.Item name="student" label="Student Name" rules={[{ required: true }]}>
//                         <Input />
//                     </Form.Item>
//                     <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
//                         <Input />
//                     </Form.Item>
//                     <Form.Item name="date" label="Date" rules={[{ required: true }]}>
//                         <Input type="date" />
//                     </Form.Item>
//                     <Form.Item name="time" label="Time" rules={[{ required: true }]}>
//                         <Input />
//                     </Form.Item>
//                     <Form.Item name="materials" label="Upload Materials">
//                         <Upload>
//                             <Button icon={<UploadOutlined />}>Click to Upload</Button>
//                         </Upload>
//                     </Form.Item>
//                     <Button type="primary" htmlType="submit" block>
//                         Create
//                     </Button>
//                 </Form>
//             </Modal>
//         </div>
//     );
// };
//
// export default TutorSession;

// 'use client';
//
// import React, { useState } from 'react';
// import { Table, Tag, Button, Modal, Form, Input, Upload, message } from 'antd';
// import { UploadOutlined, ClockCircleOutlined, MessageOutlined, PlusCircleOutlined } from '@ant-design/icons';
//
// const TutorSession = () => {
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [sessions, setSessions] = useState([
//         {
//             id: '1',
//             student: 'John Doe',
//             subject: 'Mathematics',
//             date: '2024-02-15',
//             time: '14:00 - 15:30',
//             status: 'Scheduled',
//             materials: [],
//         },
//         {
//             id: '2',
//             student: 'Jane Smith',
//             subject: 'Physics',
//             date: '2024-02-18',
//             time: '10:00 - 11:00',
//             status: 'Completed',
//             materials: ['lesson1.pdf'],
//         }
//     ]);
//
//     const handleCreateSession = (values) => {
//         const newSession = {
//             id: Math.random().toString(),
//             ...values,
//             status: 'Scheduled',
//             materials: [],
//         };
//         setSessions([...sessions, newSession]);
//         setIsModalVisible(false);
//         message.success('Session created successfully!');
//     };
//
//     const columns = [
//         { title: 'Student', dataIndex: 'student', key: 'student', responsive: ['md'] },
//         { title: 'Subject', dataIndex: 'subject', key: 'subject' },
//         { title: 'Date', dataIndex: 'date', key: 'date' },
//         { title: 'Time', dataIndex: 'time', key: 'time' },
//         {
//             title: 'Status',
//             dataIndex: 'status',
//             key: 'status',
//             render: (status) => (
//                 <Tag
//                     color={status === 'Scheduled' ? 'blue' : 'green'}
//                     icon={<ClockCircleOutlined />}
//                 >
//                     {status}
//                 </Tag>
//             )
//         },
//         {
//             title: 'Actions',
//             key: 'actions',
//             render: (_, session) => (
//                 <div className="flex gap-2">
//                     <Button type="primary" icon={<PlusCircleOutlined />} size="small" onClick={() => setIsModalVisible(true)}>
//                         Create
//                     </Button>
//                     <Button type="default" icon={<MessageOutlined />} size="small">
//                         Chat
//                     </Button>
//                 </div>
//             )
//         }
//     ];
//
//     return (
//         <div className="bg-white p-4 rounded-md flex-1 m-4">
//             <h1 className="hidden md:block text-lg font-semibold">Tutor Sessions</h1>
//             <div className="mt-6">
//             <Table
//                 columns={columns}
//                 dataSource={sessions}
//                 rowKey="id"
//                 bordered
//                 pagination={{ pageSize: 5 }}
//             />
//             </div>
//             <Modal
//                 title="Create Session"
//                 open={isModalVisible}
//                 onCancel={() => setIsModalVisible(false)}
//                 footer={null}
//             >
//                 <Form onFinish={handleCreateSession} layout="vertical">
//                     <Form.Item name="student" label="Student Name" rules={[{ required: true }]}>
//                         <Input />
//                     </Form.Item>
//                     <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
//                         <Input />
//                     </Form.Item>
//                     <Form.Item name="date" label="Date" rules={[{ required: true }]}>
//                         <Input type="date" />
//                     </Form.Item>
//                     <Form.Item name="time" label="Time" rules={[{ required: true }]}>
//                         <Input />
//                     </Form.Item>
//                     <Button type="primary" htmlType="submit" block>
//                         Create Session
//                     </Button>
//                 </Form>
//             </Modal>
//         </div>
//     );
// };
//
// export default TutorSession;

// 'use client';
//
// import React, { useState } from 'react';
// import { Table, Tag, Button, Modal, Form, Input, message } from 'antd';
// import { ClockCircleOutlined, MessageOutlined, EditOutlined } from '@ant-design/icons';
//
// const TutorSession = () => {
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [editingSession, setEditingSession] = useState(null);
//     const [sessions, setSessions] = useState([
//         {
//             id: '1',
//             student: 'John Doe',
//             subject: 'Mathematics',
//             date: '2024-02-15',
//             time: '14:00 - 15:30',
//             status: 'Scheduled',
//             materials: [],
//         },
//         {
//             id: '2',
//             student: 'Jane Smith',
//             subject: 'Physics',
//             date: '2024-02-18',
//             time: '10:00 - 11:00',
//             status: 'Completed',
//             materials: ['lesson1.pdf'],
//         }
//     ]);
//
//     const handleFormSubmit = (values) => {
//         if (editingSession) {
//             // Update the existing session
//             setSessions(sessions.map(session =>
//                 session.id === editingSession.id ? { ...session, ...values } : session
//             ));
//             message.success('Session updated successfully!');
//         } else {
//             // Logic for creating a new session (if needed)
//         }
//         setIsModalVisible(false);
//         setEditingSession(null);
//     };
//
//     const columns = [
//         { title: 'Student', dataIndex: 'student', key: 'student', responsive: ['md'] },
//         { title: 'Subject', dataIndex: 'subject', key: 'subject' },
//         { title: 'Date', dataIndex: 'date', key: 'date' },
//         { title: 'Time', dataIndex: 'time', key: 'time' },
//         {
//             title: 'Status',
//             dataIndex: 'status',
//             key: 'status',
//             render: (status) => (
//                 <Tag
//                     color={status === 'Scheduled' ? 'blue' : 'green'}
//                     icon={<ClockCircleOutlined />}
//                 >
//                     {status}
//                 </Tag>
//             )
//         },
//         {
//             title: 'Actions',
//             key: 'actions',
//             render: (_, session) => (
//                 <div className="flex gap-2">
//                     <Button
//                         type="default"
//                         icon={<EditOutlined />}
//                         size="small"
//                         onClick={() => {
//                             setEditingSession(session);
//                             setIsModalVisible(true);
//                         }}
//                     >
//                         Edit
//                     </Button>
//                     <Button type="default" icon={<MessageOutlined />} size="small">
//                         Chat
//                     </Button>
//                 </div>
//             )
//         }
//     ];
//
//     return (
//         <div className="bg-white p-4 rounded-md flex-1 m-4">
//             <h1 className="hidden md:block text-lg font-semibold">Tutor Sessions</h1>
//             <div className="mt-6">
//                 <Table
//                     columns={columns}
//                     dataSource={sessions}
//                     rowKey="id"
//                     bordered
//                     pagination={{ pageSize: 5 }}
//                 />
//             </div>
//             <Modal
//                 title={editingSession ? 'Edit Session' : 'Create Session'}
//                 open={isModalVisible}
//                 onCancel={() => {
//                     setIsModalVisible(false);
//                     setEditingSession(null);
//                 }}
//                 footer={null}
//             >
//                 <Form
//                     onFinish={handleFormSubmit}
//                     layout="vertical"
//                     initialValues={editingSession || {}}
//                 >
//                     <Form.Item name="student" label="Student Name" rules={[{ required: true }]}>
//                         <Input />
//                     </Form.Item>
//                     <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
//                         <Input />
//                     </Form.Item>
//                     <Form.Item name="date" label="Date" rules={[{ required: true }]}>
//                         <Input type="date" />
//                     </Form.Item>
//                     <Form.Item name="time" label="Time" rules={[{ required: true }]}>
//                         <Input />
//                     </Form.Item>
//                     <Button type="primary" htmlType="submit" block>
//                         {editingSession ? 'Update Session' : 'Create Session'}
//                     </Button>
//                 </Form>
//             </Modal>
//         </div>
//     );
// };
//
// export default TutorSession;

// 'use client';
//
// import React, { useState } from 'react';
// import { Table, Tag, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
// import { ClockCircleOutlined, MessageOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
//
// const TutorSession = () => {
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [editingSession, setEditingSession] = useState(null);
//     const [sessions, setSessions] = useState([
//         {
//             id: '1',
//             student: 'John Doe',
//             subject: 'Mathematics',
//             date: '2024-02-15',
//             time: '14:00 - 15:30',
//             status: 'Scheduled',
//             materials: [],
//         },
//         {
//             id: '2',
//             student: 'Jane Smith',
//             subject: 'Physics',
//             date: '2024-02-18',
//             time: '10:00 - 11:00',
//             status: 'Completed',
//             materials: ['lesson1.pdf'],
//         }
//     ]);
//
//     const handleFormSubmit = (values) => {
//         if (editingSession) {
//             // Update the existing session (reschedule or edit details)
//             setSessions(sessions.map(session =>
//                 session.id === editingSession.id ? { ...session, ...values } : session
//             ));
//             message.success('Session updated successfully!');
//         } else {
//             // Create a new session
//             const newSession = {
//                 id: Math.random().toString(),
//                 ...values,
//                 status: 'Scheduled',
//                 materials: [],
//             };
//             setSessions([...sessions, newSession]);
//             message.success('New session created successfully!');
//         }
//         setIsModalVisible(false);
//         setEditingSession(null);
//     };
//
//     const handleDelete = (id) => {
//         setSessions(sessions.filter(session => session.id !== id));
//         message.success('Session deleted successfully!');
//     };
//
//     const columns = [
//         { title: 'Student', dataIndex: 'student', key: 'student', responsive: ['md'] },
//         { title: 'Subject', dataIndex: 'subject', key: 'subject' },
//         { title: 'Date', dataIndex: 'date', key: 'date' },
//         { title: 'Time', dataIndex: 'time', key: 'time' },
//         {
//             title: 'Status',
//             dataIndex: 'status',
//             key: 'status',
//             render: (status) => (
//                 <Tag
//                     color={status === 'Scheduled' ? 'blue' : 'green'}
//                     icon={<ClockCircleOutlined />}
//                 >
//                     {status}
//                 </Tag>
//             )
//         },
//         {
//             title: 'Actions',
//             key: 'actions',
//             render: (_, session) => (
//                 <div className="flex gap-2">
//                     {session.status !== 'Completed' && (
//                         <Button
//                             type="default"
//                             icon={<EditOutlined />}
//                             size="small"
//                             onClick={() => {
//                                 setEditingSession(session);
//                                 setIsModalVisible(true);
//                             }}
//                         >
//                             {session.status === 'Scheduled' ? 'Reschedule' : 'Edit'}
//                         </Button>
//                     )}
//                     <Button type="default" icon={<MessageOutlined />} size="small">
//                         Chat
//                     </Button>
//                     {session.status === 'Completed' && (
//                         <Popconfirm
//                             title="Are you sure you want to delete this session?"
//                             onConfirm={() => handleDelete(session.id)}
//                             okText="Yes"
//                             cancelText="No"
//                         >
//                             <Button type="danger" icon={<DeleteOutlined />} size="small">
//                                 Delete
//                             </Button>
//                         </Popconfirm>
//                     )}
//                 </div>
//             )
//         }
//     ];
//
//     return (
//         <div className="bg-white p-4 rounded-md flex-1 m-4">
//             <h1 className="hidden md:block text-lg font-semibold">Tutor Sessions</h1>
//             <div className="mt-6">
//                 <Button
//                     type="primary"
//                     className="mb-4"
//                     onClick={() => {
//                         setEditingSession(null);
//                         setIsModalVisible(true);
//                     }}
//                 >
//                     Create New Session
//                 </Button>
//                 <Table
//                     columns={columns}
//                     dataSource={sessions}
//                     rowKey="id"
//                     bordered
//                     pagination={{ pageSize: 5 }}
//                 />
//             </div>
//             <Modal
//                 title={editingSession ? 'Edit Session' : 'Create Session'}
//                 open={isModalVisible}
//                 onCancel={() => {
//                     setIsModalVisible(false);
//                     setEditingSession(null);
//                 }}
//                 footer={null}
//             >
//                 <Form
//                     onFinish={handleFormSubmit}
//                     layout="vertical"
//                     initialValues={editingSession || {}}
//                 >
//                     <Form.Item name="student" label="Student Name" rules={[{ required: true }]}>
//                         <Input />
//                     </Form.Item>
//                     <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
//                         <Input />
//                     </Form.Item>
//                     <Form.Item name="date" label="Date" rules={[{ required: true }]}>
//                         <Input type="date" />
//                     </Form.Item>
//                     <Form.Item name="time" label="Time" rules={[{ required: true }]}>
//                         <Input />
//                     </Form.Item>
//                     <Button type="primary" htmlType="submit" block>
//                         {editingSession ? 'Update Session' : 'Create Session'}
//                     </Button>
//                 </Form>
//             </Modal>
//         </div>
//     );
// };
//
// export default TutorSession;

'use client';

import React, {useState} from 'react';
import {Table, Tag, Button, Modal, Form, Input, message, Popconfirm, Upload, TimePicker} from 'antd';
import {
    ClockCircleOutlined,
    EditOutlined,
    DeleteOutlined,
    FileAddOutlined,
    VideoCameraOutlined,
    MessageOutlined
} from '@ant-design/icons';
import moment from "moment";


const TutorSession = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingSession, setEditingSession] = useState(null);
    const [sessions, setSessions] = useState([
        {
            id: '1',
            student: 'John Doe',
            subject: 'Mathematics',
            date: '2024-02-15',
            startTime: '14:00',
            endTime: '15:30',
            status: 'Pending',
            materials: [],
            zoomLink: null,
        }
    ]);

    const [form] = Form.useForm();

    const handleFormSubmit = (values) => {
        const startTime = moment(values.startTime).format('HH:mm');
        const endTime = moment(values.endTime).format('HH:mm');
        const newValues = {...values, startTime, endTime};

        if (editingSession) {
            setSessions(sessions.map(session =>
                session.id === editingSession.id ? {...session, ...newValues} : session
            ));
            message.success('Session updated successfully!');
        } else {
            const newSession = {
                id: Math.random().toString(),
                ...newValues,
                status: 'Pending',
                materials: [],
                zoomLink: null
            };
            setSessions([...sessions, newSession]);
            message.success('New session created successfully!');
        }

        setIsModalVisible(false);
        setEditingSession(null);
        form.resetFields();
    };

    const handleDelete = (id) => {
        setSessions(sessions.filter(session => session.id !== id));
        message.success('Session deleted successfully!');
    };

    const handleSchedule = (session) => {
        const zoomLink = `https://zoom.us/j/${Math.floor(1000000000 + Math.random() * 9000000000)}`;
        setSessions(sessions.map(s =>
            s.id === session.id ? {...s, status: 'Scheduled', zoomLink} : s
        ));
        message.success('Session scheduled successfully!');
    };

    const handleMaterialUpload = (sessionId, file) => {
        const updatedSessions = sessions.map(session => {
            if (session.id === sessionId) {
                return {...session, materials: [...session.materials, file.name]};
            }
            return session;
        });
        setSessions(updatedSessions);
        message.success(`${file.name} uploaded successfully!`);
    };

    const columns = [
        {
            title: 'Student',
            dataIndex: 'student',
            key: 'student',
            responsive: ['md']
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
            key: 'time',
            render: (_, session) => `${session.startTime} - ${session.endTime}`
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag
                    color={status === 'Pending' ? 'orange' : 'green'}
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
                                startTime: moment(session.startTime, 'HH:mm'),
                                endTime: moment(session.endTime, 'HH:mm')
                            });
                        }}
                    >
                        {session.status === 'Pending' ? 'Edit' : 'Reschedule'}
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

                    {session.status === 'Pending' && (
                        <Button
                            type="primary"
                            icon={<VideoCameraOutlined/>}
                            size="small"
                            onClick={() => handleSchedule(session)}
                        >
                            Schedule
                        </Button>
                    )}

                    {session.status === 'Scheduled' && session.zoomLink && (
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

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4">
            <h1 className="hidden md:block text-lg font-semibold">Tutor Sessions</h1>
            <div className="mt-6">
                <Button
                    type="primary"
                    className="mb-4"
                    onClick={() => {
                        setEditingSession(null);
                        setIsModalVisible(true);
                        form.resetFields();
                    }}
                >
                    Create New Session
                </Button>
                <Table
                    columns={columns}
                    dataSource={sessions}
                    rowKey="id"
                    bordered
                    pagination={{pageSize: 5}}
                />
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
                                    style={{ flex: 1 }}
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
                                    style={{ flex: 1 }}
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







