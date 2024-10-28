import Image from "next/image";
import BookForm from "@/components/BookForm";
import Reviews from "@/components/Reviews";
import {currentUser} from "@clerk/nextjs/server";
import Nav from "@/components/Nav";

const tutor = () => {
    const user = currentUser();

    return (
        <>
            {user && <Nav/>}
            <div className="bg-bgColorWhite mx-auto py-4 px-10">
                <div className="flex">
                    <div className="w-2/3 p-8 rounded-lg ">
                        <div className="flex">
                            <Image src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg" alt=""
                                   className="w-80 h-80 rounded-full mr-6" height={150} width={150}/>
                            <div className="px-6">
                                <h1 className="text-7xl font-bold  text-customDarkGreen">
                                    AMAL
                                </h1>
                                <div className="flex space-x-2 mt-3">
                                    <span className="bg-white text-gray-700 py-1 px-3 rounded-full">
                                        Maths
                                    </span>
                                    <span className="bg-white text-gray-700 py-1 px-3 rounded-full">
                                        Science
                                    </span>
                                    <span className="bg-white text-gray-700 py-1 px-3 rounded-full">
                                        History
                                    </span>
                                </div>
                                <div className="mt-6">
                                    <div className="flex items-center my-3">
                                        <div className="p-2 bg-customLime rounded-xl mr-2">
                                            <Image src="/star1.svg" alt="star" height={18} width={18}/>
                                        </div>
                                        <p className="text-sm">5.0 (25 reviews)</p>
                                    </div>
                                    <div className="flex items-center my-3">
                                        <div className="p-2 bg-customLime rounded-xl mr-2">
                                            <Image src="/check.svg" alt="star" height={18} width={18}/>
                                        </div>
                                        <p className="text-sm">Background check</p>
                                    </div>
                                    <div className="flex items-center my-3">
                                        <div className="p-2 bg-customLime rounded-xl mr-2">
                                            <Image src="/map.svg" alt="star" height={18} width={18}/>
                                        </div>
                                        <p className="sm">Online Tutor</p>
                                    </div>
                                    <div className="flex items-center my-3">
                                        <div className="p-2 bg-customLime rounded-xl mr-2">
                                            <Image src="/calendar.svg" alt="star" height={18} width={18}/>
                                        </div>
                                        <p className="text-sm">On EDWin since September {"'24"}</p>
                                    </div>
                                    <div className="flex items-center my-3">
                                        <div className="p-2 bg-customLime rounded-xl mr-2">
                                            <Image src="/chat.svg" alt="star" height={18} width={18}/>
                                        </div>
                                        <p className="text-sm">Replies in 10 minutes</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="mt-6 bg-customLime p-4 rounded-3xl">
                            <h2 className="text-xl font-bold text-gray-700">
                                About Amal
                            </h2>
                            <p className="mt-6 text-xl text-gray-900">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et erat ac ligula pellentesque
                                dictum. Vivamus lacus urna, auctor quis laoreet et, facilisis id libero. Phasellus at massa
                                ut risus euismod convallis. Aenean viverra libero mi, eget mollis nulla lobortis quis. Sed
                                hendrerit sollicitudin urna vitae dapibus. Mauris a sem turpis. Donec eleifend egestas quam,
                                tincidunt eleifend sem malesuada laoreet.

                                Morbi volutpat tempus dui, vel accumsan diam iaculis id. Praesent vestibulum, enim in
                                commodo lobortis, purus ante laoreet nulla, sit amet maximus est diam nec diam. Suspendisse
                                sit amet ornare turpis, vel mattis risus. Integer vel nisl risus. Cras elit purus, eleifend
                                non orci et, porttitor sodales risus. Orci varius natoque penatibus et magnis dis parturient
                                montes, nascetur ridiculus mus. Morbi dui nisi, feugiat nec nisl vitae, accumsan blandit
                                enim. Mauris varius placerat lobortis. Donec volutpat fermentum erat, sed luctus justo
                                volutpat sed.
                            </p>
                        </div>
                        <div className="flex justify-center items-center mt-8">
                            <div className="bg-white rounded-3xl shadow-lg w-full">
                                <h1 className="text-2xl font-bold text-customDarkGreen opacity-60 my-6 px-6">Qualifications</h1>
                                    <div className="bg-bgColorWhite p-10 m-6 rounded-3xl">
                                        <div className="mb-6">
                                            <h2 className="text-2xl font-bold text-customDarkGreen mb-1">University of
                                                oxford</h2>
                                            <div className="mb-5">
                                                <p className="">Mathematics- First class Honours Degree</p>
                                            </div>
                                        </div>
                                        <hr className="mb-6"/>
                                        <div className="mb-6">
                                            <h2 className="text-2xl font-bold text-customDarkGreen mb-1">University of
                                                oxford</h2>
                                            <div className="mb-5">
                                                <p className="">Mathematics- First class Honours Degree</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="flex justify-center items-center mt-8">
                                    <div className="bg-white rounded-3xl shadow-lg w-full">
                                        <div className="px-6 my-6">
                                            <h1 className="text-2xl font-bold text-customDarkGreen opacity-60">Reviews</h1>
                                            <p className="text-sm text-customDarkGreen opacity-40">5.0 (25 reviews)</p>
                                    </div>
                                    <div className="bg-bgColorWhite p-10 m-6 rounded-3xl">
                                        <Reviews/>
                                        <hr className="mb-6"/>
                                        <Reviews/>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="w-1/3 ml-6">
                        <div className="bg-white p-6 rounded-3xl shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-5xl font-bold text-green-600">
                                        Rs.1000
                                    </span>
                                    <span className="text-gray-700 self-end px-2">
                                        per hour
                                    </span>
                                </div>
                                <div className="p-4 bg-customLime rounded-full flex">
                                    <Image src="/star1.svg" alt="star" width="20" height="20"/>
                                    <span className="ml-2 text-customDarkGreen font-bold">5.0</span>
                                </div>
                            </div>
                            <div className="mt-8">
                                <h3 className="text-lg font-bold text-gray-900">Online Lessons</h3>
                                <div className="mt-4 space-y-4">
                                    <BookForm/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default tutor;