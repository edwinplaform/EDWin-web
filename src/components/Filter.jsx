"use client";
import {useState} from "react";
import {Button, Input, Select} from "antd";
import { SearchOutlined } from "@ant-design/icons";

const {Search} = Input;

const Filter = ({onFilterChange}) => {
    const [subject, setSubject] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    const subjects = [
        { value: "Mathematics", label: "Mathematics" },
        { value: "Physics", label: "Physics" },
        { value: "Chemistry", label: "Chemistry" },
        { value: "Biology", label: "Biology" },
        { value: "English", label: "English" },
        { value: "History", label: "History" },
        { value: "Geography", label: "Geography" },
        { value: "Psychology", label: "Psychology" },
        { value: "Sociology", label: "Sociology" },
        { value: "Computer Science", label: "Computer Science" },
        { value: "Economics", label: "Economics" },
        { value: "Spanish", label: "Spanish" },
        { value: "French", label: "French" },
    ];

    const handleSubjectChange = (value) => {
        setSubject(value);
        onFilterChange({subject: value, searchKeyword});
    };

    const handleSearch = (value) => {
        setSearchKeyword(value);
        onFilterChange({subject, searchKeyword: value});
    };

    const handleReset = () => {
        setSubject("");
        setSearchKeyword("");
        onFilterChange({ subject: "", searchKeyword: "" });
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in">
                {/* Subject Filter */}
                <Select
                    style={{width: "100%", maxWidth: 300}}
                    allowClear
                    placeholder="Filter by Subject"
                    onChange={handleSubjectChange}
                    value={subject}
                    options={subjects}
                    className="w-full md:w-auto"
                    dropdownStyle={{borderRadius: "8px"}}
                />

                {/* Search by Name */}
                <Search
                    placeholder="Search by Tutor Name"
                    allowClear
                    onSearch={handleSearch}
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    style={{width: "100%", maxWidth: 300}}
                    enterButton={<Button type="primary" icon={<SearchOutlined/>}/>}
                    className="w-full md:w-auto"
                />

                {/* Reset Button */}
                <Button
                    onClick={handleReset}
                    className="w-full md:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                    Reset Filters
                </Button>
            </div>
        </div>
    );
};

export default Filter;