const User = require('../models/User');

// GET /users (Admin)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // không trả về password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /users/:id (Admin hoặc self)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Admin hoặc user tự xóa
    if (req.user.role === 'admin' || req.user._id.toString() === user._id.toString()) {
      // Sử dụng deleteOne thay vì remove()
      await User.deleteOne({ _id: user._id });
      return res.json({ message: 'User deleted successfully' });
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
