import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';

const RootLayout: React.FC = () => {
  // Get the token from the loader data
  const token: string | undefined = useLoaderData() as string | undefined;

  // Get the submit function
  const submit = useSubmit();

  // If the token is set, set a timeout to logout the user after 1 hour
  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === 'EXPIRED') {
      submit(null, { method: 'POST', action: '/logout' });
      return;
    }
    setTimeout(() => {
      submit(null, { method: 'POST', action: '/logout' });
    }, 1 * 60 * 60 * 1000);
  }, [token, submit]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;
