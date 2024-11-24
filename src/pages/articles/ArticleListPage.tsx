import { useEffect } from 'react';
import { json, useLoaderData } from 'react-router-dom';
import { useArticlesContext } from '@/contexts/ArticlesContext';
import { ArticlesList } from '@/components';
import { getAuthToken } from '@/lib/auth';
import { BASE_URL } from '@/lib/constants';
import { Article } from '@/types/article';

const ArticleListPage: React.FC = () => {
  const url = window.location.pathname;
  const { setArticles } = useArticlesContext();
  const articles = useLoaderData() as Article[];
  console.log('articles', articles);

  useEffect(() => {
    if (articles) setArticles(articles);
  }, [articles]);

  let listTitle = '';
  switch (url) {
    case '/articles/tous-les-articles':
      listTitle = 'Tous les articles';
      break;
    case '/articles/mes-articles':
      listTitle = 'Mes articles';
      break;
    case '/articles/les-articles-amis':
      listTitle = 'Les articles de mes amis';
      break;
    default:
      listTitle = 'Des articles';
  }

  return (
    <ArticlesList listTitle={listTitle} />
  );
};

export default ArticleListPage;

export async function articlesLoaderAll(): Promise<Response> {
  return fetchArticles('/article'); 
}

export async function articlesLoaderCurrentUser(): Promise<Response> {
  return fetchArticles('/article/me');
}

export async function articlesLoaderSubscribed(): Promise<Response> {
  return fetchArticles('/article/subscribed');
}

async function fetchArticles(endpoint: string): Promise<Response> {
  try {
    const response = await fetch(BASE_URL + endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getAuthToken(),
      },
    });

    if (!response.ok) {
      const errorMsg = `Error ${response.status}: ${response.statusText}`;
      return json({ message: errorMsg }, { status: response.status });
    }
    const articles = await response.json();
    return json(articles);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStatus = error instanceof Response && error.status ? error.status : 500;
    console.error("Erreur lors de la récupération des articles :", errorMessage);
    return json({ message: 'Erreur lors de la récupération des articles', error: errorMessage }, { status: errorStatus });
  }
}