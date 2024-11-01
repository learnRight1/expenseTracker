// routes/utilityRoutes.js
const express = require('express');
const router = express.Router();
const utilityController = require('../controllers/utilityController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes for fetching categories and payment methods, and adding expenses
router.get('/categories', authMiddleware, utilityController.getCategories);
router.get(
  '/paymentMethods',
  authMiddleware,
  utilityController.getPaymentMethods
);
router.post('/expenses', authMiddleware, utilityController.addExpense);

module.exports = router;
