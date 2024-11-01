// controllers/budgetController.js
const { Budget } = require('../models/Budget');

// Controller function to add a new budget
exports.addBudget = async (req, res) => {
  const { amount, category_id, startDate, endDate } = req.body;

  try {
    const newBudget = await Budget.create({
      amount,
      category_id,
      startDate,
      endDate,
    });
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(500).json({
      message: 'Error adding budget',
      error: error.message,
    });
  }
};
