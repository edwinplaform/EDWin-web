'use client';

import {useState, useEffect} from 'react';
import {supabase} from "../../../supabase";
import UserSearch from "@/components/chat/UserSearch";
import Image from "next/image";

const Sidebar = ({userId, onSelectChat, selectedChat}) => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchChats = async () => {
            const {data} = await supabase
                .from('chats')
                .select(`
                *,
                chat_messages(content,created_at),
                chat_participants(user_id, users(first_name, avatar_url))
                `)
                .contains('participant_ids', [userId])
                .order('created_at', {ascending: false});

            if (data) setChats(data);
        };

        fetchChats();

        const subscription = supabase
            .channel('public:chats')
            .on('postgres_changes', {event: '*', schema: 'public', table: 'chats'}, fetchChats)
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [userId]);

    return (
        <div className="w-1/3 bg-white border-r flex flex-col">
            <div className="p-4 border-b">
                <div className="flex items-center">
                    <h2 className="text-xl font-bold mb-4">Messages</h2>
                </div>
                <UserSearch userId={userId} onChatCreated={onSelectChat}/>
            </div>
            <div className="overflow-y-auto h-[calc(90vh-5rem)]">
                {chats.map((chat) => (
                    <div
                        key={chat.id}
                        onClick={() => onSelectChat(chat.id)}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                            selectedChat === chat.id ? 'bg-blue-50' : ''
                        }`}
                    >
                        {chat.chat_participants
                            .filter((participant) => participant.user_id !== userId)
                            .map((participant) => (
                                <div key={participant.user_id} className="flex items-center">
                                    <Image
                                        src={participant.users.avatar_url || '/avatar.png'}
                                        alt="Avatar"
                                        width={100} height={100}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div className="ml-4">
                                        <h3 className="font-medium">{participant.users.first_name}</h3>
                                        {chat.chat_messages.length > 0 && (
                                            <p className="text-sm text-gray-500 truncate">
                                                {chat.chat_messages[0].content}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;