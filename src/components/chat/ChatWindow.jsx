'use client';

import {useState, useEffect, useRef} from 'react';
import {supabase} from "../../../supabase";
import Image from "next/image";

const ChatWindow = ({userId, chatId}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!chatId) return;

        const fetchMessages = async () => {
            const {data, error} = await supabase
                .from('chat_messages')
                .select(`
                    id,
                    content,
                    created_at,
                    sender:sender_id(
                        first_name,
                        avatar_url
                    )
                `)
                .eq('chat_id', chatId)
                .order('created_at', {ascending: true});

            if (error) {
                console.log("Error fetching messages:", error.message);
            } else {
                setMessages(data);
            }
        };

        fetchMessages();

        const subscription = supabase
            .channel(`public:chat_messages`)
            .on('postgres_changes', {event: 'INSERT', schema: 'public', table: 'chat_messages'}, fetchMessages)
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [chatId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    };

    useEffect(scrollToBottom, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !chatId) return;

        await supabase.from('chat_messages').insert({
            content: newMessage,
            chat_id: chatId,
            sender_id: userId,
        });

        setNewMessage('');
    };

    if (!chatId) {
        return (
            <div className="flex-1 bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">Select a chat to start messaging</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-gray-50">
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex mb-4 ${
                            message.sender_id === userId ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                                message.sender_id === userId
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white'
                            }`}
                        >
                            <div className="flex items-center mb-1">
                                <Image
                                    src={message.sender?.avatar_url || '/avatar.png'}
                                    alt="Avatar"
                                    height={20} width={20}
                                    className="w-6 h-6 rounded-full mr-2"
                                />
                                <span className="text-sm font-medium">
                  {message.sender.first_name}
                </span>
                            </div>
                            <p>{message.content}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef}/>
            </div>
            <form onSubmit={sendMessage} className="p-4 bg-white border-t">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ChatWindow;