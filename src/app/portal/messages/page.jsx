'use client';

// import {useUser} from '@clerk/nextjs';
import Sidebar from "@/components/chat/Sidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import {useState} from 'react';
import {useCurrentUser} from "@/util/auth";

const ChatPage = () => {
    // const {user} = useUser();
    const user = useCurrentUser();
    const [selectedChat, setSelectedChat] = useState(null);

    if (!user) return null;

    return (
        <div className="h-screen bg-gray-50">
            <div className="container mx-auto h-full px-6 py-6">
                <div className="flex h-[90vh] overflow-hidden rounded-lg shadow-lg">
                    <Sidebar
                        userId={user.id}
                        onSelectChat={setSelectedChat}
                        selectedChat={selectedChat}
                    />
                    <ChatWindow
                        userId={user.id}
                        chatId={selectedChat}
                        userName={user.name || ''}
                    />
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
