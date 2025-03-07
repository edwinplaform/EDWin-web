"use client"
import TutorCard from "@/components/TutorCard";
import Filter from "@/components/Filter";
import React, {useState} from "react";
import {useTutorsByStatus, useUsers} from "@/hooks/useUsers";
import {Empty, Spin} from "antd";

const TutorPage = () => {

    const [filteredProfiles, setFilteredProfiles] = useState([]);

    const {data: response, isLoading, error} = useTutorsByStatus("ACCEPTED");
    const tutors = response?.data || [];

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <Spin size="large"/>
        </div>
    }

    if (error) {
        return <div className="text-center text-red-500 p-8">Error fetching tutors: {error}</div>
    }

    const handleFilterChange = ({subject, searchKeyword}) => {
        let filtered = tutors;

        if (subject) {
            filtered = filtered.filter((tutor) => tutor.subjects.includes(subject));
        }
        if (searchKeyword) {
            filtered = filtered.filter((tutor) =>
                `${tutor.User.firstName} ${tutor.User.lastName}`
                    .toLowerCase()
                    .includes(searchKeyword.toLowerCase())
            );
        }

        setFilteredProfiles(filtered);
    };

    const profileToDisplay = filteredProfiles.length > 0 ? filteredProfiles : tutors;

    return (
        <div className="bg-bgColorWhite min-h-screen">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-12">
                <h1 className="text-4xl font-bold">Find Your Perfect Tutor</h1>
                <p className="mt-2 text-lg">Explore our expert tutors and book your session today!</p>
            </div>
            {/*<div className="justify-center items-center p-6">*/}
            {/*    <Filter onFilterChange={handleFilterChange}/>*/}
            {/*</div>*/}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <Filter onFilterChange={handleFilterChange}/>

                {/*<div className="flex justify-center flex-wrap px-6 pb-8">*/}
                <div className="mt-8 flex justify-center flex-wrap gap-6">
                    {profileToDisplay?.length > 0 ? (
                        profileToDisplay.map((tutor) => (
                            <TutorCard
                                key={tutor.userId}
                                profile={{
                                    id: tutor.userId,
                                    name: `${tutor.User.firstName} ${tutor.User.lastName}`,
                                    image: tutor.User.profilePhotoUrl || "https://images.pexels.com/photos/4116672/pexels-photo-4116672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Replace with a default image URL if necessary
                                    rate: `${tutor.currency} ${tutor.hourlyRate}/hr`,
                                    description: `${tutor.description.substring(0, 50)}...`,
                                    subjects: tutor.subjects,
                                }}
                            />
                        ))
                    ) : (
                        <Empty
                            description="No tutors match your filters."
                            className="text-gray-500"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TutorPage;