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
export const getSkills = () => api.get('/skills').then(r => r.data.data);
export const getExperiences = () => api.get('/experience').then(r => r.data.data);
export const getCertifications = () => api.get('/certifications').then(r => r.data.data);
export const submitContact = (data) => api.post('/contact', data).then(r => r.data);

export const trackPageView = (path) =>
  api.post('/analytics/pageview', { path }).catch(() => {});

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

export const adminUploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const res = await api.post('/admin/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data.url;
};

export const adminGetMessages = () => api.get('/admin/messages').then(r => r.data.data);
export const adminMarkRead = (id) => api.patch(`/admin/messages/${id}/read`).then(r => r.data.data);
export const adminDeleteMessage = (id) => api.delete(`/admin/messages/${id}`).then(r => r.data);
export const adminGetAnalytics = () => api.get('/admin/analytics').then(r => r.data.data);
export const adminGetLogs = () => api.get('/admin/logs').then(r => r.data.data);

// Skills Admin
export const adminGetSkills = () => api.get('/admin/skills').then(r => r.data.data);
export const adminCreateSkill = (data) => api.post('/admin/skills', data).then(r => r.data.data);
export const adminUpdateSkill = (id, data) => api.put(`/admin/skills/${id}`, data).then(r => r.data.data);
export const adminDeleteSkill = (id) => api.delete(`/admin/skills/${id}`).then(r => r.data);
export const adminReorderSkills = (items) => api.put('/admin/skills/reorder', { items }).then(r => r.data);

// Experience Admin
export const adminGetExperiences = () => api.get('/admin/experience').then(r => r.data.data);
export const adminCreateExperience = (data) => api.post('/admin/experience', data).then(r => r.data.data);
export const adminUpdateExperience = (id, data) => api.put(`/admin/experience/${id}`, data).then(r => r.data.data);
export const adminDeleteExperience = (id) => api.delete(`/admin/experience/${id}`).then(r => r.data);
export const adminReorderExperiences = (items) => api.put('/admin/experience/reorder', { items }).then(r => r.data);

// Certification Admin
export const adminGetCertifications = () => api.get('/admin/certifications').then(r => r.data.data);
export const adminCreateCertification = (data) => api.post('/admin/certifications', data).then(r => r.data.data);
export const adminUpdateCertification = (id, data) => api.put(`/admin/certifications/${id}`, data).then(r => r.data.data);
export const adminDeleteCertification = (id) => api.delete(`/admin/certifications/${id}`).then(r => r.data);
export const adminToggleFeaturedCertification = (id) => api.patch(`/admin/certifications/${id}/featured`).then(r => r.data);
