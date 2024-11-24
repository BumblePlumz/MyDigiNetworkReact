import { FC, useState } from 'react';
import { Input, Button } from "@/components";
import { useChatContext } from '@/contexts/ChatContext';
import { Message } from '@/types/message';
import { getUser, getAuthToken } from '@/lib/auth';
import { BASE_URL } from '@/lib/constants';

const ChatForm: FC = () => {
    const { currentRoom, messages, setMessages, socket } = useChatContext();
    const [message, setMessage] = useState("");
    const token = getAuthToken();
    const user = getUser();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim() === "") return;
        const response = await fetch(`${BASE_URL}/message/${currentRoom?.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ content: message }),
        });

        const newID = (messages.length + 1).toString();
        const newMessage: Message = { id: newID, content: message, author: user } as Message;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage("");

        if (socket) {
            socket.emit('message', {
                roomId: currentRoom?.id,
                message: message,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
            <Input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow"
            />
            <Button type="submit" className="bg-blue-500 text-white">
                Send
            </Button>
        </form>
    );
};

export default ChatForm;
