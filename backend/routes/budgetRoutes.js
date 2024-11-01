const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');

// Route to add a new budget
router.post('/budgets', budgetController.addBudget);

module.exports = router;
