const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', email); // Log email for debugging

    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.validatePassword(password))) {
      console.log('Invalid credentials for:', email); // Log invalid credentials
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res
      .cookie('token', token, { httpOnly: true })
      .json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error); // Log error
    res.status(500).json({ message: error.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out successfully' });
};
