import HttpRequest from '@/services/http-request';

export const getResumes = () => HttpRequest.get('/resumes/all');

export const createResume = resume =>
  HttpRequest.post('/resumes', { ...resume });

export const getResumeById = ({ id }, config = {}) =>
  HttpRequest.get(`/resumes/${id}`, config);

export const updateResume = (id, data) =>
  HttpRequest.patch(`/resumes/${id}`, data);
