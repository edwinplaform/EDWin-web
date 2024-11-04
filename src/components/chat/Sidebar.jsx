import Navbar from "@/components/chat/Navbar";
import Search from "@/components/chat/Search";
import Chats from "@/components/chat/Chats";

const Sidebar = () => {
    return (
        <div className="bg-cusPurple w-1/3 p-4 border-r border-white">
            <Search />
            <Chats/>
        </div>
    );
}

export default Sidebar;