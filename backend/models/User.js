const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }
}, {
  collection: 'users' // 👉 đặt tên collection rõ ràng
});

module.exports = mongoose.model('User', userSchema);
