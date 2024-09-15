"use client"
import { Select, Input } from 'antd';
const {Search} = Input;

const Filter = (props) => {

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <div>
            <div className="p-8">
                <div className="bg-customLime p-8 rounded-3xl fle flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-20">
                        <div className="">
                            <p className="block text-gray-700 my-2">Subject and level</p>
                            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                                <Select
                                    style={{
                                        width: 250,
                                        height: 40,
                                    }}
                                    allowClear
                                    options={[
                                        {
                                            value: 'lucy',
                                            label: 'Lucy',
                                        },
                                        {
                                            value: 'maths',
                                            label: 'Maths',
                                        },
                                    ]}
                                    placeholder="Enter your subject"
                                    onChange={handleChange}
                                    className=""
                                />
                                <Select
                                    style={{
                                        width: 150,
                                        height: 40,
                                    }}
                                    allowClear
                                    options={[
                                        {
                                            value: '6',
                                            label: 'Grade 6',
                                        },
                                        {
                                            value: '7',
                                            label: 'Grade 7',
                                        },
                                    ]}
                                    placeholder="Level"
                                    onChange={handleChange}
                                    className=""
                                />
                            </div>
                        </div>
                        <div>
                            <p className="block text-gray-700 my-2">Search Name</p>
                            <Input
                                placeholder="Search by name or keyword"
                                style={{
                                    width: 250,
                                    height: 40,
                                }}
                            />

                        </div>
                    </div>
                </div>
                <div className="mt-16 text-center">
                    <h1 className="text-customDarkGreen text-5xl font-bold">
                    <span className="text-customLightGreen mr-3">
                        2000
                    </span>
                        tutors for lessons
                    </h1>
                </div>
            </div>
        </div>
    );
}


export default Filter;