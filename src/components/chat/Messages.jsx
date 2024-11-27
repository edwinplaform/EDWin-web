import Message from "@/components/chat/Message";

const Messages = () => {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
            <Message/>
            <Message/>
            <Message/>
        </div>
    )
}

export default Messages;