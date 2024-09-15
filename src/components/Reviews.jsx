import Image from "next/image";

const Reviews = () => {
    return (
        <div className="mb-6">
            <h2 className="text-lg font-bold text-customDarkGreen mb-1">Outstanding
                tutor</h2>
            <div className="flex space-x-2">
                <p className="text-[14px]">by <b>Amal Perera</b> |</p>
                <p className="text-[14px] opacity-60">posted on Sep 15, 2024</p>
            </div>
            <div className="py-3">
                <Image src="/star1.svg" width={20} height={20} alt="rating"/>
            </div>
            <div className="mb-5 text-[16px]">
                <p className="">Ari provided my son with exactly the support he needed
                    throughout Year 12. I have no doubt that he would not have been as
                    settled and calm going into his Methods exam without the guidance and
                    support of Ari over the last 6+ months. Ari was always approachable,
                    knowledgeable, friendly and flexible. Cant recommend more highly.
                    Thanks Ari.</p>
            </div>
        </div>
    )
}

export default Reviews;