const { logAction } = require('../utils/logger');
const Project = require('../models/Project');
const { createSlug } = require('../utils/slugify');

// PUBLIC
const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ status: 'published' })
      .sort({ order: 1, createdAt: -1 })
      .select('-__v');
    res.json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
};

const getProjectBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug, status: 'published' });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

// ADMIN
const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
};

const createProject = async (req, res, next) => {
  try {
    const slug = req.body.slug || createSlug(req.body.title);
    const project = await Project.create({ ...req.body, slug });
    await logAction('CREATE', 'Project', project.title || project.company || project.category || 'New Item');
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    if (project) await logAction('UPDATE', 'Project', project.title || 'Item');
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const deletedItem = await Project.findByIdAndDelete(req.params.id);
    if (deletedItem) await logAction('DELETE', 'Project', deletedItem.title || deletedItem.company || deletedItem.category || 'Item');
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProjects, getProjectBySlug, getAllProjects, createProject, updateProject, deleteProject };
