"use client";
import {useState} from "react";
import {Input, Select} from "antd";

const {Search} = Input;

const Filter = ({onFilterChange}) => {
    const [subject, setSubject] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    const handleSubjectChange = (value) => {
        setSubject(value);
        onFilterChange({subject: value, searchKeyword});
    };

    const handleSearch = (value) => {
        setSearchKeyword(value);
        onFilterChange({subject, searchKeyword: value});
    };

    return (
        <div className="p-8 bg-cusPurple w-full justify-self-center rounded-xl">
            <div
                className="flex flex-col md:flex-row items-center justify-self-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="w-full md:w-auto">
                    <Select
                        style={{width: 300}}
                        allowClear
                        placeholder="Filter by Subject"
                        onChange={handleSubjectChange}
                        options={[
                            {value: "Maths", label: "Maths"},
                            {value: "Physics", label: "Physics"},
                            {value: "Psychology", label: "Psychology"},
                            {value: "Sociology", label: "Sociology"},
                        ]}
                    />
                </div>
                <div className="w-full md:w-auto items-center justify-items-center">
                    <Search
                        placeholder="Search by Name"
                        allowClear
                        onSearch={handleSearch}
                        style={{width: 300}}
                    />
                </div>
            </div>
        </div>
    );
};

export default Filter;