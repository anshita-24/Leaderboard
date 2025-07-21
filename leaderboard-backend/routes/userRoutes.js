const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET all users, sorted by totalPoints
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    const user = new User({ name: req.body.name });
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH: Add points to a user
router.patch('/:id/points', async (req, res) => {
  const { points } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.totalPoints += points;
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
