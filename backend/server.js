const express = require('express');
const cors = require('cors');
require('dotenv').config();

const vehicleRoutes = require('./src/routes/vehicles');
const trackingRoutes = require('./src/routes/tracking');
const billingRoutes = require('./src/routes/billing');
const contractRoutes = require('./src/routes/contracts');
const quoteRoutes = require('./src/routes/quotes');
const authRoutes = require('./src/routes/auth');

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/quotes', quoteRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'FGL Rastreamento API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
});