import Image from "next/image";

const Message = () => {
    return (
        <div className="flex items-start gap-3 my-2">
            <div>
                <Image src="/avatar.png" alt="" width={28} height={28} className="rounded-full"/>
                <span className="text-xs">just now</span>
            </div>
            <div className="p-3 rounded-lg ">
                <p>Ballo</p>
                <Image src="" alt="" className="w-full max-w-xs rounded-lg mt-2"/>
            </div>
        </div>
    );
}

export default Message;