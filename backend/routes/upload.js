const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

// Cấu hình nơi lưu file
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)) // tên file: timestamp + đuôi gốc
});

const upload = multer({ storage });

// Đổi IP theo máy bạn (quan trọng!)
const SERVER_IP = "192.168.38.34"; // địa chỉ IP của máy chạy backend
const SERVER_PORT = 3000;

// 📸 API Upload Avatar
router.post('/upload-avatar', protect, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // Tạo URL ảnh đầy đủ
    const avatarUrl = `http://${SERVER_IP}:${SERVER_PORT}/uploads/${req.file.filename}`;

    // Lưu avatar vào DB
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.avatar = avatarUrl;
    await user.save();

    console.log("✅ Avatar uploaded:", avatarUrl);
    res.json({ message: 'Avatar uploaded successfully', avatar: avatarUrl });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

module.exports = router;