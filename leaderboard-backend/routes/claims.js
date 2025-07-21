const express = require('express');
const router = express.Router();
const Claim = require('../models/Claim');
const User = require('../models/user');

// Claim points
router.post('/', async (req, res) => {
  const { userId } = req.body;
  const points = Math.floor(Math.random() * 100) + 1;
  const claim = new Claim({ userId, points });
  await claim.save();

  // Update user's points
  const user = await User.findById(userId);
  user.points += points;
  await user.save();

  res.status(201).json({ claim, user });
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  const users = await User.find().sort({ points: -1 });
  res.json(users);
});

module.exports = router;
