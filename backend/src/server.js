require('dotenv').config();
require('./config/env');  // Validate env vars first

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { apiLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const { seedAdmin } = require('./controllers/adminController');

const publicRoutes = require('./routes/public');
const adminRoutes = require('./routes/admin');
const analyticsRoutes = require('./routes/analytics');

const { PORT, FRONTEND_URL } = require('./config/env');

const app = express();

// Security middleware
app.use(helmet());

// Allowed origins: support both www and non-www, plus optional Vercel preview URL
const allowedOrigins = [
  FRONTEND_URL,
  FRONTEND_URL.replace('://', '://www.'),
  FRONTEND_URL.replace('://www.', '://'),
  'http://localhost:3000',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // Allow any *.vercel.app preview deploy
    if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.set('trust proxy', 1);  // Required for rate limiting behind Render proxy

// Rate limit all API routes
app.use('/api', apiLimiter);

// Routes
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));
app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/analytics', analyticsRoutes);

// 404
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// Global error handler (must be last)
app.use(errorHandler);

// Start
const start = async () => {
  await connectDB();
  await seedAdmin();  // Creates admin account if it doesn't exist
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
