"use client"

import TableSearch from "@/components/TableSearch";
import {Button, message, Modal, Space, Spin, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {useDeleteUser, useUpdateTutorStatus, useUsers} from "@/hooks/useUsers";

const Tutors = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
    const [selectedTutorKey, setSelectedTutorKey] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [tutorToReject, setTutorToReject] = useState(null);

    const {data: tutors, isLoading, error} = useUsers("TUTOR");

    const deleteUserMutation = useDeleteUser();
    const updateTutorStatusMutation = useUpdateTutorStatus();

    const transformedData = tutors?.data.map(tutor => ({
        key: tutor.userId,
        name: `${tutor.firstName} ${tutor.lastName}`,
        phone: tutor.phone,
        address: tutor.address,
        subjects: tutor.Tutor.subjects,
        qualifications: tutor.Tutor.qualifications,
        rate: `${tutor.Tutor.hourlyRate} ${tutor.Tutor.currency}/hour`,
        certificate: tutor.Tutor.certificateUrl,
        status: tutor.Tutor.status,
    }));

    console.log("------Transformed Data:", transformedData);
    console.error("-------Error updating tutor status:", error);


    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const filteredData = transformedData?.filter(tutor =>
        tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const showDeleteConfirm = (key) => {
        setSelectedTutorKey(key);
        setIsModalVisible(true)
    }

    const showRejectConfirm = (userId) => {
        console.log("Showing reject confirmation for ID:", userId);
        setTutorToReject(userId);
        setIsRejectModalVisible(true);
    };

    const handleAccept = (userId) => {
        console.log("Accepting tutor with ID:", userId);
        updateTutorStatusMutation.mutate({userId: userId, data: {status: "ACCEPTED"}}, {
            onSuccess: () => {
                message.success('Tutor request accepted successfully!');
            },
            onError: () => {
                console.error("Error accepting tutor:", error);
                message.error('Failed to accept tutor request.');
            }
        });
    };

    const handleReject = () => {
        if (tutorToReject) {
            console.log("Rejecting tutor with ID:", tutorToReject);
            updateTutorStatusMutation.mutate({userId: tutorToReject, data: {status: "REJECTED"}}, {
                onSuccess: () => {
                    message.success('Tutor request rejected successfully!');
                    setIsRejectModalVisible(false);
                    setTutorToReject(null);
                },
                onError: () => {
                    console.error("Error rejecting tutor:", error);
                    message.error('Failed to reject tutor request.');
                }
            });
        } else {
            console.error('Invalid tutor ID. tutorToReject is null.');
            message.error('Invalid tutor ID.');
        }
    };

    const handleDelete = () => {
        try {
            // setData(data.filter(tutor => tutor.key !== selectedTutorKey));
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
    };

    const handleRejectCancel = () => {
        setIsRejectModalVisible(false);
        setTutorToReject(null);
    };

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
                        <div key={qualification.courseName} className="pb-2">
                            <p className="font-semibold">{qualification.courseName}</p>
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
                <a href={certificate} target="_blank" rel="noopener noreferrer">View Certificate</a>
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
                                onClick={() => showRejectConfirm(record.key)}
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

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4">
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch onSearch={handleSearch}/>
                </div>
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
            <Modal
                title="Confirm Rejection"
                open={isRejectModalVisible}
                onOk={handleReject}
                onCancel={handleRejectCancel}
                okText="Yes, Reject"
                cancelText="No, Cancel"
            >
                <p>Are you sure you want to reject this tutor?</p>
            </Modal>
        </div>
    )
};

export default Tutors;