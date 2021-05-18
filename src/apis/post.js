import HttpRequest from '@/services/http-request';

export const getPostPaging = ({ pageIndex, pageSize }) =>
  HttpRequest.get('/posts', { limit: pageSize, page: pageIndex });

export const getPost = ({ id }, config) =>
  HttpRequest.get(`/posts/${id}`, config);

export const createNewPost = (post, config) =>
  HttpRequest.post('/posts', { ...post, ...config });

export const updatePost = (id, data) =>
  HttpRequest.patch(`/posts/${id}`, { ...data });

export const updatePostStatus = (id, data) =>
  HttpRequest.patch(`/posts/update-status/${id}`, { ...data });
