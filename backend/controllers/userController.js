const User = require('../models/User');

// 📍 Lấy danh sách user
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📍 Thêm user mới
const createUser = async (req, res) => {
  console.log('req.body:', req.body); // debug
  const { name, email } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }
  try {
    const user = new User({ name, email });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 📍 Cập nhật user
const updateUser = async (req, res) => {
  console.log('req.body:', req.body); // debug
  const { name, email } = req.body || {};
  if (!name && !email) {
    return res.status(400).json({ message: "Nothing to update" });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 📍 Xóa user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
