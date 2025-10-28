const mongoose = require("mongoose");

// Định nghĩa cấu trúc dữ liệu (schema)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // bắt buộc phải có
  },
  email: {
    type: String,
    required: true,
    unique: true, // không được trùng
  },
});

// Tạo model từ schema
const User = mongoose.model("User", userSchema);

module.exports = User;
