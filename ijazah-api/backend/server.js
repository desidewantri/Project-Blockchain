const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

// Import routes
const authRoutes = require('./routes/auth');
const certificateRoutes = require('./routes/certificates');
const institutionRoutes = require('./routes/institutions');
const oracleRoutes = require('./routes/oracle');
const blockchainRoutes = require('./routes/blockchain');

const app = express();

// Connect to database
connectDB();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: (process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000, // 15 minutes
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 100,
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Custom middleware
app.use(logger);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/certificates', certificateRoutes);
app.use('/api/v1/institutions', institutionRoutes);
app.use('/api/v1/oracle', oracleRoutes);
app.use('/api/v1/blockchain', blockchainRoutes);

// API Documentation route
app.get('/api/docs', (req, res) => {
  res.json({
    title: 'Web3 Certificate Verification API',
    version: '1.0.0',
    description: 'REST API for blockchain-based digital certificate verification',
    endpoints: {
      auth: '/api/v1/auth',
      certificates: '/api/v1/certificates',
      institutions: '/api/v1/institutions',
      oracle: '/api/v1/oracle',
      blockchain: '/api/v1/blockchain'
    },
    documentation: 'https://documenter.getpostman.com/view/your-collection-id'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    availableEndpoints: [
      '/api/v1/auth',
      '/api/v1/certificates',
      '/api/v1/institutions',
      '/api/v1/oracle',
      '/api/v1/blockchain'
    ]
  });
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/health`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;