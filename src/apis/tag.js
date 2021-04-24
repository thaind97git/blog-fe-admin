import HttpRequest from '@/services/http-request';

export const getTags = () => HttpRequest.get('/tags/all');

export const createTag = tag => HttpRequest.post('/tags', { ...tag });

export const getTagById = ({ id }, config = {}) =>
  HttpRequest.get(`/tags/${id}`, config);

export const updateTag = (id, data) => HttpRequest.patch(`/tags/${id}`, data);
