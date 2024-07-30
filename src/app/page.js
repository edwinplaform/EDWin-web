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
          <div className="bg-gray-100 p-16 items-center justify-center flex flex-col">
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
                  <Link href="/courses" className="bg-darkGreen p-4 rounded text-white mx-2">All Subjects</Link>
              </div>
          </div>
          <div>
              <div className="flex flex-col sm:flex-row my-16 px-6 justify-between">
                  <div className="ring-black ring-1 m-8 px-8 py-24 rounded items-center justify-center flex flex-col hover:shadow-2xl">
                      <h2 className="font-bold text-2xl text-gray-700 m-4">Flexible Schedule</h2>
                      <p className="text-sm text-gray-600 ">Organize your classes whenever you want with the teacher you choose.</p>
                  </div>
                  <div className="ring-black ring-1 m-8 px-8 py-24 rounded items-center justify-center flex flex-col hover:shadow-2xl">
                      <h2 className="font-bold text-2xl text-gray-700 my-4">Custom Classes</h2>
                      <p className="text-sm text-gray-600">Our teachers will adapt the classes according to your level and needs.</p>
                  </div>
                  <div className="ring-1 ring-black m-8 px-8 py-24 rounded items-center justify-center flex flex-col hover:shadow-2xl">
                      <h2 className="font-bold text-2xl text-gray-700 my-4">Choose your teacher</h2>
                      <p className="text-sm text-gray-600">Choose your teacher according to their profile and reviews.</p>
                  </div>
                  <div className="ring-black ring-1 m-8 px-8 py-24 rounded items-center justify-center flex flex-col hover:shadow-2xl">
                      <h2 className="font-bold text-2xl text-gray-700 my-4">Buy 1 class or several</h2>
                      <p className="text-sm text-gray-600">You can buy a package of 1, 5, or 100 classes as it suits you. Without obligation.</p>
                  </div>
              </div>
          </div>
          <div className="p-14 my-6 items-center justify-center flex">
              <h2 className="relative text-3xl sm:text-7xl text-black font-semibold">Lessons {"you'll"} love. Guaranteed.</h2>
          </div>
      </div>
  );
} 
