<<<<<<< HEAD
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer'); // upload avatar
const path = require('path');
=======
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./models/User");
const userRoutes = require("./routes/user"); // dùng route riêng cho CRUD nếu có

dotenv.config();
mongoose.set("debug", true); // Bật log truy vấn MongoDB
>>>>>>> origin/main

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

<<<<<<< HEAD
// Log request
app.use((req, res, next) => {
  console.log('➡️ Request:', req.method, req.originalUrl, req.body);
  next();
});

// MongoDB
const MONGO_URI = 'mongodb+srv://quy221828_db_user:113147@groupdb.dismomc.mongodb.net/groupDB?retryWrites=true&w=majority';
mongoose.set('debug', true);
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/users', require('./routes/user'));
app.use('/upload', require('./routes/upload')); // route upload avatar

// Test root
app.get('/', (req, res) => res.send('✅ API is running'));

// Port
const PORT = 3000;
=======
// 🔹 Kết nối MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI || "mongodb+srv://quy221828_db_user:113147@groupdb.dismomc.mongodb.net/groupDB?retryWrites=true&w=majority")
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 🔹 Nếu có file routes riêng (ưu tiên dùng)
app.use("/users", userRoutes);

// 🔹 Nếu chưa có route riêng — fallback trực tiếp CRUD
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const newUser = new User({ name, email });
  await newUser.save();
  res.json(newUser);
});

const PORT = process.env.PORT || 3000;
>>>>>>> origin/main
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
