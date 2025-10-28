const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./models/User");
const userRoutes = require("./routes/user"); // dùng route riêng cho CRUD nếu có

dotenv.config();
mongoose.set("debug", true); // Bật log truy vấn MongoDB

const app = express();
app.use(cors());
app.use(express.json());

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
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
