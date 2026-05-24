const { logAction } = require('../utils/logger');
const Certification = require('../models/Certification');

exports.getCertifications = async (req, res) => {
  try {
    const certs = await Certification.find().sort({ displayOrder: 1, issueDate: -1, createdAt: -1 });
    res.json({ success: true, data: certs });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching certifications' });
  }
};

exports.getPublicCertifications = async (req, res) => {
  try {
    const certs = await Certification.find().sort({ displayOrder: 1, issueDate: -1, createdAt: -1 });
    res.json({ success: true, data: certs });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching public certifications' });
  }
};

exports.createCertification = async (req, res) => {
  try {
    const cert = new Certification(req.body);
    await cert.save();
    await logAction('CREATE', 'Certification', cert.title || cert.company || cert.category || 'New Item');
    res.status(201).json({ success: true, data: cert });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCertification = async (req, res) => {
  try {
    const cert = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (cert) await logAction('UPDATE', 'Certification', cert.title || cert.company || cert.category || 'Item');
    if (!cert) return res.status(404).json({ message: 'Not found' });
    res.json({ success: true, data: cert });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCertification = async (req, res) => {
  try {
    const deletedItem = await Certification.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Not found' });
    await logAction('DELETE', 'Certification', deletedItem.title || deletedItem.category || 'Item');
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting certification' });
  }
};

exports.toggleFeatured = async (req, res) => {
  try {
    const cert = await Certification.findById(req.params.id);
    if (!cert) return res.status(404).json({ message: 'Not found' });
    cert.featured = !cert.featured;
    await cert.save();
    await logAction('UPDATE', 'Certification', cert.title + ' (Toggle Featured)');
    res.json({ success: true, data: cert });
  } catch (err) {
    res.status(400).json({ message: 'Error toggling featured status' });
  }
};
