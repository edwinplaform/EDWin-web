"use client"
import TutorCard from "@/components/TutorCard";
import Filter from "@/components/Filter";
import Nav from "@/components/Nav";
import {useState} from "react";
import {useUser} from "@clerk/nextjs";

const TutorPage = () => {

    const {isSignedIn} = useUser();

    const profiles = [
        {
            id: 1,
            name: "Kamal",
            image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            rate: "Rs.1000/hr",
            description: "Maths & Science Tutor Supporting GCSE/A-Level Students!",
            stats: 3400,
            subjects: ["Maths", "Physics"],
            rating: "5.0 (25 reviews)"
        },
        {
            id: 2,
            name: "Amal",
            image: "https://images.pexels.com/photos/2076596/pexels-photo-2076596.jpeg?auto=compress&cs=tinysrgb&w=600",
            rate: "Rs.2000/hr",
            description: "Flexible and experienced tutor with classroom experience",
            stats: 175,
            subjects: ["Maths", "Physics"],
            rating: "5.0 (4 reviews)"
        },
        {
            id: 3,
            name: "Ranil",
            image: "https://images.pexels.com/photos/810775/pexels-photo-810775.jpeg?auto=compress&cs=tinysrgb&w=600",
            rate: "Rs.1500/hr",
            description: "Qualified Psychology and Sociology teacher",
            stats: 650,
            subjects: ["Maths", "Physics"],
            rating: "5.0 (7 reviews)"
        },
        {
            id: 4,
            name: "Nimal",
            image: "https://images.pexels.com/photos/4116672/pexels-photo-4116672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            rate: "Rs.2500/hr",
            description: "Imperial College A*A*A* Maths Student. A Level Maths Tutor",
            stats: 400,
            subjects: ["Maths", "Physics"],
            rating: "5.0 (6 reviews)"
        }
    ];
    const [filteredProfiles, setFilteredProfiles] = useState(profiles);

    const handleFilterChange = ({subject, searchKeyword}) => {
        let filtered = profiles;

        if (subject) {
            filtered = filtered.filter((profile) => profile.subjects.includes(subject));
        }
        if (searchKeyword) {
            filtered = filtered.filter((profile) =>
                profile.name.toLowerCase().includes(searchKeyword.toLowerCase())
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
                {filteredProfiles.map((profile) => (
                    <TutorCard profile={profile} key={profile.id}/>
                ))}
            </div>
        </div>
    );
};

export default TutorPage;