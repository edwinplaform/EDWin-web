"use client"

import TableSearch from "@/components/TableSearch";
import {Button, message, Modal, Space, Spin, Table, Tag} from "antd";
import {useEffect, useState} from "react";
// import {fetchTutors, deleteTutor} from "@/services/tutorService";


const Tutors = () => {

    const [data, setData] = useState([
        {
            key: '1',
            name: 'John Brown',
            phone: '0123456789',
            address: 'New York No. 1 Lake Park',
            subjects: ["Sinhala", "History"],
            qualifications: [
                {course: "Bachelor of Arts in Sinhala", institute: "University of Colombo"},
                {course: "Master of History", institute: "University of Peradeniya"}
            ],
            rate: "$25/hour",
            certificate: "https://example.com/certificate1",
            status: "PENDING"
        },
        {
            key: '2',
            name: 'Jim Green',
            phone: '0123456789',
            address: 'Los Angeles No. 2 Lake Park',
            subjects: ["Mathematics", "Physics"],
            qualifications: [
                {course: "Bachelor of Science in Mathematics", institute: "California Institute of Technology"},
                {course: "Master of Science in Physics", institute: "Stanford University"}
            ],
            rate: "$30/hour",
            certificate: "https://example.com/certificate2",
            status: "PENDING"
        },
        {
            key: '3',
            name: 'Joe Black',
            phone: '0123456789',
            address: 'Chicago No. 3 Lake Park',
            subjects: ["English", "Literature"],
            qualifications: [
                {course: "Bachelor of Arts in English Literature", institute: "Harvard University"},
                {course: "Master of Arts in English", institute: "Yale University"}
            ],
            rate: "$28/hour",
            certificate: "https://example.com/certificate3",
            status: "PENDING"
        },
        {
            key: '4',
            name: 'Alice Smith',
            phone: '0123456789',
            address: 'Houston No. 4 Lake Park',
            subjects: ["Biology", "Chemistry"],
            qualifications: [
                {course: "Bachelor of Science in Biology", institute: "University of Texas"},
                {course: "PhD in Chemistry", institute: "MIT"}
            ],
            rate: "$35/hour",
            certificate: "https://example.com/certificate4",
            status: "PENDING"
        },
        {
            key: '5',
            name: 'Bob Johnson',
            phone: '0123456789',
            address: 'Phoenix No. 5 Lake Park',
            subjects: ["Computer Science", "Programming"],
            qualifications: [
                {course: "Bachelor of Science in Computer Science", institute: "University of Arizona"},
                {course: "Master of Science in Software Engineering", institute: "University of California"}
            ],
            rate: "$40/hour",
            certificate: "https://example.com/certificate5",
            status: "PENDING"
        },
        {
            key: '6',
            name: 'Emma Wilson',
            phone: '0123456789',
            address: 'Philadelphia No. 6 Lake Park',
            subjects: ["Art", "Design"],
            qualifications: [
                {course: "Bachelor of Fine Arts", institute: "Rhode Island School of Design"},
                {course: "Master of Arts in Design", institute: "Savannah College of Art and Design"}
            ],
            rate: "$32/hour",
            certificate: "https://example.com/certificate6",
            status: "PENDING"
        },
    ]);


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Contact Number',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: "Subjects",
            dataIndex: "subjects",
            key: "subjects",
            render: (_, {subjects}) => (
                <>
                    {subjects.map((subject) => {
                        return (
                            <p key={subject}>{subject}</p>
                        )
                    })}
                </>
            )
        },
        {
            title: "Qualifications",
            dataIndex: "qualifications",
            key: "qualifications",
            render: (_, {qualifications}) => (
                <>
                    {qualifications.map((qualification) => (
                        <div key={qualification.course} className="pb-2">
                            <p className="font-semibold">{qualification.course}</p>
                            <p>{qualification.institute}</p>
                        </div>
                    ))}
                </>
            )
        },
        {
            title: "Hourly Rate",
            dataIndex: "rate",
            key: "rate",
        },
        {
            title: "Certificate",
            dataIndex: "certificate",
            key: "certificate",
            render: (_, {certificate}) => (
                <a href="https://www.youtube.com/" target="_blank">View Certificate</a>
            )
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
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
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {record.status === "PENDING" ? (
                        <div className="flex flex-row gap-2">
                            <Button
                                color="primary"
                                onClick={() => handleAccept(record.key)}
                                style={{backgroundColor: '#4CAF50', borderColor: '#4CAF50', color: 'white'}}
                            >Accept</Button>
                            <Button
                                color="default"
                                onClick={() => handleReject(record.key)}
                                style={{backgroundColor: '#f44336', borderColor: '#f44336', color: 'white'}}
                            >Reject</Button>
                        </div>
                    ) : (
                        <Button danger onClick={() => showDeleteConfirm(record.key)}>Delete</Button>
                    )}
                </Space>
            ),
        },
    ];

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTutorKey, setSelectedTutorKey] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    // const loadTutors = async () => {
    //     setLoading(true);
    //     try {
    //         const tutors = await fetchTutors();
    //         setData(tutors);
    //     } catch (error) {
    //         message.error("Failed to fetch tutors.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    //
    // useEffect(() => {
    //     loadTutors();
    // }, []);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const filteredData = data.filter(tutor =>
        tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const showDeleteConfirm = (key) => {
        setSelectedTutorKey(key);
        setIsModalVisible(true)
    }

    const handleAccept = (key) => {
        setData(data.map(tutor =>
            tutor.key === key ? {...tutor, status: "ACCEPTED"} : tutor
        ));
        message.success('Tutor request accepted successfully!');
    };

    const handleReject = (key) => {
        setData(data.map(tutor =>
            tutor.key === key ? {...tutor, status: "REJECTED"} : tutor
        ));
        message.success('Tutor request rejected successfully!');
    };

    const handleDelete = () => {
        try {
            // await deleteTutor(selectedTutorKey);
            setData(data.filter(tutor => tutor.key !== selectedTutorKey));
            message.success('Tutor request deleted successfully!');
        } catch (err) {
            message.error("Failed to delete tutors.");
        } finally {
            setIsModalVisible(false);
            setSelectedTutorKey(null);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedTutorKey(null);
    }


    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4">
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch onSearch={handleSearch}/>
                </div>
            </div>
            <div className="mt-6">
                {loading ? (
                    <Spin style={{
                        display:"flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                        width: "100vw",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        backgroundColor: "transparent",
                        zIndex: 9999}} size="large"/>
                ) : (
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        pagination={{pageSize: 5}}
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
                <p>Are you sure you want to delete this tutor?</p>
            </Modal>
        </div>
    )
}

export default Tutors;