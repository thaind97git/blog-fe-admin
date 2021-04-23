import HttpRequest from '@/services/http-request';

export const getCurrentUser = () => HttpRequest.get('/auth/me');
