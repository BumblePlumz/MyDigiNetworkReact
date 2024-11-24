import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ArticleAsideLayout from "./layouts/ArticleAsideLayout";
import ChatAsideLayout from "./layouts/ChatAsideLayout";
import FriendAsideLayout from "./layouts/FriendAsideLayout";
import {
  LoginPage,
  authenticate,
  LogoutPage,
  ErrorPage,
  ChatPage,
  chatAction,
  chatLoader,
  ArticlePage,
  ArticleListPage,
  articlesLoaderAll,
  articlesLoaderCurrentUser,
  articlesLoaderSubscribed,
  ArticleCreationPage,
  articleActionCreation,
  ArticleEditPage,
  ArticleDeletePage,
  articleActionDelete,
  FriendsPage,
  ProfilPage,
  friendLoaderAll,
} from "./pages/index";
import { tokenLoader } from "./lib/auth";
import { ChatProvider } from "./contexts/ChatContext";
import { ArticlesProvider } from "./contexts/ArticlesContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        path: "articles",
        element: <ArticleAsideLayout />,
        children: [
          {
            path: "tous-les-articles",
            element: <ArticleListPage />,
            loader: articlesLoaderAll,
          },
          {
            path: "mes-articles",
            element: <ArticleListPage />,
            loader: articlesLoaderCurrentUser,
          },
          {
            path: "les-articles-amis",
            element: <ArticleListPage />,
            loader: articlesLoaderSubscribed,
          },
          {
            path: 'creation',
            element: <ArticleCreationPage />,
            action: articleActionCreation,

          },
          {
            path: ":id",
            element: <ArticlePage />,
            children: [
              {
                path: "editer",
                element: <ArticleEditPage />,
                action: articleActionDelete,
              },
              {
                path: "supprimer",
                element: <ArticleDeletePage />,
                action: articleActionDelete,
              },
            ],
          },
        ],
      },
      {
        path: "chats",
        element: <ChatAsideLayout />,
        loader: chatLoader,
        children: [
          {
            index: true,
            element: <ChatPage />,
            action: chatAction,
          },
        ],
      },
      {
        path: "amis",
        element: <FriendAsideLayout />,
        loader: friendLoaderAll,
        children: [
          {
            path: "all",
            element: <FriendsPage />,
          },
        ],
      },
      {
        path: "profil",
        element: <ProfilPage />,
      },
    ],
  },
  {
    path: "/authentification",
    element: <LoginPage />,
    action: authenticate,
  },
  {
    path: "/logout",
    element: <LogoutPage />,
  },
]);

function App() {
  return (
    <ChatProvider>
      <ArticlesProvider>
        <RouterProvider future={{ v7_startTransition: true }} router={router} />
      </ArticlesProvider>
    </ChatProvider>
  );
}

export default App;
