export { default as ErrorPage } from './ErrorPage';

//  AUTH
export { default as LoginPage } from './auth/LoginPage';
export { action as authenticate } from './auth/LoginPage';
export { default as LogoutPage } from './auth/LogoutPage';

// CHATS
export { default as ChatPage } from './chats/ChatPage';
export { action as chatAction } from './chats/ChatPage';
export { loader as chatLoader } from './chats/ChatPage';

//  ARTICLES
export { default as ArticlePage } from './articles/ArticlePage';

export { default as ArticleListPage } from './articles/ArticleListPage';
export { articlesLoaderAll } from './articles/ArticleListPage';
export { articlesLoaderCurrentUser } from './articles/ArticleListPage';
export { articlesLoaderSubscribed } from './articles/ArticleListPage';

export { default as ArticleCreationPage } from './articles/ArticleCreationPage';
export { articleActionCreation } from './articles/ArticleCreationPage';

export { default as ArticleEditPage } from './articles/ArticleEditPage';

export { default as ArticleDeletePage } from './articles/ArticleDeletePage';
export { articleActionDelete } from './articles/ArticleDeletePage';

// FRIENDS
export { default as FriendsPage } from './friends/FriendsPage';
export { friendLoaderAll } from './friends/FriendsPage';
// PROFIL
export {default as ProfilPage } from './profils/ProfilPage';