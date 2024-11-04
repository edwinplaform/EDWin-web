import Image from "next/image";
import Messages from "@/components/chat/Messages";
import Input from "@/components/chat/Input";

const Chat = () => {
    return (
        <div className="flex flex-col w-2/3 bg-cusPurpleLight">
            <div className="flex items-center w-full h-16 justify-between px-12 bg-cusPurple">
                <span className="font-semibold text-[16px]">Amal</span>
                <Image src="/search.png" alt="" width={20} height={20}/>
            </div>
            <Messages/>
            <Input/>
        </div>
    );
}

export default Chat;