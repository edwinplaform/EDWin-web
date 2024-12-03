"use client"
import React, {useState} from "react";
import {Button, Form, Input, message, Modal, Select} from "antd";

const {Option} = Select;

const BookForm = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [booking, setBooking] = useState([]);
    const [form] = Form.useForm();

    const handleCreateBook = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const onFinish = (values) => {
        const {date, time} = values;

        if (!date || !time) {
            message.error("Please select both a date and time.");
            return;
        }

        const newBooking = {
            ...values,
            id: Date.now().toString()
        };

        setBooking((prev) => {
            const updateBooking = [...prev,newBooking];
            console.log("Booking: ", updateBooking);
            return updateBooking;
        });
        // setBooking(newBooking);
        setIsModalVisible(false);
        form.resetFields();
        message.success("Lesson request sent successfully!");

    };

    return (
        <div>
            <Button
                onClick={handleCreateBook}
                className="bg-[#dbf1ff] text-[#275e6c] font-bold mt-8 px-4 py-2 rounded-full"
            >
                Request Lesson
            </Button>
            <Modal
                title="Request Lesson with Amal."
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button
                        key="cancel"
                        onClick={handleCancel}
                        className="bg-gray-300 text-black rounded-lg"
                    >
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={() => form.submit()}
                        className="bg-blue-700-500"
                    >
                        Send Request
                    </Button>,
                ]}
            >
                <p className="font-semibold text-gray-500 mb-3">Request the lesson by completing the form below</p>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="student"
                        label="Student"
                        rules={[{required: true, message: "Please enter your name!"}]}
                    >
                        <Input placeholder="Enter your name"/>
                    </Form.Item>
                    <Form.Item
                        name="subject"
                        label="Subject"
                        rules={[{required: true, message: "Please select a subject!"}]}
                    >
                        <Select placeholder="Choose a subject">
                            <Option value="Maths">Maths</Option>
                            <Option value="Physics">Physics</Option>
                            <Option value="Chemistry">Chemistry</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="grade"
                        label="Grade"
                        rules={[{required: true, message: "Please select a grade!"}]}
                    >
                        <Select placeholder="Select your grade">
                            <Option value="12">Grade 12</Option>
                            <Option value="13">Grade 13</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="comment"
                        label="Comment"
                    >
                        <Input.TextArea placeholder="Type additional details here" rows={4}/>
                    </Form.Item>
                    <Form.Item
                        label="Desired date/time"
                    >
                        <div className="flex gap-3 justify-between">
                            <Form.Item
                                name="date"
                                rules={[{required: true, message: "Please select a day!"}]}
                                noStyle
                            >
                                <Select placeholder="Choose Day" style={{flex: 1}}>
                                    <Option value="monday">Monday</Option>
                                    <Option value="tuesday">Tuesday</Option>
                                    <Option value="wednesday">Wednesday</Option>
                                    <Option value="thursday">Thursday</Option>
                                    <Option value="friday">Friday</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="time"
                                rules={[{required: true, message: "Please select a time!"}]}
                                noStyle
                            >
                                <Select placeholder="Choose Time" style={{flex: 1}}>
                                    <Option value="6.30">6:30AM</Option>
                                    <Option value="7.30">7:30AM</Option>
                                    <Option value="8.30">8:30AM</Option>
                                    <Option value="9.30">9:30AM</Option>
                                    <Option value="10.30">10:30AM</Option>
                                    <Option value="11.30">11:30AM</Option>
                                </Select>
                            </Form.Item>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default BookForm;