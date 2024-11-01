const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const Budget = require('../models/Budget');

// Route to get dashboard data
router.get('/', async (req, res) => {
  try {
    const totalExpenses = await Expense.sum('amount');
    const budget = await Budget.findOne({ where: { userId: 1 } }); // Replace with actual user logic
    const budgetUsed = totalExpenses || 0;
    const remainingBudget = budget ? budget.amount - budgetUsed : 0;

    res.json({
      totalExpenses: totalExpenses || 0,
      budgetUsed: budgetUsed,
      remainingBudget: remainingBudget,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: 'Error retrieving dashboard data',
        error: error.message,
      });
  }
});

module.exports = router;
