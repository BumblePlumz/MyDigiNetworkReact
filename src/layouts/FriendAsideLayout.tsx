import { FC } from 'react';
import { Outlet } from 'react-router-dom';

interface Props {
  
}
const FriendAsideLayout: FC<Props> = () => {
  return (
    <main className="flex flex-col justify-end">
      {/* Menu latéral fixe */}
      {/* <aside className="z-40 fixed top-4 md:top-0 left-0 w-[30%] md:w-[20%] h-full border bg-gray-100">
        <FriendAsideMenu />
      </aside> */}

      {/* Contenu principal, avec une marge à gauche pour ne pas chevaucher le menu */}
      <article className="m-3 min-h-[calc(100vh-88px)] flex flex-col">
        <Outlet />
      </article>
    </main>
  );
};

export default FriendAsideLayout;