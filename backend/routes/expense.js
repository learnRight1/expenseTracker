const express = require('express');
const Expense = require('../models/Expense');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route to add an expense
router.post('/add', authMiddleware, async (req, res) => {
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
});

// Route to get all expenses
router.get('/', authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving expenses', error: error.message });
  }
});

// Route to get an expense by ID for editing
router.get('/:id', authMiddleware, async (req, res) => {
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
});

// Route to update an expense
router.put('/edit/:id', authMiddleware, async (req, res) => {
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
});

// Route to delete an expense by ID
router.delete('/delete/:id', authMiddleware, async (req, res) => {
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
});

module.exports = router;
