import { FC, createContext, useContext, ReactNode, useState, Dispatch, useEffect } from 'react';
import { Message } from '@/types/message';
import { User } from '@/types/user';
import { Room } from '@/types/room';
import { io, Socket } from 'socket.io-client';
import { getAuthToken } from '@/lib/auth';

interface ChatContextType {
  currentRoom: { id: string; name: string } | undefined;
  setCurrentRoom: Dispatch<React.SetStateAction<{ id: string; name: string } | undefined>>;
  messages: Message[];
  setMessages: Dispatch<React.SetStateAction<Message[]>>;
  friends: User[];
  setFriends: Dispatch<React.SetStateAction<User[]>>;
  socket: Socket | null;
  roomsList: Room[];
  setRoomsList: Dispatch<React.SetStateAction<Room[]>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentRoom, setCurrentRoom] = useState<{ id: string; name: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const [roomsList, setRoomsList] = useState<Room[]>([]);

  useEffect(() => {
    const token = getAuthToken();
    const socketInstance = io('http://localhost:3001', {
      transports: ['websocket'],
      auth: {
        token: token,
      },
    });
    setSocket(socketInstance);

    socketInstance.on('connect_error', (err) => {
      console.error('Erreur de connexion WebSocket:', err);
    });

    socketInstance.on('success', () => {
      console.log('Utilisateur authentifié');
    });

    socketInstance.on('message', (data: { userID: string, newMessage: Message}) => {
      const msg: Message = {
        id: data.newMessage.id,
        content: data.newMessage.content,
        author: data.newMessage.author,
      }
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <ChatContext.Provider value={{ currentRoom, setCurrentRoom, messages, setMessages, friends, setFriends, socket, roomsList, setRoomsList }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChatData must be used within a ChatProvider');
  return context;
};
