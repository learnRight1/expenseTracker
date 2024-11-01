// controllers/utilityController.js
const { Category, PaymentMethod, Expense } = require('../models');

// Fetch categories for dropdown
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching categories', error: error.message });
  }
};

// Fetch payment methods for dropdown
exports.getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.findAll();
    res.json(paymentMethods);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching payment methods',
      error: error.message,
    });
  }
};

// Add new expense
exports.addExpense = async (req, res) => {
  const { amount, date, description, categoryId, paymentMethodId } = req.body;

  try {
    const newExpense = await Expense.create({
      amount,
      date,
      description,
      categoryId,
      paymentMethodId,
    });
    res.status(201).json(newExpense);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error adding expense', error: error.message });
  }
};
