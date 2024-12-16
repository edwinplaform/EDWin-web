"use client"

import Image from "next/image";
import BookForm from "@/components/BookForm";
import Reviews from "@/components/Reviews";
import Nav from "@/components/Nav";
import {useUser} from "@clerk/nextjs";
import {useUserById} from "@/hooks/useUsers";
import {useParams} from "next/navigation";

const Tutor = () => {
    const {isSignedIn} = useUser();
    const {tutorId} = useParams();


    const {data: user, isLoading, error} = useUserById(tutorId);

    console.log("---row data: ", user);

    if (!tutorId || isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading tutor details</div>;
    }

    if (!user) {
        return <div>No tutor found</div>;
    }

    const createdAt = user.data.createdAt;
    const yearFromCreatedAt = new Date(createdAt).getFullYear();
    const formattedYear = `'s${yearFromCreatedAt.toString().slice(-2)}`;
    console.log(yearFromCreatedAt);

    return (
        <>
            {isSignedIn && <Nav/>}
            <div className="bg-bgColorWhite">
                <div className="max-w-4xl mx-auto  p-4">
                    <div className="bg-white rounded-xl p-6 flex flex-col md:flex-row items-center mt-6">
                        <Image src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg" alt=""
                               width={200} height={200} className="rounded-md h-32 w-32 md:w-64 md:h-64"/>
                        <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                            <div className="flex gap-10">
                                <div
                                    className="text-2xl text-[#275e6c] font-bold">{user.data.firstName} {user.data.lastName}</div>
                                <div className="flex items-center justify-center md:justify-start mt-1">
                                    <Image src="/rateStar.png" alt="" height={20} width={20}/>
                                    <span className="ml-1 text-gray-600">5.0 (10)</span>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4 justify-center md:justify-start opacity-70">
                                <Image src="/calendar.png" alt="" width={18} height={14}/>
                                <span
                                    className="text-gray-600 text-[14px]">On EDWin since October {formattedYear}</span>
                            </div>
                            <div className="flex gap-2 mt-2 justify-center md:justify-start">
                                <Image src="/dollarSymbol.png" alt="" height={18} width={18}/>
                                <span className="text-gray-700 text-[14px]">From <span
                                    className="font-bold"><b>{user.data.Tutor.currency} {user.data.Tutor.hourlyRate}</b></span> + GST</span>
                            </div>
                            <div className="justify-center md:justify-start">
                                <BookForm
                                    tutorId={user.data.userId}
                                    subjects={user.data.Tutor.subjects}
                                    availableDays={user.data.Tutor.availability.days}
                                    name={user.data.firstName}
                                    availabilityStart={user.data.Tutor.availability.startTime}
                                    availabilityEnd={user.data.Tutor.availability.endTime}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <h2 className="text-[#275e6c] text-xl font-bold">About {user.data.firstName}</h2>
                        <div className="bg-white rounded-xl shadow-sm p-6 mt-4">
                            <p className="mt-4 text-gray-800 text-[15px]">
                                {user.data.Tutor.description}
                            </p>
                        </div>
                    </div>
                    <div className="mt-10">
                        <h2 className="text-[#275e6c] text-xl font-bold">Subjects {user.data.firstName} currently offers
                            tutoring
                            for</h2>
                        <div className="bg-white rounded-xl shadow-sm p-6 mt-4">
                            <p className="text-gray-700 mb-3 font-semibold text-sm">I currently offer tutoring for :</p>
                            <div className="flex flex-wrap gap-2 opacity-80 mb-2">
                                {user.data.Tutor.subjects.map((subject,index) => (
                                    <span key={index}
                                        className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold text-sm">{subject}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <h2 className="text-[#275e6c] text-xl font-bold">Hourly Rates</h2>
                        <div className="bg-white p-6 rounded-xl shadow-sm mt-4">
                            <div className="flex justify-start gap-16 items-center text-[15px] mb-4">
                                <p className="text-gray-800 font-semibold">1-On-1 rate</p>
                                <p className="text-gray-800">{user.data.Tutor.currency} {user.data.Tutor.hourlyRate}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <h2 className="text-xl text-[#275e6c] font-bold">Availability</h2>
                        <div className="bg-white p-6 rounded-xl shadow-sm mt-4">
                            <div className="flex justify-start gap-16 items-center text-[15px] mb-4">
                                <p className="text-gray-800 font-semibold">Availability</p>
                                <div className="flex flex-col">
                                    {user.data.Tutor.availability.days.map((day, index) => (
                                        <div key={index} className="flex flex-row text-gray-800 gap-4 capitalize">
                                            <p>{day}</p>
                                            <p>{user.data.Tutor.availability.startTime} - {user.data.Tutor.availability.endTime}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 mb-20">
                        <h2 className="text-xl text-[#275e6c] font-bold">Reviews</h2>
                        <p className="text-sm text-gray-500">5.0 (25 reviews)</p>
                        <div className="bg-white p-6 rounded-xl shadow-sm mt-4">
                            <Reviews/>
                            <hr className="mb-6"/>
                            <Reviews/>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Tutor;