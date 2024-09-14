import Image from "next/image";
import BookForm from "@/components/BookForm";

const tutor = () => {
    return (
        <div className="bg-bgColorWhite mx-auto py-4 px-6">
            <div className="flex">
                <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center">
                        <Image src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg" alt="" className="w-32 h-32 rounded-full mr-6" height={150} width={150}/>
                        <div>
                            <h1 className="text-5xl font-bold text-green-600">
                                AMAL
                            </h1>
                            <div className="flex space-x-2 mt-2">
                                <span className="bg-gray-200 text-gray-700 py-1 px-2 rounded-full">
                                    Maths
                                </span>
                                <span className="bg-gray-200 text-gray-700 py-1 px-2 rounded-full">
                                    Science
                                </span>
                                <span className="bg-gray-200 text-gray-700 py-1 px-2 rounded-full">
                                    History
                                </span>
                            </div>

                        </div>
                    </div>
                    <div className="mt-6 bg-customLime p-4 rounded-3xl">
                        <h2 className="text-xl font-bold text-gray-700">
                            About Amal
                        </h2>
                        <p className="mt-6 text-xl text-gray-900">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et erat ac ligula pellentesque dictum. Vivamus lacus urna, auctor quis laoreet et, facilisis id libero. Phasellus at massa ut risus euismod convallis. Aenean viverra libero mi, eget mollis nulla lobortis quis. Sed hendrerit sollicitudin urna vitae dapibus. Mauris a sem turpis. Donec eleifend egestas quam, tincidunt eleifend sem malesuada laoreet.

                            Morbi volutpat tempus dui, vel accumsan diam iaculis id. Praesent vestibulum, enim in commodo lobortis, purus ante laoreet nulla, sit amet maximus est diam nec diam. Suspendisse sit amet ornare turpis, vel mattis risus. Integer vel nisl risus. Cras elit purus, eleifend non orci et, porttitor sodales risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi dui nisi, feugiat nec nisl vitae, accumsan blandit enim. Mauris varius placerat lobortis. Donec volutpat fermentum erat, sed luctus justo volutpat sed. Sed consequat sit amet nisi sed sagittis. Ut pharetra at velit vel lobortis. Quisque eget magna a lacus pharetra suscipit. Donec ipsum magna, dignissim quis suscipit ut, imperdiet eu ex. Proin nec laoreet ipsum.

                            Sed sed fermentum diam. Phasellus eros magna, ultricies id ullamcorper dictum, iaculis id velit. Vivamus egestas nunc enim, id volutpat ipsum tempor in. Integer faucibus sapien quis imperdiet feugiat. Phasellus ut consequat velit. Vivamus imperdiet nulla vel felis mollis, eu pellentesque risus scelerisque. Integer id volutpat diam, et tristique mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque fringilla, ligula in commodo auctor, felis velit pulvinar enim, et aliquam nunc massa nec nisi.
                        </p>
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
                                <Image src="/star.svg" alt="star" width="20" height="20"/>
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
    )
}

export default tutor;