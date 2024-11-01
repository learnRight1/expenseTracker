// controllers/categoryController.js
const { Category } = require('../models/Category'); // Import the model

// Controller to add a new category
exports.addCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({
      message: 'Error adding category',
      error: error.message,
    });
  }
};
