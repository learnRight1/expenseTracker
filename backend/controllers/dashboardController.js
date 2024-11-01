// controllers/dashboardController.js
const { Expense, Budget } = require('../models');

exports.getDashboardData = async (req, res) => {
  try {
    // Retrieve total expenses
    const totalExpenses = await Expense.sum('amount');

    // Fetch budget for a specific user; replace `userId: 1` with actual user ID logic
    const budget = await Budget.findOne({ where: { userId: 1 } });

    // Calculate budget used and remaining budget
    const budgetUsed = totalExpenses || 0;
    const remainingBudget = budget ? budget.amount - budgetUsed : 0;

    res.json({
      totalExpenses: totalExpenses || 0,
      budgetUsed: budgetUsed,
      remainingBudget: remainingBudget,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving dashboard data',
      error: error.message,
    });
  }
};
