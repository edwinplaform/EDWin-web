'use client';

import {useState, useEffect, useRef} from 'react';
import {Modal} from 'antd';
import {supabase} from "../../../supabase";

const TutorChatModal = ({isOpen, onClose, tutorId, studentId, studentName}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [chatId, setChatId] = useState(null);
    const messageEndRef = useRef(null);

    useEffect(() => {
        if (!isOpen || !tutorId || !studentId) return;

        const fetchOrCreateMessages = async () => {
            try {
                if (!tutorId || !studentId) {
                    throw new Error('Tutor ID or Student ID is missing.');
                }

                const {data: existingChat, error: fetchError} = await supabase
                    .from('chats')
                    .select('id')
                    .contains('participant_ids', [tutorId, studentId])
                    .single();

                if (fetchError) {
                    console.error('Error fetching or creating chat:', fetchError);
                    return;
                }

                if (existingChat) {
                    setChatId(existingChat.id);
                } else {
                    const {data: newChat, error: createError} = await supabase
                        .from('chats')
                        .insert({participant_ids: [tutorId, studentId]})
                        .select('id')
                        .single();

                    if (createError) {
                        console.error('Error creating chat:', createError);
                        return;
                    }

                    setChatId(newChat.id);
                }

            } catch (err) {
                console.error('Error fetching or creating chat:', err);
            }
        };

        fetchOrCreateMessages();

    }, [isOpen, tutorId, studentId]);

    useEffect(() => {
        if (!chatId) return;

        const fetchMessages = async () => {
            const {data, error} = await supabase
                .from('chat_messages')
                .select(`
            *,
            sender:users!chat_messages_sender_id_fkey(*),
            recipient:users!chat_messages_recipient_id_fkey(*)
        `)
                .eq('chat_id', chatId)
                .order('created_at', {ascending: true});

            if (error) {
                console.error('Error fetching messages:', error);
                return;
            }

            console.log('Fetched messages:', data);
            if (data) setMessages(data);
        };

        fetchMessages();

        const subscription = supabase
            .channel(`chat:${chatId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'chat_messages'
            }, (payload) => {
                console.log('new message payload: ', payload);
                setMessages((prevMessages) => [...prevMessages, payload.new]);
            })
            .subscribe();

        return () => subscription.unsubscribe();
    }, [chatId]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !chatId) return;

        await supabase.from('chat_messages').insert({
            content: newMessage,
            chat_id: chatId,
            sender_id: tutorId,
            recipient_id: studentId
        });

        setNewMessage('');
    };

    return (
        <Modal
            title={`Chat with ${studentName}`}
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={600}
        >
            <div className="h-[400px] flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender_id === tutorId ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[70%] rounded-lg p-3
                ${message.sender_id === tutorId ? 'bg-blue-500 text-white' : 'bg-white'}`}
                            >
                                {message.content}
                            </div>
                        </div>
                    ))}
                    <div ref={messageEndRef}></div>
                </div>
                <form onSubmit={sendMessage} className="p-4 border-t">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 rounded-lg border px-4 py-2 focus:outline-none focus:border-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default TutorChatModal;