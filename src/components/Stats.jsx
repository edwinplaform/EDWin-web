import Image from "next/image";
import React from "react";
import CountUp from "react-countup";

const Stats = () => {
    return(
        <section className="py-12 bg-blue-100">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                    {/*subject count */}
                    <div className="p-4 bg-blue-100 ">
                        <h2 className="text-4xl font-bold text-blue-900">
                            <CountUp end={100} duration={2} />+
                        </h2>
                        <p className="mt-2 text-black text-[40px] font-bold">Subjects</p>
                    </div>
                    {/*subject count */}
                    <div className="p-4 bg-blue-100 ">
                        <h2 className="text-4xl font-bold text-blue-900">
                            <CountUp end={500} duration={4} />+
                        </h2>
                        <p className="mt-2 text-black text-[40px] font-bold">Tutors</p>
                    </div>
                    {/*student count */}
                    <div className="p-4 bg-blue-100">
                        <h2 className="text-4xl font-bold text-blue-900">
                            <CountUp end={10000} duration={6} />+
                        </h2>
                        <p className="mt-2 text-black text-[40px] font-bold">Students</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Stats;