const express = require('express');
const router = express.Router();
const { Category } = require('../models'); // Adjust this import based on your structure

router.post('/', async (req, res) => {
  const { name, user_id } = req.body;

  // Check for required fields
  if (!name || !user_id) {
    return res
      .status(400)
      .json({ error: 'Category name and user ID are required' });
  }

  try {
    // Ensure you're saving the correct field name
    const newCategory = await Category.create({ category_name: name, user_id });
    res
      .status(201)
      .json({ message: 'Category added successfully', data: newCategory });
  } catch (error) {
    console.error('Error adding category:', error); // Log the error for debugging
    res
      .status(500)
      .json({ message: 'Error adding category', error: error.message });
  }
});

router.get('/category', async (req, res) => {
  try {
    const categories = await Category.findAll(); // Fetch categories from the database
    res.json(categories); // Send categories as a JSON response
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
