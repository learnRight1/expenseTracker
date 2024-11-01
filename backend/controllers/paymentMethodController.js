// controllers/paymentMethodController.js
const PaymentMethod = require('../models/PaymentMethod');

// Add a new payment method
exports.addPaymentMethod = async (req, res) => {
  try {
    const { name } = req.body;
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
};

// Fetch all payment methods
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
