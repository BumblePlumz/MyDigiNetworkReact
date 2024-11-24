import { FC } from 'react';
import { LoaderFunctionArgs, json, redirect } from 'react-router-dom';
import { getAuthToken } from '@/lib/auth';
import { BASE_URL } from '@/lib/constants';
import { ARTICLE_ALL } from '@/lib/routes';

interface Props {}

const ArticleDeletePage: FC<Props> = ({}) => {
  return (
    <>
      <h1>ArticleDeletePage</h1>
    </>
  );
};

export default ArticleDeletePage;


export async function articleActionDelete({ params }: LoaderFunctionArgs): Promise<Response> {
  const token = getAuthToken();
  const articleId = params.id;

  try {
    const response = await fetch(BASE_URL + `/article/${articleId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    if (!response.ok) {
      return json({ message: 'Failed to delete article', error: response.statusText }, { status: response.status });
    }

    return redirect(ARTICLE_ALL);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return json({ message: 'An error occurred while deleting the article', error: errorMessage }, { status: 500 });
  }
}