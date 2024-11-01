const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization;

  if (!token) return res.status(401).send('Unauthorized');

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).send('Forbidden');

    const user = await User.findByPk(decoded.userId);
    if (!user) return res.status(404).send('User not found');

    req.user = user;
    next();
  });
};
