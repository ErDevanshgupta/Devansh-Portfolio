const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { login, logout, getMe } = require('../controllers/adminController');
const { getAllProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { getAllPosts, createPost, updatePost, deletePost } = require('../controllers/blogController');
const { getMessages, markRead, deleteMessage } = require('../controllers/messageController');
const { getAnalytics } = require('../controllers/analyticsController');

// Auth routes (no middleware)
router.post('/login', login);
router.post('/logout', auth, logout);
router.get('/me', auth, getMe);

// Protected routes
router.get('/projects', auth, getAllProjects);
router.post('/projects', auth, createProject);
router.put('/projects/:id', auth, updateProject);
router.delete('/projects/:id', auth, deleteProject);

router.get('/blog', auth, getAllPosts);
router.post('/blog', auth, createPost);
router.put('/blog/:id', auth, updatePost);
router.delete('/blog/:id', auth, deletePost);

router.get('/messages', auth, getMessages);
router.patch('/messages/:id/read', auth, markRead);
router.delete('/messages/:id', auth, deleteMessage);

router.get('/analytics', auth, getAnalytics);

module.exports = router;
