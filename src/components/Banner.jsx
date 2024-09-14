import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";

const Banner = () => {
    return (
        <section>
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
                        <h1 className="font-bold text-5xl text-darkGreen">Learning Revolution</h1>
                        <p className="mt-4 text-gray-700 xl:max-w-[520px]">
                            Welcome to our e-learning platform! Discover a world of knowledge and learning opportunities
                            at your
                            fingertips.
                        </p>

                        <Link href="/courses" className="mt-8 inline-block ring-black ring-2 rounded bg-blue-700 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-800">
                            Enroll Now
                        </Link>
                    </div>

                </div>
            </div>

        </section>
    )

}

export default Banner;