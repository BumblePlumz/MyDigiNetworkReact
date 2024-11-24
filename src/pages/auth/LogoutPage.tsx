import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatContext } from '@/contexts/ChatContext';

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { socket } = useChatContext();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('articles');
    localStorage.removeItem('currentArticle');

    // Déconnexion du WebSocket
    if (socket) {
      socket.emit('logout');
    }

    navigate('/Authentification?mode=login');
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return null; // Peut-être afficher un message de déconnexion ici
};

export default LogoutPage;
