import { FC, useEffect } from 'react';
import { json } from 'react-router-dom';
import { BASE_URL } from '@/lib/constants';
import { getAuthToken } from '@/lib/auth';
import { Room } from '@/types/room';
import { ChatMessageList, ChatForm } from '@/components';
import { useChatContext } from '@/contexts/ChatContext';
import { User } from '@/types/user';

interface Props { }

const ChatPage: FC<Props> = ({ }) => {
    const { currentRoom, setFriends } = useChatContext();

    useEffect(() => {
        const token = getAuthToken();
        fetch(`${BASE_URL}/subscription`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
            .then(response => response.json())
            .then(data => {
                const friends = data
                    .map((item: any) => item.friend)
                    .filter((friend: User) => friend !== null && friend !== undefined);
                setFriends(friends);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des amis:', error);
            });
    }, []);

    return (
        <div className='flex flex-col justify-between h-custom'>
            {currentRoom &&
                <>
                    <ChatMessageList />
                    <section>
                        <ChatForm />
                    </section>
                </>
            }
        </div>
    );
};

export default ChatPage;

export async function action(): Promise<Response> {

    return new Response();
}

export async function loader(): Promise<Response> {
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/room`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
    const data = await response.json();
    const rooms: Room[] = data.rooms;
    return json(rooms);
}
