const mongoose = require('mongoose');
const User = require('../models/user');
require('dotenv').config();

const users = [
  { name: 'Aarav' },
  { name: 'Priya' },
  { name: 'Rohan' },
  { name: 'Ananya' },
  { name: 'Kabir' },
  { name: 'Isha' },
  { name: 'Dev' },
  { name: 'Meera' },
  { name: 'Arjun' },
  { name: 'Sneha' }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await User.deleteMany(); // Optional: clear old data
    await User.insertMany(users);
    console.log("✅ 10 Indian users inserted successfully!");
    process.exit();
  })
  .catch(err => {
    console.error("❌ Insertion failed:", err);
    process.exit(1);
  });
