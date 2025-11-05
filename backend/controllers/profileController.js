const User = require('../models/User');

// 👤 Lấy thông tin cá nhân
exports.getProfile = async (req, res) => {
  if (!req.user)
    return res.status(401).json({ message: 'Not authorized' });

  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.avatar,
    role: req.user.role
  });
};

// ✏️ Cập nhật thông tin cá nhân
exports.updateProfile = async (req, res) => {
  const { name, password, avatar } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;
    if (avatar) user.avatar = avatar;
    if (password) user.password = password; // pre-save sẽ hash

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};