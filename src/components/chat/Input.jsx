import Image from "next/image";

const Input = () => {
    return (
        <div className="flex items-center gap-3 p-4 border-t border-gray-300 bg-white">
            <input type="text" placeholder="Type something..." className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200" />
            <div className="flex items-center gap-4">
                {/*<Image src="" alt=""/>*/}
                <input type="file" id="file" className="hidden"/>
                <label htmlFor="file">
                    <Image src="/attach.png" alt="" width={20} height={20} className="cursor-pointer" />
                </label>
                <button className="bg-cusPurple text-white py-2 px-4 rounded-lg hover:bg-cusPurple">Send</button>
            </div>
        </div>
    )
}

export default Input;