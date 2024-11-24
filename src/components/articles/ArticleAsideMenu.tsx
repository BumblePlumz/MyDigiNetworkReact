import { NavLink } from "react-router-dom";
import { ARTICLE_ALL, ARTICLE_NEW, ARTICLE_OWN, ARTICLE_SUBSCRIPTION } from "@/lib/routes";

const ArticleAsideMenu: React.FC = () => {
  return (
    <menu className="w-full min-h-full p-4 ps-0 bg-gray-100 border-r border-gray-300">
      <ul className="flex flex-col items-center gap-4">
        <a href="#top" className="ms-[-5px] shadow-md border-3xl rounded w-10 h-10 flex items-center justify-center bg-blue-600 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7-7-7 7" />
          </svg>
        </a>

        <NavLink
          to={ARTICLE_NEW}
          className={({ isActive }) =>
            `ms-[-5px] shadow-md border rounded-r-lg w-full p-3 text-center 
            ${isActive ? 'bg-white border border-blue-500 text-blue-500' : 'bg-blue-600 text-white'}
            hover:bg-white hover:border-blue-500 hover:text-blue-500 cursor-pointer`
          }
        >
          Créer un article
        </NavLink>

        <NavLink
          to={ARTICLE_ALL}
          end
          className={({ isActive }) =>
            `ms-[-5px] shadow-md border rounded-r-lg w-full p-3 text-center 
            ${isActive ? 'bg-white border border-blue-500 text-blue-500' : 'bg-blue-600 text-white'}
            hover:bg-white hover:border-blue-500 hover:text-blue-500 cursor-pointer`
          }
        >
          Tout les articles
        </NavLink>

        <NavLink
          to={ARTICLE_OWN}
          className={({ isActive }) =>
            `ms-[-5px] shadow border rounded-r-lg w-full p-3 text-center 
            ${isActive ? 'bg-white border border-blue-500 text-blue-500' : 'bg-blue-600 text-white'}
            hover:bg-white hover:border-blue-500 hover:text-blue-500 cursor-pointer`
          }
        >
          Mes articles
        </NavLink>

        <NavLink
          to={ARTICLE_SUBSCRIPTION}
          className={({ isActive }) =>
            `ms-[-5px] shadow border rounded-r-lg w-full p-3 text-center 
            ${isActive ? 'bg-white border border-blue-500 text-blue-500' : 'bg-blue-600 text-white'}
            hover:bg-white hover:border-blue-500 hover:text-blue-500 cursor-pointer`
          }
        >
          Articles de mes amis
        </NavLink>
      </ul>
    </menu>
  );
};

export default ArticleAsideMenu;
