const Expense = require('../models/Expense');

// Add a new expense
exports.addExpense = async (req, res) => {
  const { amount, date, description, category, paymentMethod } = req.body;
  try {
    const newExpense = await Expense.create({
      amount,
      date,
      description,
      category,
      paymentMethod,
    });
    res
      .status(201)
      .json({ message: 'Expense added successfully', data: newExpense });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error adding expense', error: error.message });
  }
};

// Get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving expenses', error: error.message });
  }
};

// Get an expense by ID
exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (expense) {
      res.json(expense);
    } else {
      res.status(404).json({ message: 'Expense not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving expense', error: error.message });
  }
};

// Update an expense by ID
exports.updateExpense = async (req, res) => {
  const { amount, date, description, category, paymentMethod } = req.body;
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (expense) {
      expense.amount = amount;
      expense.date = date;
      expense.description = description;
      expense.category = category;
      expense.paymentMethod = paymentMethod;
      await expense.save();
      res.json({ message: 'Expense updated successfully', data: expense });
    } else {
      res.status(404).json({ message: 'Expense not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating expense', error: error.message });
  }
};

// Delete an expense by ID
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (expense) {
      await expense.destroy();
      res.json({ message: 'Expense deleted successfully' });
    } else {
      res.status(404).json({ message: 'Expense not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting expense', error: error.message });
  }
};
