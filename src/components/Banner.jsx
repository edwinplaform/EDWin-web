import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";

const Banner = () => {
    return (
        <section className="bg-blue-100">
            <div className="mx-auto w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-12">
                <div className="mx-20 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full ">
                        <Image
                            src="/learning.svg"
                            alt="hero"
                            width={200}
                            height={200}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                    <div className="lg:py-24">
                        <h1 className="font-bold text-5xl">Welcome to the</h1>
                        <h1 className="font-bold text-5xl text-blue-900">Learning Revolution</h1>
                        <p className="mt-4 text-black xl:max-w-[520px]">
                            Welcome to our e-learning platform! Discover a world of knowledge and learning opportunities
                            at your
                            fingertips.
                        </p>

                        <Link href="/courses" className="mt-8 inline-block rounded bg-gradient-to-r from-cyan-400 to-cyan-500
                        px-10 py-3 text-lg font-bold text-black shadow-lg transition transform hover:scale-105 hover:from-teal-700 
                        hover:to-teal-800 hover:shadow-x5 hover:text-black focus:outline-none focus:ring focus:ring-blue-300 hover:text-white">
                            Start the journey
                        </Link>
                    </div>

                </div>
            </div>

        </section>
    )

}

export default Banner;