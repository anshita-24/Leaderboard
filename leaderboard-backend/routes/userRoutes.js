const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
});

router.post('/', async (req, res) => {
  const user = new User({ name: req.body.name });
  await user.save();
  res.json(user);
});

module.exports = router;
