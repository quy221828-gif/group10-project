const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const RefreshToken = require('../models/RefreshToken');

// 🔐 Hàm tạo Access Token
const generateAccessToken = (user) =>
  jwt.sign({ id: user._id }, 'access_secret', { expiresIn: '15m' });

// 🔐 Hàm tạo Refresh Token
const generateRefreshToken = async (user) => {
  const token = jwt.sign({ id: user._id }, 'refresh_secret', { expiresIn: '7d' });
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);

  await RefreshToken.create({ token, user: user._id, expires });
  return token;
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

    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken,
      refreshToken
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
      const accessToken = generateAccessToken(user);
      const refreshToken = await generateRefreshToken(user);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        accessToken,
        refreshToken
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🚪 Đăng xuất
exports.logoutUser = async (req, res) => {
  const { token } = req.body;
  if (token) await RefreshToken.deleteOne({ token });
  res.json({ message: 'Logout successful' });
};

// 🔄 Refresh Token
exports.refreshToken = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: 'Refresh token required' });

  const savedToken = await RefreshToken.findOne({ token });
  if (!savedToken) return res.status(403).json({ message: 'Invalid refresh token' });

  try {
    const decoded = jwt.verify(token, 'refresh_secret');
    const user = await User.findById(decoded.id);
    if (!user) throw new Error('User not found');

    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};

// 📧 Quên mật khẩu — tạo token reset
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    return res.status(404).json({ message: 'Email not found' });

  const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '15m' });

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

    user.password = password; // pre-save hook hash
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};
