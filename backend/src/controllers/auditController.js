const AuditLog = require('../models/AuditLog');

const getLogs = async (req, res, next) => {
  try {
    const logs = await AuditLog.find()
      .sort({ createdAt: -1 })
      .limit(100);
    res.json({ success: true, data: logs });
  } catch (err) {
    next(err);
  }
};

module.exports = { getLogs };
