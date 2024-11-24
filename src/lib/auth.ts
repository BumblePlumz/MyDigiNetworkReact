import { redirect, json } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { User } from '@/types/user';
import { jwt } from '@/types/jwt';

export function tokenLoader(): Response {
  const token = getAuthToken();
  if (!token) return redirect('/Authentification?mode=login');
  if (token === 'EXPIRED') return redirect('/Authentification?mode=login');
  return json({ token });
}

export function getAuthToken(): string | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const tokenDuration = getTokenDuration();
  if (tokenDuration <= 0) {
    return 'EXPIRED';
  }
  return token;
}

export function getId(): string {
  const token = getAuthToken();
  const decodedToken = jwtDecode<jwt>(token!);
  return decodedToken.dataValues.id;
}

export function getUser(): User {
  const token = getAuthToken();
  const decodedToken = jwtDecode<jwt>(token!);
  return decodedToken.dataValues;
}

function getTokenDuration(): number {
  const storedExpiration = localStorage.getItem('expiration');
  let duration = -1;
  if (storedExpiration !== null) {
    const expirationDate = new Date(storedExpiration);
    const now = new Date();
    duration = expirationDate.getTime() - now.getTime();
  }
  return duration;
}