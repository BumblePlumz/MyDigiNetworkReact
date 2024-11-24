import { FC, forwardRef, useImperativeHandle, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogTitle, Button, Input } from '@/components'; // Assure-toi que ces composants sont bien importés
import { getAuthToken } from '@/lib/auth';
import { BASE_URL } from '@/lib/constants';
import { NAV_CHAT } from '@/lib/routes';

interface ChatCreationModalProps {}

export interface ChatCreationModalRef {
  openModal: () => void;
  closeModal: () => void;
}

const ChatCreationModal: FC<ChatCreationModalProps> = forwardRef<ChatCreationModalProps, ChatCreationModalProps>((props, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [chatName, setChatName] = useState('');
    const [loading, setLoading] = useState(false);
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
        const chatData = { name: chatName };

        fetch(`${BASE_URL}/room`, {
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
            setLoading(false);  // Masque le loader
        });
    };

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogTitle>Créer un Chat</DialogTitle>
          <DialogDescription>Entrez le nom du chat à créer.</DialogDescription>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Nom du chat"
              className="w-full p-2 border rounded-md"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
            />

            <div className="flex justify-end space-x-2">
              {loading ? (
                <Button variant="secondary" disabled>
                  Création en cours...
                </Button>
              ) : (
                <>
                  <Button variant="secondary" onClick={() => setIsOpen(false)}>
                    Annuler
                  </Button>
                  <Button variant="default" type="submit">
                    Créer
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

ChatCreationModal.displayName = 'ChatCreationModal'; // Important pour la bonne gestion de forwardRef

export default ChatCreationModal;
