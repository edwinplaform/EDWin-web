import CourseCard from "@/components/CourseCard";

const Courses = [
    {
        id: 1,
        name: "Ranil",
        title: "Mathematics",
        grade: "12",
        price: 1500,
        image: "https://images.pexels.com/photos/6238020/pexels-photo-6238020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id: 2,
        name: "Amal",
        title: "Buddhist",
        grade: "11",
        price: 1500,
        image: "https://images.pexels.com/photos/6237964/pexels-photo-6237964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id: 3,
        name: "Nimal",
        title: "History",
        grade: "10",
        price: 1000,
        image: "https://images.pexels.com/photos/4173334/pexels-photo-4173334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id: 4,
        name: "Amal",
        title: "Engineering",
        grade: "12",
        price: 2500,
        image: "https://images.pexels.com/photos/5905892/pexels-photo-5905892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id: 5,
        name: "Ranil",
        title: "Mathematics",
        grade: "12",
        price: 1500,
        image: "https://images.pexels.com/photos/6238020/pexels-photo-6238020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
];


const CoursesPage = () => {
    return (
        <div>
            <div>Science</div>
            <div className="flex justify-center lg:flex-row mx-8 sm:flex-col ">
                {Courses.map((course) =>(
                    <CourseCard key={course.id} name={course.name} title={course.title} grade={course.grade} price={course.price} image={course.image} />
                ))}
            </div>
        </div>

    );
};

export default CoursesPage;