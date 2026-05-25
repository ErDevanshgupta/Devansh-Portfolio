const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const { JWT_SECRET, JWT_EXPIRES_IN, ADMIN_EMAIL, ADMIN_PASSWORD } = require('../config/env');

// Upsert admin — always syncs password from env vars on every startup
const seedAdmin = async () => {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return;
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await Admin.findOneAndUpdate(
    { email: ADMIN_EMAIL.toLowerCase() },
    { email: ADMIN_EMAIL.toLowerCase(), passwordHash },
    { upsert: true, new: true }
  );
  console.log('Admin account synced');
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
    });

    res.json({ success: true, message: 'Login successful' });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.clearCookie('adminToken', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
  });
  res.json({ success: true, message: 'Logged out' });
};

const getMe = (req, res) => {
  res.json({ success: true, data: { email: req.admin.email } });
};

module.exports = { login, logout, getMe, seedAdmin };
