import { LoaderFunctionArgs, json, redirect } from 'react-router-dom';
import ArticleForm from '@/components/articles/ArticleForm';
import { BASE_URL } from '@/lib/constants';

const ArticleCreationPage: React.FC = () => {
  return (
    <>
      <ArticleForm method='post' />
    </>
  );
};

export default ArticleCreationPage;


export async function articleActionCreation({ request }: LoaderFunctionArgs): Promise<Response> {
  const formRequest = await request.formData();
  let url = `${BASE_URL}/article`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      title: formRequest.get('title'),
      content: formRequest.get('content'),
    }),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) throw json(await response.json(), response.status);
  return redirect('/articles/mes-articles');
}