const mongoose = require("mongoose");

// Định nghĩa cấu trúc dữ liệu (schema)
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // không trùng email
  },
  {
    collection: "users", // 👉 đặt tên collection rõ ràng
  }
);

// Tạo model từ schema
const User = mongoose.model("User", userSchema);

module.exports = User;
