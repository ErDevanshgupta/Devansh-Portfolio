const AuditLog = require('../models/AuditLog');

const logAction = async (action, entityType, entityName, details = '') => {
  try {
    await AuditLog.create({
      action,
      entityType,
      entityName,
      details
    });
  } catch (err) {
    console.error('Failed to write audit log:', err.message);
  }
};

module.exports = { logAction };
