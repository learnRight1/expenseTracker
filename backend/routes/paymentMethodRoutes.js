const express = require('express');
const router = express.Router();
const { PaymentMethod } = require('../models'); // Assuming model name is correct

// Route to fetch all payment methods
router.get('/', async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.findAll();
    res.json(paymentMethods);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching payment methods',
      error: error.message,
    });
  }
});

// Route to add a new payment method
router.post('/add', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Payment method name is required' });
  }

  try {
    const newPaymentMethod = await PaymentMethod.create({ name });
    res.status(201).json({
      message: 'Payment method added successfully',
      data: newPaymentMethod,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error adding payment method', error: error.message });
  }
});

module.exports = router;
