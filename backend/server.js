const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const multer = require("multer"); // upload avatar
const User = require("./models/User");
const userRoutes = require("./routes/user");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Log request (debug)
app.use((req, res, next) => {
  console.log('➡️ Request:', req.method, req.originalUrl, req.body);
  next();
});

// MongoDB connection
mongoose.set("debug", true);
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://quy221828_db_user:113147@groupdb.dismomc.mongodb.net/groupDB?retryWrites=true&w=majority")
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/users', userRoutes);           // user CRUD routes
app.use('/upload', require('./routes/upload')); // upload avatar route

// Fallback CRUD test (nếu userRoutes chưa đầy đủ)
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

// Test root
app.get('/', (req, res) => res.send('✅ API is running'));

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
