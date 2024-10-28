import TutorCard from "@/components/TutorCard";
import Filter from "@/components/Filter";
import {currentUser} from "@clerk/nextjs/server";
import Nav from "@/components/Nav";

const TutorPage = () => {

    const user = currentUser();

    const profiles = [
        {
            id:1,
            name: "Kamal",
            image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            rate: "Rs.1000/hr",
            description: "Maths & Science Tutor Supporting GCSE/A-Level Students!",
            stats: 3400,
            rating: "5.0 (25 reviews)"
        },
        {
            id:2,
            name: "Amal",
            image: "https://images.pexels.com/photos/2076596/pexels-photo-2076596.jpeg?auto=compress&cs=tinysrgb&w=600",
            rate: "Rs.2000/hr",
            description: "Flexible and experienced tutor with classroom experience",
            stats: 175,
            rating: "5.0 (4 reviews)"
        },
        {
            id:3,
            name: "Ranil",
            image: "https://images.pexels.com/photos/810775/pexels-photo-810775.jpeg?auto=compress&cs=tinysrgb&w=600",
            rate: "Rs.1500/hr",
            description: "Qualified Psychology and Sociology teacher",
            stats: 650,
            rating: "5.0 (7 reviews)"
        },
        {
            id:4,
            name: "Nimal",
            image: "https://images.pexels.com/photos/4116672/pexels-photo-4116672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            rate: "Rs.2500/hr",
            description: "Imperial College A*A*A* Maths Student. A Level Maths Tutor",
            stats: 400,
            rating: "5.0 (6 reviews)"
        }
    ];

    return (
        <div className="bg-bgColorWhite">
            {user && <Nav/>}
            <div className="justify-center items-center p-6">
                <Filter />
            </div>
            <div className="flex justify-center flex-wrap px-6 pb-8">
            {profiles.map((profile) => (
                <TutorCard profile={profile} key={profile.id} />
            ))}
            </div>
        </div>
    );
};

export default TutorPage;