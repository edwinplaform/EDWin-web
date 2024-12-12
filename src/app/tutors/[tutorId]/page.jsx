import Image from "next/image";
import BookForm from "@/components/BookForm";
import Reviews from "@/components/Reviews";
import {currentUser} from "@clerk/nextjs/server";
import Nav from "@/components/Nav";

const Tutor = () => {
    const user = currentUser();

    return (
        <>
            {user && <Nav/>}
            <div className="bg-bgColorWhite">
                <div className="max-w-4xl mx-auto  p-4">
                    <div className="bg-white rounded-xl p-6 flex flex-col md:flex-row items-center mt-6">
                        <Image src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg" alt=""
                               width={200} height={200} className="rounded-md h-32 w-32 md:w-64 md:h-64"/>
                        <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                            <div className="flex gap-10">
                                <div className="text-2xl text-[#275e6c] font-bold">Amal Perera</div>
                                <div className="flex items-center justify-center md:justify-start mt-1">
                                    <Image src="/rateStar.png" alt="" height={20} width={20}/>
                                    <span className="ml-1 text-gray-600">5.0 (10)</span>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4 justify-center md:justify-start opacity-70">
                                <Image src="/calendar.png" alt="" width={18} height={14}/>
                                <span
                                    className="text-gray-600 text-[14px]">On EDWin since October &apos;s22</span>
                            </div>
                            <div className="flex gap-2 mt-2 justify-center md:justify-start">
                                <Image src="/dollarSymbol.png" alt="" height={18} width={18}/>
                                <span className="text-gray-700 text-[14px]">From <span
                                    className="font-bold"><b>$55.00</b></span> + GST</span>
                            </div>
                            <div className="justify-center md:justify-start">
                                <BookForm/>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <h2 className="text-[#275e6c] text-xl font-bold">About Amal</h2>
                        <div className="bg-white rounded-xl shadow-sm p-6 mt-4">
                            <p className="mt-4 text-gray-800 text-[15px]">
                                Hi, Thanks for your time to view my profile. I have completed a double degree in
                                University of Adelaide and my degrees are Engineering and Mathematics Science.
                                I am currently a PhD Student in Applied Mathematics at The University of Adelaide.
                                I love mathematics not only because it is essential for solving problems but also helps
                                to improve the analytically thinking and it refers to the ability to think critically
                                about the world around us. “Maths is the mother of science” .
                                This is why I am interested in maths and chose this as my degree.
                                I started tutoring when I was high school, it was helping my classmates on a mathematics
                                assignment. I still remember how happy he was after solving the toughest question in the
                                assignment. I felt valuable and satisfied because of the help I provided.
                                I am a friendly patient person benefiting from this I am able to truly understand what
                                the students need and provide clear and easy explanations. When I help students I would
                                like to guide them to solving problems in their own ways rather than showing them my
                                solutions.
                                ”Give a man a fish and you feed him for a day; teach a man to fish and you feed him for
                                a lifetime.”
                            </p>
                        </div>
                    </div>
                    <div className="mt-10">
                        <h2 className="text-[#275e6c] text-xl font-bold">Subjects Amal currently offers tutoring
                            for</h2>
                        <div className="bg-white rounded-xl shadow-sm p-6 mt-4">
                            <p className="text-gray-700 mb-3 font-semibold text-sm">I currently offer tutoring for :</p>
                            <div className="flex flex-wrap gap-2 opacity-80 mb-2">
                                <span
                                    className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold text-sm">Mathematics</span>
                                <span
                                    className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold text-sm">Physics</span>
                                <span
                                    className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold text-sm">Chemistry</span>
                                <span
                                    className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold text-sm">Biology</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <h2 className="text-[#275e6c] text-xl font-bold">Hourly Rates</h2>
                        <div className="bg-white p-6 rounded-xl shadow-sm mt-4">
                            <div className="flex justify-start gap-16 items-center text-[15px] mb-4">
                                <p className="text-gray-800 font-semibold">1-On-1 rate</p>
                                <p className="text-gray-800">$50.00</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <h2 className="text-xl text-[#275e6c] font-bold">Availability</h2>
                        <div className="bg-white p-6 rounded-xl shadow-sm mt-4">
                            <div className="flex justify-start gap-16 items-center text-[15px] mb-4">
                                <p className="text-gray-800 font-semibold">Availability</p>
                                <div className="flex flex-col">
                                    <div className="flex flex-row text-gray-800 gap-4">
                                        <p>Monday</p>
                                        <p>4:00 PM - 9:00 PM</p>
                                    </div>
                                    <div className="flex flex-row text-gray-800 gap-4">
                                        <p>Monday</p>
                                        <p>4:00 PM - 9:00 PM</p>
                                    </div>
                                    <div className="flex flex-row text-gray-800 gap-4">
                                        <p>Monday</p>
                                        <p>4:00 PM - 9:00 PM</p>
                                    </div>
                                    <div className="flex flex-row text-gray-800 gap-4">
                                        <p>Monday</p>
                                        <p>4:00 PM - 9:00 PM</p>
                                    </div>
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