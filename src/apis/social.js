import HttpRequest from '@/services/http-request';

export const getSocials = () => HttpRequest.get('/socials/all');

export const createSocial = social =>
  HttpRequest.post('/socials', { ...social });

export const getSocialById = ({ id }, config = {}) =>
  HttpRequest.get(`/socials/${id}`, config);

export const updateSocial = (id, data) =>
  HttpRequest.patch(`/socials/${id}`, data);
