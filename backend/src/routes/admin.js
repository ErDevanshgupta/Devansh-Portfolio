const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { login, logout, getMe } = require('../controllers/adminController');
const { getAllProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { getAllPosts, createPost, updatePost, deletePost } = require('../controllers/blogController');
const { getMessages, markRead, deleteMessage } = require('../controllers/messageController');
const { getAnalytics } = require('../controllers/analyticsController');
const certController = require('../controllers/certController');
const { getLogs } = require('../controllers/auditController');
const upload = require('../middleware/upload');
const { uploadImage } = require('../controllers/uploadController');
const { getSkills, createSkill, updateSkill, deleteSkill, reorderSkills } = require('../controllers/skillController');
const { getExperiences, createExperience, updateExperience, deleteExperience, reorderExperiences } = require('../controllers/experienceController');

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

// Logs
router.get('/logs', auth, getLogs);

router.post('/upload', auth, upload.single('image'), uploadImage);

// Skills
router.get('/skills', auth, getSkills);
router.post('/skills', auth, createSkill);
router.put('/skills/reorder', auth, reorderSkills);
router.put('/skills/:id', auth, updateSkill);
router.delete('/skills/:id', auth, deleteSkill);

// Experiences
router.get('/experience', auth, getExperiences);
router.post('/experience', auth, createExperience);
router.put('/experience/reorder', auth, reorderExperiences);
router.put('/experience/:id', auth, updateExperience);
router.delete('/experience/:id', auth, deleteExperience);

// Certifications
router.get('/certifications', certController.getCertifications);
router.post('/certifications', auth, certController.createCertification);
router.put('/certifications/:id', auth, certController.updateCertification);
router.delete('/certifications/:id', auth, certController.deleteCertification);
router.patch('/certifications/:id/featured', auth, certController.toggleFeatured);

module.exports = router;
