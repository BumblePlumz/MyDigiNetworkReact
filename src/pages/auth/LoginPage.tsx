import { FC } from 'react';
import { json, redirect } from 'react-router-dom';
import { BASE_URL } from '@/lib/constants';
import { ARTICLE_ALL } from '@/lib/routes';
import AuthForm from '@/components/auth/AuthForm';

const LoginPage: FC = () => {
  return (
    <main className='min-h-[100vh] pt-[10%]'>
      <AuthForm></AuthForm>
    </main>
  )
}

export default LoginPage;

export async function action({ request }: { request: Request }): Promise<Response> {
  const searchParams: URLSearchParams = new URL(request.url).searchParams;
  const mode: string = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'register') {
    throw json({ message: 'Invalid mode : ' + mode }, 422);
  }

  const formRequest = await request.formData();
  const email = formRequest.get('email');
  const password = formRequest.get('password');
  if (!email || !password) {
    throw json({ message: 'Email and password are required' }, 422);
  }

  const response = await fetch(`${BASE_URL}/auth/${mode}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (!response.ok) throw json(await response.json(), response.status);
  const { token } = await response.json();
  localStorage.setItem('token', token);
  localStorage.setItem('expiration', new Date(Date.now() + 3600000).toISOString());
  return redirect(ARTICLE_ALL);
}
