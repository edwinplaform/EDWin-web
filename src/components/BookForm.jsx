"use client"
import React, {useState} from "react";
import { DatePicker, TimePicker, TreeSelect, Input } from 'antd';
const {TextArea} = Input;


const treeData = [
    {
        value: 'Maths',
        title: 'Maths',
        children: [
            {
                value: 'Maths Grade 6',
                title: 'Maths Grade 6',
            },
            {
                value: 'Maths Grade 7',
                title: 'Maths Grade 7',
            },
            {
                value: 'Maths Grade 8',
                title: 'Maths Grade 8',
            },
            {
                value: 'Maths Grade 9',
                title: 'Maths Grade 9',
            },
            {
                value: 'Maths Grade 10',
                title: 'Maths Grade 10',
            },
            {
                value: 'Maths Grade 11',
                title: 'Maths Grade 11',
            },
        ],
    },
    {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
            {
                value: 'leaf11',
                title: (
                    <b
                        style={{
                            color: '#08c',
                        }}
                    >
                        leaf11
                    </b>
                ),
            },
        ],
    },
];

const BookForm = () => {

    const [value, setValue] = useState();
    const [message, setMessage] = useState();

    const onChangeDate = (date, dateString) => {
        console.log(date, dateString);
    };

    const timeChange = (time) => {
        console.log(time);
    }
    const onChange = (newValue) => {
        setValue(newValue);
        console.log(newValue);
    };
    const onPopupScroll = (e) => {
        console.log('onPopupScroll', e);
    };

    const onChangeMessage = (e) => {
        console.log(e.target.value);
    }

    return (
        <div>
            <form>
                <div className="mb-4">
                    <div className="flex justify-between">
                        <div>
                            <label className="block text-gray-900 mb-1">Date:</label>
                            <div className="w-full border-customDarkGreen rounded-lg text-gray-400">
                                <DatePicker onChange={onChangeDate}/>
                            </div>
                            <p className="text-red-500 text-sm mt-1">Please select a day</p>
                        </div>
                        <div>
                            <label className="block text-gray-900 mb-1">Duration:</label>
                            <div>
                                <TimePicker.RangePicker onChange={timeChange}/>
                            </div>
                            <p className="text-sm text-red-500 mt-1">Please select time duration</p>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-900 mb-1">Subject:</label>
                    <TreeSelect
                        showSearch
                        style={{
                            width: '100%',
                        }}
                        value={value}
                        dropdownStyle={{
                            maxHeight: 400,
                            overflow: 'auto',
                        }}
                        placeholder="Pick subject and level"
                        allowClear
                        treeDefaultExpandAll
                        onChange={onChange}
                        treeData={treeData}
                        onPopupScroll={onPopupScroll}
                    />
                    <p className="text-sm text-red-500 mt-1">Please select subject and level</p>
                </div>
                <div>
                    <label className="block text-gray-900 mb-1">(Optional) Message to Amal:</label>
                    <TextArea rows={3} placeholder="Explain what help you are looking for and why." onChange={onChangeMessage} />
                </div>
                <button type="submit" className="w-full p-3 font-bold bg-customLightGreen text-customDarkGreen rounded-full hover:bg-customMiddleGreen my-4">Book lesson</button>
                <button type="button" className="w-full p-3 font-bold bg-white text-customDarkGreen border border-customDarkGreen rounded-full hover:bg-customMiddleGreen hover:border-0">Message tutor</button>
            </form>
        </div>
    )

};
export default BookForm;