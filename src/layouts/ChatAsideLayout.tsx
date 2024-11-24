import { Outlet, useLoaderData } from 'react-router-dom';
import { ChatAsideMenu } from '@/components';
import { useEffect } from 'react';
import { Room } from '@/types/room';

const ArticleAsideLayout: React.FC = () => {
  return (
    <main className="flex flex-row justify-end">
      {/* Menu latéral fixe */}
      <aside className="z-40 fixed top-4 md:top-0 left-0 w-[30%] md:w-[20%] h-full border bg-gray-100">
        <ChatAsideMenu />
      </aside>

      {/* Contenu principal, avec une marge à gauche pour ne pas chevaucher le menu */}
      <article className="ml-[33%] md:ml-[21%] w-2/3 md:w-4/5 m-3">
        <Outlet />
      </article>
    </main>
  );
};

export default ArticleAsideLayout;
