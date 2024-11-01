// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenseRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const paymentMethodRoutes = require('./routes/paymentMethodRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(cors());

// Serve static files
app.use(express.static('public'));

// Routes
app.use('/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/paymentMethod', paymentMethodRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/budgets', budgetRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
