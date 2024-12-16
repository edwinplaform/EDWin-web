"use client"
import React, {useState} from "react";
import {Button, DatePicker, Form, Input, message, Modal, Select, TimePicker} from "antd";
import moment from "moment";
import {useCreateAppointment} from "@/hooks/useAppointments";
import {useUser} from "@clerk/nextjs";

const {Option} = Select;

const BookForm = ({
                      tutorId,
                      subjects,
                      availableDays,
                      name,
                      availabilityStart,
                      availabilityEnd
                  }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const createAppointmentMutation = useCreateAppointment();

    const {user} = useUser();
    const studentId = user.id;


    const disableDate = (current) => {
        return current && !availableDays.includes(current.format('dddd').toLowerCase());
    };

    // const generateTimeSlots = (start,end) => {
    //     const startTime = moment(start,"HH:mm");
    //     const endTime = moment(end,"HH:mm");
    //     const slots = [];
    //
    //     while (startTime.isBefore(endTime)){
    //         slots.push(startTime.format("HH:mm"));
    //         startTime.add(30,'minutes');
    //     }
    //
    //     return slots;
    // };
    //
    // const availableTimeSlots = generateTimeSlots(availabilityStart,availabilityEnd);


    const handleCreateBook = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const onFinish = (values) => {
        const {date, startTime, endTime} = values;

        // if (!date || !time) {
        //     message.error("Please select both a date and time.");
        //     return;
        // }
        const startMoment = moment(startTime);
        const endMoment = moment(endTime);

        // if (!endMoment.isAfter(startMoment)) {
        //     message.error("End time must be after the start time.");
        //     return;
        // }

        // if (
        //     !moment(startTime).isBetween(tutorAvailableStart, tutorAvailableEnd, null, "[)") ||
        //     !moment(endTime).isBetween(tutorAvailableStart, tutorAvailableEnd, null, "(]")
        // ) {
        //     message.error("Selected time is outside the tutor's available hours.");
        //     return;
        // }

        const newBooking = {
            ...values,
            tutorId: tutorId,
            studentId: studentId,
            date: date.format("YYYY-MM-DD"),
            startTime: startTime.format("HH:mm"),
            endTime: endTime.format("HH:mm"),
        };

        createAppointmentMutation.mutate(newBooking, {
            onSuccess: () => {
                message.success("Lesson request sent successfully!");
                setIsModalVisible(false);
                form.resetFields();
            },
            onError: (error) => {
                message.error(`Error creating appointment: ${error.message}`);
            }
        });

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
                title={`Request Lesson with ${name}`}
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
                            {subjects.map((subject, index) => (
                                <Option key={index} value={subject}>{subject}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="grade"
                        label="Grade"
                        rules={[{required: true, message: "Please enter your grade!"}]}
                    >
                        <Input placeholder="Enter your grade"/>
                    </Form.Item>
                    <Form.Item
                        name="comment"
                        label="Comment"
                    >
                        <Input.TextArea placeholder="Type additional details here" rows={4}/>
                    </Form.Item>
                    <Form.Item
                        name="date"
                        label="Desired date"
                        rules={[{required: true, message: "Please select a day!"}]}
                    >
                        <DatePicker disabledDate={disableDate}
                                    style={{width: "100%"}}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Time"
                        required
                    >
                        <div className="flex gap-3 justify-between">
                            <Form.Item
                                name="startTime"
                                rules={[{required: true, message: "Please select a start time!"}]}
                                noStyle
                            >
                                <TimePicker
                                    format="HH:mm"
                                    placeholder="Start Time"
                                    style={{flex: 1}}
                                    // disableHours={() => availableTimeSlots.map(time => moment(time,"HH:mm").hour())}
                                    // minuteStep={30}
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
                                    style={{flex: 1}}
                                    // disableHours={() => availableTimeSlots.map(time => moment(time,"HH:mm").hour())}
                                    // minuteStep={30}
                                />
                            </Form.Item>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default BookForm;