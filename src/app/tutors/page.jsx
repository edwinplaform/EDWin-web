"use client"
import TutorCard from "@/components/TutorCard";
import Filter from "@/components/Filter";
import Nav from "@/components/Nav";
import {useState} from "react";
import {useUser} from "@clerk/nextjs";
import {useTutorsByStatus, useUsers} from "@/hooks/useUsers";

const TutorPage = () => {

    const {isSignedIn} = useUser();

    // const profiles = [
    //     {
    //         id: 1,
    //         name: "Kamal",
    //         image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //         rate: "Rs.1000/hr",
    //         description: "Maths & Science Tutor Supporting GCSE/A-Level Students!",
    //         stats: 3400,
    //         subjects: ["Maths", "Physics"],
    //         rating: "5.0 (25 reviews)"
    //     },
    //     {
    //         id: 2,
    //         name: "Amal",
    //         image: "https://images.pexels.com/photos/2076596/pexels-photo-2076596.jpeg?auto=compress&cs=tinysrgb&w=600",
    //         rate: "Rs.2000/hr",
    //         description: "Flexible and experienced tutor with classroom experience",
    //         stats: 175,
    //         subjects: ["Maths", "Physics"],
    //         rating: "5.0 (4 reviews)"
    //     },
    //     {
    //         id: 3,
    //         name: "Ranil",
    //         image: "https://images.pexels.com/photos/810775/pexels-photo-810775.jpeg?auto=compress&cs=tinysrgb&w=600",
    //         rate: "Rs.1500/hr",
    //         description: "Qualified Psychology and Sociology teacher",
    //         stats: 650,
    //         subjects: ["Maths", "Physics"],
    //         rating: "5.0 (7 reviews)"
    //     },
    //     {
    //         id: 4,
    //         name: "Nimal",
    //         image: "https://images.pexels.com/photos/4116672/pexels-photo-4116672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //         rate: "Rs.2500/hr",
    //         description: "Imperial College A*A*A* Maths Student. A Level Maths Tutor",
    //         stats: 400,
    //         subjects: ["Maths", "Physics"],
    //         rating: "5.0 (6 reviews)"
    //     }
    // ];
    const [filteredProfiles, setFilteredProfiles] = useState([]);

    const {data:response,isLoading,error} = useTutorsByStatus("ACCEPTED");
    const tutors = response?.data || [];

    if (isLoading){
        return <div>Loading Tutors...</div>
    }

    if (error){
        return <div>Error fetching tutors: {error.message}</div>
    }

    const handleFilterChange = ({subject, searchKeyword}) => {
        let filtered = tutors;

        if (subject) {
            filtered = filtered.filter((tutor) => tutor.subjects.includes(subject));
        }
        if (searchKeyword) {
            filtered = filtered.filter((tutor) =>
                tutor.User?.firstName.toLowerCase().includes(searchKeyword.toLowerCase())
            );
        }

        setFilteredProfiles(filtered);
    };

    return (
        <div className="bg-bgColorWhite">
            {isSignedIn ? <Nav/> : " "}
            <div className="justify-center items-center p-6">
                <Filter onFilterChange={handleFilterChange}/>
            </div>
            <div className="flex justify-center flex-wrap px-6 pb-8">
                {/*{filteredProfiles.map((profile) => (*/}
                {/*    <TutorCard profile={profile} key={profile.id}/>*/}
                {/*))}*/}
                {tutors?.length > 0 ? (
                tutors.map((tutor) => (
                        <TutorCard
                            key={tutor.userId}
                            profile={{
                                id:tutor.userId,
                                name: `${tutor.User.firstName} ${tutor.User.lastName}`,
                                image: "https://images.pexels.com/photos/4116672/pexels-photo-4116672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Replace with a default image URL if necessary
                                rate: `${tutor.currency} ${tutor.hourlyRate}/hr`,
                                description: `${tutor.description.substring(0, 50)}...`,
                                subjects: tutor.subjects,
                                rating: "No reviews",
                            }}
                        />
                    ))
                ): (
                    <div>No tutors found with status ACCEPTED.</div>
                )}
            </div>
        </div>
    );
};

export default TutorPage;