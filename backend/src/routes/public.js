const express = require('express');
const router = express.Router();
const { getProjects, getProjectBySlug } = require('../controllers/projectController');
const { getPosts, getPostBySlug } = require('../controllers/blogController');
const { getSkills } = require('../controllers/skillController');
const { getExperiences } = require('../controllers/experienceController');
const { getPublicCertifications } = require('../controllers/certController');
const { submitContact } = require('../controllers/messageController');
const { contactLimiter } = require('../middleware/rateLimiter');

router.get('/projects', getProjects);
router.get('/projects/:slug', getProjectBySlug);

router.get('/blog', getPosts);
router.get('/blog/:slug', getPostBySlug);

router.get('/skills', getSkills);
router.get('/experience', getExperiences);
router.get('/certifications', getPublicCertifications);

router.post('/contact', contactLimiter, submitContact);

module.exports = router;
