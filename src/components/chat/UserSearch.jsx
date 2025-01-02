'use client';

import {useState} from 'react';
import {supabase} from "../../../supabase";
import Image from "next/image";

const UserSearch = ({userId, onChatCreated}) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const searchUsers = async (search) => {
        if (!search.trim()) {
            setResults([]);
            return;
        }

        const {data} = await supabase
            .from('users')
            .select('*')
            .neq('id', userId)
            .ilike('first_name', `%${search}%`)
            .limit(5);

        if (data) setResults(data);
    };

    const createChat = async (otherUserId) => {
        const {data: existingChat} = await supabase
            .from('chats')
            .select('id')
            .contains('participant_ids', [userId, otherUserId])
            .single();

        if (existingChat) {
            onChatCreated(existingChat.id);
            return;
        }

        const {data: newChat} = await supabase
            .from('chats')
            .insert({
                participant_ids: [userId, otherUserId],
            })
            .select()
            .single();

        if (newChat) {
            await supabase.from('chat_participants').insert([
                {chat_id: newChat.id, user_id: userId},
                {chat_id: newChat.id, user_id: otherUserId},
            ]);

            onChatCreated(newChat.id);
        }

        setQuery('');
        setResults([]);
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    searchUsers(e.target.value);
                }}
                placeholder="Search users..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            {results.length > 0 && (
                <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg">
                    {results.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => createChat(user.id)}
                            className="p-2 hover:bg-gray-50 cursor-pointer"
                        >
                            <div className="flex items-center">
                                <Image
                                    src={user.avatar_url || '/avatar.png'}
                                    width={40} height={40}
                                    alt=""
                                    className="w-8 h-8 rounded-full"
                                />
                                <span className="ml-2">{user.first_name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default UserSearch;