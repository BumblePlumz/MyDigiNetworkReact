import { FC, useRef } from 'react';
import { useChatContext } from '@/contexts/ChatContext';
import { ChatAddFriendModal, ChatAddFriendModalRef } from '@/components';
import { Button } from '@/components';
import { Badge } from 'lucide-react';

interface Props {

}

const ChatMessageList: FC<Props> = ({ }) => {
    const { currentRoom, messages } = useChatContext();
    const modalRef = useRef<typeof ChatAddFriendModalRef>(null);

    const openChatModal = () => {
        modalRef.current?.openModal();
    };

    return (
        <section>
            <div className='flex justify-between items-center border-b border-blue-500'>
                <h2 className='p-3 md:ps-4xl lg:ps-6xl'>Chat : {currentRoom?.name}</h2>
                <Button onClick={openChatModal} className='bg-white border border-blue-500 text-blue-500 shadow py-0 md:me-4xl lg:me-6xl'>Ajouter un ami</Button>
            </div>
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                        <span className='flex justify-around'>
                            <p>
                                {message.content}
                            </p>
                            <Badge>
                                Autheur : {message.author?.firstname && message.author?.lastname
                                    ? `${message.author.firstname} ${message.author.lastname}`
                                    : "anonyme"}
                            </Badge>
                        </span>
                    </li>
                ))}
            </ul>
            <ChatAddFriendModal ref={modalRef} roomName={currentRoom?.name} />
        </section>
    );
};

export default ChatMessageList;