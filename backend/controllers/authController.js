const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// 🔐 Hàm tạo token
const generateToken = (id) => {
  return jwt.sign({ id }, 'secret', { expiresIn: '1d' });
};

// 📝 Đăng ký tài khoản
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: 'Name, email and password are required' });

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'Email already exists' });

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔑 Đăng nhập
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🚪 Đăng xuất (frontend tự xóa token)
exports.logoutUser = (req, res) => {
  res.json({ message: 'Logout successful' });
};

// 📧 Quên mật khẩu — tạo token reset
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    return res.status(404).json({ message: 'Email not found' });

  // Tạo token 15 phút
  const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '15m' });

  // 🔔 Trong thực tế: gửi email reset link cho user
  res.json({
    message: 'Token generated (use for reset)',
    token
  });
};

// 🔄 Reset mật khẩu
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, 'secret');
    const user = await User.findById(decoded.id);

    if (!user)
      return res.status(404).json({ message: 'User not found' });

    user.password = password; // sẽ được hash trong pre-save hook
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};