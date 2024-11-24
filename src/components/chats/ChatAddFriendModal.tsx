import { FC, forwardRef, useImperativeHandle, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Dialog, DialogContent, DialogDescription, DialogTitle,
    Select, SelectTrigger, SelectContent, SelectItem, SelectValue,
    Button
} from '@/components';
import { useChatContext } from '@/contexts/ChatContext';
import { getAuthToken } from '@/lib/auth';
import { BASE_URL } from '@/lib/constants';
import { NAV_CHAT } from '@/lib/routes';
import { SelectGroup } from '@radix-ui/react-select';

interface ChatAddFriendModalProps {
    roomID?: string;
    roomName?: string;
}

export interface ChatAddFriendModalRef {
    openModal: () => void;
    closeModal: () => void;
}

const ChatAddFriendModal: FC<ChatAddFriendModalProps> = forwardRef<ChatAddFriendModalRef, ChatAddFriendModalProps>(({ roomID, roomName }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formFriend, setFormFriend] = useState('');
    const [loading, setLoading] = useState(false);
    const { friends } = useChatContext();
    const navigate = useNavigate();

    // Expose les méthodes openModal et closeModal au parent via la référence
    useImperativeHandle(ref, () => ({
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
    }));

    // Fonction de soumission pour créer le chat
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const token = getAuthToken();
        const chatData = { friendID: formFriend };

        fetch(`${BASE_URL}/room/add/${roomName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(chatData),
        })
            .then(response => {
                if (!response.ok) throw new Error('Failed to create chat');
                navigate(NAV_CHAT, { replace: true });
                setIsOpen(false);
            })
            .catch(error => {
                console.error('Erreur lors de la création du chat:', error);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogTitle>Ajouter un utilisateur à la conversation : {roomName}</DialogTitle>
                <DialogDescription>Sélectionnez un ami.</DialogDescription>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <Select onValueChange={(value) => setFormFriend(value)} value={formFriend}>
                        <SelectTrigger className="w-full max-w-[95%]">
                            <SelectValue placeholder="Choisir un ami" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {friends.map((friend) => {
                                    // Déterminer le texte à afficher pour l'ami
                                    const friendName = friend.id + ' : ' + (friend.firstname || friend.lastname
                                        ? `${friend.firstname || ''} ${friend.lastname || ''}`.trim()
                                        : 'Anonyme');
                                    return (
                                        <SelectItem key={friend.id} value={friend.id.toString()}>
                                            {friendName}
                                        </SelectItem>
                                    );
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>


                    <div className="flex justify-end space-x-2">
                        {loading ? (
                            <Button variant="secondary" disabled>
                                Ajout en cours...
                            </Button>
                        ) : (
                            <>
                                <Button variant="secondary" onClick={() => setIsOpen(false)}>
                                    Annuler
                                </Button>
                                <Button variant="default" type="submit" disabled={!formFriend}>
                                    Ajouter
                                </Button>
                            </>
                        )}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
);

ChatAddFriendModal.displayName = 'ChatFriendModal'; // Important pour la bonne gestion de forwardRef

export default ChatAddFriendModal;
