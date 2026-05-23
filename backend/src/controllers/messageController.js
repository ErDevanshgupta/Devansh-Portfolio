const Message = require('../models/Message');
const { sendContactNotification, sendAutoReply } = require('../utils/email');
const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().min(3).max(200).required(),
  message: Joi.string().min(10).max(2000).required()
});

const submitContact = async (req, res, next) => {
  try {
    const { error, value } = contactSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const msg = await Message.create({ ...value, ip: req.ip });

    // Fire-and-forget emails (don't await — don't block the response)
    sendContactNotification(value).catch(console.error);
    sendAutoReply(value).catch(console.error);

    res.status(201).json({ success: true, message: 'Message sent! I will get back to you soon.' });
  } catch (err) {
    next(err);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (err) { next(err); }
};

const markRead = async (req, res, next) => {
  try {
    await Message.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ success: true, message: 'Marked as read' });
  } catch (err) { next(err); }
};

const deleteMessage = async (req, res, next) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) { next(err); }
};

module.exports = { submitContact, getMessages, markRead, deleteMessage };
