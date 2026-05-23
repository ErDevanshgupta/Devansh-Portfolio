import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 10000,
});

// ─── Public API ────────────────────────────────────────
export const getProjects = () => api.get('/projects').then(r => r.data.data);
export const getProjectBySlug = (slug) => api.get(`/projects/${slug}`).then(r => r.data.data);

export const getBlogPosts = () => api.get('/blog').then(r => r.data.data);
export const getBlogPostBySlug = (slug) => api.get(`/blog/${slug}`).then(r => r.data.data);

export const submitContact = (data) => api.post('/contact', data).then(r => r.data);

export const trackPageView = (path) =>
  api.post(`${process.env.NEXT_PUBLIC_API_URL.replace('/api', '')}/api/analytics/pageview`, { path })
     .catch(() => {});

// ─── Admin API ─────────────────────────────────────────
export const adminLogin = (data) => api.post('/admin/login', data).then(r => r.data);
export const adminLogout = () => api.post('/admin/logout').then(r => r.data);
export const getMe = () => api.get('/admin/me').then(r => r.data.data);

export const adminGetProjects = () => api.get('/admin/projects').then(r => r.data.data);
export const adminCreateProject = (data) => api.post('/admin/projects', data).then(r => r.data);
export const adminUpdateProject = (id, data) => api.put(`/admin/projects/${id}`, data).then(r => r.data);
export const adminDeleteProject = (id) => api.delete(`/admin/projects/${id}`).then(r => r.data);

export const adminGetPosts = () => api.get('/admin/blog').then(r => r.data.data);
export const adminCreatePost = (data) => api.post('/admin/blog', data).then(r => r.data);
export const adminUpdatePost = (id, data) => api.put(`/admin/blog/${id}`, data).then(r => r.data);
export const adminDeletePost = (id) => api.delete(`/admin/blog/${id}`).then(r => r.data);

export const adminGetMessages = () => api.get('/admin/messages').then(r => r.data.data);
export const adminMarkRead = (id) => api.patch(`/admin/messages/${id}/read`).then(r => r.data);
export const adminDeleteMessage = (id) => api.delete(`/admin/messages/${id}`).then(r => r.data);

export const adminGetAnalytics = (days = 30) => api.get(`/admin/analytics?days=${days}`).then(r => r.data.data);
