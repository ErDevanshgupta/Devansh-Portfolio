const Blog = require('../models/Blog');
const { createSlug } = require('../utils/slugify');

const getPosts = async (req, res, next) => {
  try {
    const posts = await Blog.find({ status: 'published' })
      .sort({ publishedAt: -1 })
      .select('-content -__v');
    res.json({ success: true, data: posts });
  } catch (err) { next(err); }
};

const getPostBySlug = async (req, res, next) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug, status: 'published' });
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: post });
  } catch (err) { next(err); }
};

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, data: posts });
  } catch (err) { next(err); }
};

const createPost = async (req, res, next) => {
  try {
    const slug = req.body.slug || createSlug(req.body.title);
    const post = await Blog.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: post });
  } catch (err) { next(err); }
};

const updatePost = async (req, res, next) => {
  try {
    const post = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: post });
  } catch (err) { next(err); }
};

const deletePost = async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Post deleted' });
  } catch (err) { next(err); }
};

module.exports = { getPosts, getPostBySlug, getAllPosts, createPost, updatePost, deletePost };
