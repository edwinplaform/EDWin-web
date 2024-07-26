import Image from "next/image";
import Banner from "@/components/Banner";
import Link from "next/link";

export default function Home() {
  return (
      <div>
          <Banner/>
          <div className="items-center justify-center flex flex-col my-5 h-32">
             <h1 className="font-extrabold text-4xl text-darkGreen">Online tutoring with real teachers</h1>
             <p className="font-light text-2xl text-darkGreen justify-center">Instant online tutoring - all subjects, anytime, anywhere</p>
          </div>
          <div className="bg-teal-400 p-8 items-center justify-center flex flex-col">
              <h1 className="text-lightBlack text-3xl font-semibold ">
                  Pick a subject to get started
              </h1>
              <div className="flex flex-col sm:flex-row mt-8">
                  <Link href="#" className="bg-white p-4 rounded text-gray-600 mx-2">Maths</Link>
                  <Link href="#" className="bg-white p-4 rounded text-gray-600 mx-2">English</Link>
                  <Link href="#" className="bg-white p-4 rounded text-gray-600 mx-2">Chemistry</Link>
                  <Link href="#" className="bg-white p-4 rounded text-gray-600 mx-2">Physics</Link>
                  <Link href="#" className="bg-white p-4 rounded text-gray-600 mx-2">Music</Link>
                  <Link href="#" className="bg-white p-4 rounded text-gray-600 mx-2">Politics</Link>
              </div>
              <div className="flex my-2">
                  <Link href="#" className="bg-white p-4 rounded text-gray-600 mx-2">Science</Link>
                  <Link href="#" className="bg-white p-4 rounded text-gray-600 mx-2">History</Link>
                  <Link href="#" className="bg-white p-4 rounded text-gray-600 mx-2">German</Link>
                  <Link href="#" className="bg-white p-4 rounded text-gray-600 mx-2">Psychology</Link>
                  <Link href="/courses" className="bg-darkGreen p-4 rounded text-gray-600 mx-2">All Subjects</Link>
              </div>
          </div>
      </div>
  );
}
