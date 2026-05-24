const { logAction } = require('../utils/logger');
const SkillGroup = require('../models/SkillGroup');

const getSkills = async (req, res, next) => {
  try {
    const skills = await SkillGroup.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: skills });
  } catch (err) { next(err); }
};

const createSkill = async (req, res, next) => {
  try {
    const skill = await SkillGroup.create(req.body);
    await logAction('CREATE', 'Skill', skill.title || skill.company || skill.category || 'New Item');
    res.status(201).json({ success: true, data: skill });
  } catch (err) { next(err); }
};

const updateSkill = async (req, res, next) => {
  try {
    const skill = await SkillGroup.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (skill) await logAction('UPDATE', 'Skill', skill.title || skill.company || skill.category || 'Item');
    if (!skill) return res.status(404).json({ success: false, message: 'Skill group not found' });
    res.json({ success: true, data: skill });
  } catch (err) { next(err); }
};

const deleteSkill = async (req, res, next) => {
  try {
    const deletedItem = await SkillGroup.findByIdAndDelete(req.params.id);
    if (deletedItem) await logAction('DELETE', 'Skill', deletedItem.title || deletedItem.company || deletedItem.category || 'Item');
    res.json({ success: true, message: 'Skill group deleted' });
  } catch (err) { next(err); }
};

const reorderSkills = async (req, res, next) => {
  try {
    const { items } = req.body; // array of { id, order }
    for (const item of items) {
      await SkillGroup.findByIdAndUpdate(item.id, { order: item.order });
    }
    res.json({ success: true, message: 'Reordered successfully' });
  } catch (err) { next(err); }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill, reorderSkills };
