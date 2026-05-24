const { logAction } = require('../utils/logger');
const Experience = require('../models/Experience');

const getExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: experiences });
  } catch (err) { next(err); }
};

const createExperience = async (req, res, next) => {
  try {
    const exp = await Experience.create(req.body);
    await logAction('CREATE', 'Experience', exp.title || exp.company || exp.category || 'New Item');
    res.status(201).json({ success: true, data: exp });
  } catch (err) { next(err); }
};

const updateExperience = async (req, res, next) => {
  try {
    const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (exp) await logAction('UPDATE', 'Experience', exp.title || exp.company || exp.category || 'Item');
    if (!exp) return res.status(404).json({ success: false, message: 'Experience not found' });
    res.json({ success: true, data: exp });
  } catch (err) { next(err); }
};

const deleteExperience = async (req, res, next) => {
  try {
    const deletedItem = await Experience.findByIdAndDelete(req.params.id);
    if (deletedItem) await logAction('DELETE', 'Experience', deletedItem.title || deletedItem.company || deletedItem.category || 'Item');
    res.json({ success: true, message: 'Experience deleted' });
  } catch (err) { next(err); }
};

const reorderExperiences = async (req, res, next) => {
  try {
    const { items } = req.body; // array of { id, order }
    for (const item of items) {
      await Experience.findByIdAndUpdate(item.id, { order: item.order });
    }
    res.json({ success: true, message: 'Reordered successfully' });
  } catch (err) { next(err); }
};

module.exports = { getExperiences, createExperience, updateExperience, deleteExperience, reorderExperiences };
