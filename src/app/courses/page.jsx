"use client";
import CourseCard from "@/components/CourseCard";
import dynamic from "next/dynamic";
import { useState } from "react";

const SubjectName = dynamic(() => import("@/components/SubjectName"), { ssr: false });

const Courses = [
    {
        id: 1,
        name: "Prof. Nalinda Mendis",
        title: "Applied Physics",   
        grade: "Beginners",
        price: "4500/hr",
        image: "https://images.pexels.com/photos/60582/newton-s-cradle-balls-sphere-action-60582.jpeg?cs=srgb&dl=pexels-pixabay-60582.jpg&fm=jpg&_gl=1*60rbms*_ga*MTg2Njc3MjIyMS4xNzMzNzM0ODU3*_ga_8JE65Q40S6*MTczMzczNDg1Ny4xLjEuMTczMzczNTE5Ni4wLjAuMA..",
    },
    {
        id: 2,
        name: "Mr. Jerel Timothy",
        title: "Biophysics",
        grade: "Intermediate",
        price: "4500/hr",
        image: "https://images.pexels.com/photos/9768458/pexels-photo-9768458.jpeg?cs=srgb&dl=pexels-ron-lach-9768458.jpg&fm=jpg&_gl=1*18ga54w*_ga*MTg2Njc3MjIyMS4xNzMzNzM0ODU3*_ga_8JE65Q40S6*MTczMzczNDg1Ny4xLjEuMTczMzczNTUzNC4wLjAuMA..",
    },
    {
        id: 3,
        name: "Yethum Danith",
        title: "physics for A/L",
        grade: "grade 12-13",
        price: "2000/hr",
        image: "https://images.pexels.com/photos/3825462/pexels-photo-3825462.jpeg?cs=srgb&dl=pexels-rethaferguson-3825462.jpg&fm=jpg&_gl=1*pu4yni*_ga*MTg2Njc3MjIyMS4xNzMzNzM0ODU3*_ga_8JE65Q40S6*MTczMzczNDg1Ny4xLjEuMTczMzczNTc1Mi4wLjAuMA..",
    },
    {
        id: 4,
        name: "Nadeera Subasinghe",
        title: "Applied Physics",
        grade: "Beginner",
        price: "2000/hr",
        image: "https://images.pexels.com/photos/414860/pexels-photo-414860.jpeg?cs=srgb&dl=pexels-pixabay-414860.jpg&fm=jpg&_gl=1*1325i2p*_ga*MTg2Njc3MjIyMS4xNzMzNzM0ODU3*_ga_8JE65Q40S6*MTczMzczNDg1Ny4xLjEuMTczMzczNTg1Mi4wLjAuMA..",
    },
    {
        id: 5,
        name: "Kaveesha Sulakshana",
        title: "Chemistry for A/L",
        grade: "grade 12-13",
        price: "1500/hr",
        image: "https://images.pexels.com/photos/6238020/pexels-photo-6238020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id: 6,
        name: "Venusha Sandali",
        title: "Neurone Science",
        grade: "Advance",
        price: "4500/hr",
        image: "https://images.pexels.com/photos/1739811/pexels-photo-1739811.jpeg?cs=srgb&dl=pexels-mizyuk-1739811.jpg&fm=jpg&_gl=1*1e0x1bz*_ga*MTg2Njc3MjIyMS4xNzMzNzM0ODU3*_ga_8JE65Q40S6*MTczNDAxNjU2NC4yLjEuMTczNDAxNjU5NS4wLjAuMA..",
    },
    {
        id: 7,
        name: "Padmini Gamage",
        title: "Bio Science",
        grade: "Advance",
        price: "2500/hr",
        image: "https://images.pexels.com/photos/17485658/pexels-photo-17485658.png?cs=srgb&dl=pexels-googledeepmind-17485658.jpg&fm=jpg&_gl=1*1ehkrlp*_ga*MTg2Njc3MjIyMS4xNzMzNzM0ODU3*_ga_8JE65Q40S6*MTczNDAxNjU2NC4yLjEuMTczNDAxNjcwOS4wLjAuMA..",
    },
    {
        id: 8,
        name: "Divanka Randula",
        title: "Agriculture Science",
        grade: "Intermediate",
        price: "4000/hr",
        image: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?cs=srgb&dl=pexels-akilmazumder-1072824.jpg&fm=jpg&_gl=1*n2l5ix*_ga*MTg2Njc3MjIyMS4xNzMzNzM0ODU3*_ga_8JE65Q40S6*MTczNDAxNjU2NC4yLjEuMTczNDAxNjgzMC4wLjAuMA..",
    },
    {
        id: 9,
        name: "Tony Stark",
        title: "Neuclear Science",
        grade: "Advance",
        price: "6500/hr",
        image: "https://images.pexels.com/photos/3044470/pexels-photo-3044470.jpeg?cs=srgb&dl=pexels-distelapparath-3044470.jpg&fm=jpg&_gl=1*1j4d912*_ga*MTg2Njc3MjIyMS4xNzMzNzM0ODU3*_ga_8JE65Q40S6*MTczNDAxNjU2NC4yLjEuMTczNDAxNjkyMy4wLjAuMA..",
    },
    {
        id: 10,
        name: "Lakshan Siriwardhana",
        title: "Cell Biology",
        grade: "Advance",
        price: "4500/hr",
        image: "https://images.pexels.com/photos/11198501/pexels-photo-11198501.jpeg?cs=srgb&dl=pexels-fayette-reynolds-m-s-181007507-11198501.jpg&fm=jpg&_gl=1*17pwtir*_ga*MTg2Njc3MjIyMS4xNzMzNzM0ODU3*_ga_8JE65Q40S6*MTczNDAxNjU2NC4yLjEuMTczNDAxNzAyMS4wLjAuMA..",
    },
];

const CoursesPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const cardsPerPage = 4;
    const totalSlides = Math.ceil(Courses.length / cardsPerPage);

    const handleDotClick = (index) => {
        setCurrentSlide(index);
    };

    const visibleCourses = Courses.slice(
        currentSlide * cardsPerPage,
        currentSlide * cardsPerPage + cardsPerPage
    );

    return (
        <div>
            {/* SubjectName Component */}
            <SubjectName
                text="Science"
                backgroundColor="#cfceff"
                textColor="#21130d"
                style={{ marginLeft: "20px" }}
                className="mr-5"
            />

            {/* Course Cards */}
            <div className="flex justify-center lg:flex-row mx-8 sm:flex-col">
                {visibleCourses.map((course) => (
                    <CourseCard
                        key={course.id}
                        name={course.name}
                        title={course.title}
                        grade={course.grade}
                        price={course.price}
                        image={course.image}
                    />
                ))}
            </div>

            <div className="flex justify-center mt-4 mb-10">
                 {Array.from({ length: totalSlides }).map((_, index) => (
                 <div
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-2 h-2 mx-1 rounded-full cursor-pointer ${
                    index === currentSlide
                    ? "bg-blue-600"
                    : "bg-gray-400"
                }`}
            />
            ))}
        </div>
        {/* SubjectName Component */}
        <SubjectName
                text="Information Technology"
                backgroundColor="#cfceff"
                textColor="#21130d"
                style={{ marginLeft: "20px" }}
                className="mr-5"
            />
        <div className="flex justify-center lg:flex-row mx-8 sm:flex-col">
                {visibleCourses.map((course) => (
                    <CourseCard
                        key={course.id}
                        name={course.name}
                        title={course.title}
                        grade={course.grade}
                        price={course.price}
                        image={course.image}
                    />
                ))}
            </div>

            
        </div>
    );
};

export default CoursesPage;