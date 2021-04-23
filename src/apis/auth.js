import HttpRequest from '@/services/http-request';

export const getCurrentUser = () => HttpRequest.get('/auth/me');

export const login = ({ email, password }) =>
  HttpRequest.post('/auth/login', { email, password });
