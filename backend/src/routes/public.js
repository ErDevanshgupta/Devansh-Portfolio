const express = require('express');
const router = express.Router();
const { getProjects, getProjectBySlug } = require('../controllers/projectController');
const { getPosts, getPostBySlug } = require('../controllers/blogController');
const { submitContact } = require('../controllers/messageController');
const { contactLimiter } = require('../middleware/rateLimiter');

router.get('/projects', getProjects);
router.get('/projects/:slug', getProjectBySlug);

router.get('/blog', getPosts);
router.get('/blog/:slug', getPostBySlug);

router.post('/contact', contactLimiter, submitContact);

module.exports = router;
