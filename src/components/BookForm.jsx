"use client"
import React, {useState} from "react";
import {Button, DatePicker, Form, Input, message, Modal, Select, TimePicker} from "antd";
import moment from "moment";
import {DateInput} from "@nextui-org/react";

const {Option} = Select;

const BookForm = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [booking, setBooking] = useState([]);
    const [form] = Form.useForm();

    const tutorAvailableDays = [1, 3, 5];
    const tutorAvailableStart = moment("09:00", "HH:mm");
    const tutorAvailableEnd = moment("17:00", "HH:mm");

    const disableDate = (current) => {
        return current && !tutorAvailableDays.includes(current.day());
    };

    // const disabledHours = () => {
    //     const hours = Array.from({ length: 24 }, (_, i) => i);
    //     return hours.filter(
    //         (hour) => hour < tutorAvailableStart.hour() || hour >= tutorAvailableEnd.hour()
    //     );
    // };
    //
    // const disabledMinutes = (selectedHour) => {
    //     if (selectedHour === tutorAvailableStart.hour()) {
    //         return Array.from({ length: 60 }, (_, i) => i).filter(
    //             (minute) => minute < tutorAvailableStart.minute()
    //         );
    //     }
    //     if (selectedHour === tutorAvailableEnd.hour() - 1) {
    //         return Array.from({ length: 60 }, (_, i) => i).filter(
    //             (minute) => minute >= tutorAvailableEnd.minute()
    //         );
    //     }
    //     return [];
    // };

    // const disabledTime = (current) => {
    //     const startHour = tutorAvailableStart.hour();
    //     const endHour = tutorAvailableEnd.hour();
    //
    //     return {
    //         disabledHours: () => {
    //             const hours = Array.from({ length: 24 }, (_, i) => i);
    //             return hours.filter((hour) => hour < startHour || hour >= endHour);
    //         },
    //         disabledMinutes: (selectedHour) => {
    //             if (selectedHour === startHour) {
    //                 return Array.from({ length: 60 }, (_, i) => i).filter(
    //                     (minute) => minute < tutorAvailableStart.minute()
    //                 );
    //             }
    //             if (selectedHour === endHour - 1) {
    //                 return Array.from({ length: 60 }, (_, i) => i).filter(
    //                     (minute) => minute >= tutorAvailableEnd.minute()
    //                 );
    //             }
    //             return [];
    //         },
    //         disabledSeconds: () => Array.from({ length: 60 }, (_, i) => i), // Disable all seconds if needed
    //     };
    // };


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
            id: Date.now().toString(),
            date: date.format("YYYY-MM-DD"),
            startTime: startTime.format("HH:mm"),
            endTime: endTime.format("HH:mm"),
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
                        rules={[{required: true, message: "Please enter your grade!"}]}
                    >
                        {/*<Select placeholder="Select your grade">*/}
                        {/*    <Option value="12">Grade 12</Option>*/}
                        {/*    <Option value="13">Grade 13</Option>*/}
                        {/*</Select>*/}
                        <Input placeholder="Enter your grade"/>
                    </Form.Item>
                    <Form.Item
                        name="comment"
                        label="Comment"
                    >
                        <Input.TextArea placeholder="Type additional details here" rows={4}/>
                    </Form.Item>
                    {/*<Form.Item*/}
                    {/*    label="Desired date/time"*/}
                    {/*>*/}
                    {/*    <div className="flex gap-3 justify-between">*/}
                    {/*        <Form.Item*/}
                    {/*            name="date"*/}
                    {/*            rules={[{required: true, message: "Please select a day!"}]}*/}
                    {/*            noStyle*/}
                    {/*        >*/}
                    {/*            <Select placeholder="Choose Day" style={{flex: 1}}>*/}
                    {/*                <Option value="monday">Monday</Option>*/}
                    {/*                <Option value="tuesday">Tuesday</Option>*/}
                    {/*                <Option value="wednesday">Wednesday</Option>*/}
                    {/*                <Option value="thursday">Thursday</Option>*/}
                    {/*                <Option value="friday">Friday</Option>*/}
                    {/*            </Select>*/}
                    {/*        </Form.Item>*/}
                    {/*        <Form.Item*/}
                    {/*            name="time"*/}
                    {/*            rules={[{required: true, message: "Please select a time!"}]}*/}
                    {/*            noStyle*/}
                    {/*        >*/}
                    {/*            <Select placeholder="Choose Time" style={{flex: 1}}>*/}
                    {/*                <Option value="6.30">6:30AM</Option>*/}
                    {/*                <Option value="7.30">7:30AM</Option>*/}
                    {/*                <Option value="8.30">8:30AM</Option>*/}
                    {/*                <Option value="9.30">9:30AM</Option>*/}
                    {/*                <Option value="10.30">10:30AM</Option>*/}
                    {/*                <Option value="11.30">11:30AM</Option>*/}
                    {/*            </Select>*/}
                    {/*        </Form.Item>*/}
                    {/*    </div>*/}
                    {/*</Form.Item>*/}
                    <Form.Item
                        name="date"
                        label="Desired date"
                        rules={[{required: true, message: "Please select a day!"}]}
                    >
                        <DatePicker disabledDate={disableDate}
                                    style={{width:"100%"}}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Time"
                        required
                    >
                        <div className="flex gap-3 justify-between">
                            <Form.Item
                                name="startTime"
                                rules={[{ required: true, message: "Please select a start time!" }]}
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
                                rules={[{ required: true, message: "Please select an end time!" }]}
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
                </Form>
            </Modal>
        </div>
    );
};

export default BookForm;