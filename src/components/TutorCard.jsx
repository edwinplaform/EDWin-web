import Image from "next/image";
import Link from "next/link";

const TutorCard = ({profile}) => {

    return (
        <div className="bg-white rounded-3xl shadow-md m-4 w-72 hover:shadow-2xl transition-shadow">
            <Link href={`/tutors/${profile.id}`}>
                <div className="relative">
                    <Image src={profile.image} width="260" height="260" alt="profile photo"
                           className="rounded-3xl w-full h-72 object-cover"/>
                    <div className="absolute bottom-2 px-2 py-1 left-2">
                        <Image src="/heart.svg" width={20} height={20} alt="profile photo"/>
                    </div>
                    <div className="absolute bottom-2 right-2 font-bold bg-white text-black rounded-full px-2 py-1">
                        {profile.rate}
                    </div>
                </div>
                <div className="p-4">
                    <h2 className="text-3xl font-bold text-[#275e6c]">{profile.name}</h2>
                    <p className="text-gray-500 py-4 text-[15px]">{profile.description}</p>
                    <div className="space-y-0.5">
                        <div className="flex">
                            <Image src="/lesson.png" alt="subject" width={18} height={18}/>
                            <div className="flex">
                                {profile.subjects.map((subject, index) => (
                                    <p className="ml-3 text-[15px] text-[#275e6c] font-bold" key={index}>{subject}</p>
                                ))}
                            </div>
                        </div>
                        <div className="flex opacity-80">
                            <Image src="/degree.svg" alt="degree" width={18} height={18}/>
                            <p className="ml-3 text-[15px] text-[#275e6c]">Qualified teacher</p>
                        </div>
                        <div className="flex opacity-80">
                            <Image src="/check.svg" alt="check icon" width={18} height={18}/>
                            <p className="ml-3 text-[15px] text-[#275e6c]">Background check</p>
                        </div>
                    </div>
                    <div className="flex mt-6 items-center">
                        <div className="p-1 bg-cusSky rounded-lg mr-2">
                            <Image src="/star1.svg" alt="star" width={20} height={20}/>
                        </div>
                        <p className="text-[#275e6c] font-bold">
                            {profile.rating}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default TutorCard;