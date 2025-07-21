const User = require('../models/user');

exports.getUsers = async (req, res) => {
  const users = await User.find().sort({ score: -1 });
  res.json(users);
};

exports.claimPoints = async (req, res) => {
  const { id } = req.params;
  const points = Math.floor(Math.random() * 50) + 1;

  const user = await User.findById(id);
  user.score += points;
  user.history.push({ points });
  await user.save();

  res.json({ success: true, user });
};
