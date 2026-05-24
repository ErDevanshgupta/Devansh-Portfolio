const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    enum: ['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'OTHER']
  },
  entityType: {
    type: String,
    required: true,
    enum: ['Blog', 'Project', 'Certification', 'Skill', 'Experience', 'Message', 'System']
  },
  entityName: {
    type: String,
    required: true
  },
  details: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', auditLogSchema);
