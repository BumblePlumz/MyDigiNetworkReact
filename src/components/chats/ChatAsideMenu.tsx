import { FC, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Button } from "@/components";
import { ChatCreationModal, ChatCreationModalRef } from "@/components";
import { Room } from "@/types/room";
import { getAuthToken } from '@/lib/auth';
import { useChatContext } from '@/contexts/ChatContext';
import { BASE_URL } from '@/lib/constants';

const ChatAsideMenu: FC = () => {
    const modalRef = useRef<typeof ChatCreationModalRef>(null);
    const chats = useLoaderData() as Room[];
    const { socket, currentRoom, setCurrentRoom, setMessages, roomsList, setRoomsList } = useChatContext();

    useEffect(() => {
        setRoomsList(chats);
    }, [chats]);

    const openChatModal = () => {
        modalRef.current?.openModal();
    };

    const connectToRoom = (e: React.MouseEvent<HTMLButtonElement>, roomID: string) => {
        e.preventDefault();
        socket?.emit('joinRoom', roomID);
        setCurrentRoom({ id: roomID, name: e.currentTarget.textContent || '' });
        socket?.on('joinedRoom', (data) => {
            setMessages(data.messages);
        });
    };

    const deleteRoom = (e: React.MouseEvent<HTMLButtonElement>, roomID: string) => {
        e.preventDefault();
        fetch(`${BASE_URL}/room/${roomID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getAuthToken(),
            },
        })
        .then(() => {
            setRoomsList(chats.filter((chat) => chat.id !== roomID));
            socket?.emit('leaveRoom', roomID);
        })
        .catch(error => {
            console.error('Erreur lors de la suppression de la salle:', error);
        });
    };

    return (
        <>
            <menu className="w-full min-h-full p-4 ps-0 bg-gray-100 border-r border-gray-300">
                <ul className="flex flex-col items-center gap-4">
                    <a href="#top" className="ms-[-5px] shadow-md border-3xl rounded w-10 h-10 flex items-center justify-center bg-blue-600 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7-7-7 7" />
                        </svg>
                    </a>
                    {/* Ajout du gestionnaire de clic pour ouvrir la modal */}
                    <Button
                        className="ms-[-5px] shadow-md border rounded-r-lg w-full p-3 text-center bg-blue-600 text-white hover:bg-white hover:border-blue-500 hover:text-blue-500 cursor-pointer"
                        onClick={openChatModal} // Action pour ouvrir la modal
                    >
                        Créer une discussion
                    </Button>
                    <Button
                        className="ms-[-5px] shadow-md border rounded-r-lg w-full p-3 text-center bg-blue-600 text-white hover:bg-white hover:border-blue-500 hover:text-blue-500 cursor-pointer"
                        disabled
                    >
                        Les conversations
                    </Button>
                    {roomsList.map((chat) => (
                        <div className='flex gap-2' key={chat.id}>
                            <Button onClick={(e) => connectToRoom(e, chat.id)} className='min-w-[50px] py-0'>
                                {chat.name}
                            </Button>
                            <Button onClick={(e) => deleteRoom(e, chat.id)} className='bg-red-500 py-0'>
                                Delete
                            </Button>
                        </div>
                    ))}
                </ul>
            </menu>
            {/* Passage de la référence à la modal */}
            <ChatCreationModal ref={modalRef} />
        </>
    );
};

export default ChatAsideMenu;
