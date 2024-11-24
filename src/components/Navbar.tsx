import { useState } from 'react';
import { Button } from '@/components/ui/button'; // Assurez-vous que vous avez importé le composant Button
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import { NAV_ARTICLE, NAV_FRIEND, NAV_HOME, NAV_LOGOUT, NAV_PROFILE, NAV_CHAT } from '@/lib/routes';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // État pour gérer l'ouverture du menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header id="top" className="relative bg-white shadow-md min-w-full z-50">
      <nav className="container mx-auto py-3 flex items-center justify-between relative">
        {/* Logo */}
        <div className="ms-3 text-2xl font-bold text-blue-600">
          <NavLink to={NAV_HOME}>MyDigi Network</NavLink>
        </div>

        {/* Navigation Menu */}
        <div className="relative me-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="md:hidden" onClick={toggleMenu}>
                Menu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute right-[-50px] mt-2 w-48 bg-white border rounded shadow-md">
              <DropdownMenuItem asChild>
                <NavLink to={NAV_ARTICLE} className="block px-4 py-2">Articles</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink to={NAV_FRIEND} className="block px-4 py-2">Amis</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink to={NAV_CHAT} className="block px-4 py-2">Chat</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink to={NAV_PROFILE} className="block px-4 py-2">Profil</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink to={NAV_LOGOUT} className="block px-4 py-2 bg-gray-300 rounded">Déconnexion</NavLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Menu de navigation pour les écrans plus larges */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavLink to={NAV_ARTICLE} className="text-blue-600">Articles</NavLink>
            <NavLink to={NAV_FRIEND} className="text-blue-600">Amis</NavLink>
            <NavLink to={NAV_CHAT} className="text-blue-600">Chat</NavLink>
            <NavLink to={NAV_PROFILE} className="text-blue-600">Profil</NavLink>
            <NavLink to={NAV_LOGOUT} className="bg-gray-300 rounded px-4 py-2 text-blue-600">Déconnexion</NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
