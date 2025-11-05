const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 👉 Bật debug để xem log truy vấn MongoDB
mongoose.set('debug', true);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 👉 Kết nối MongoDB Atlas
mongoose.connect('mongodb+srv://quy221828_db_user:113147@groupdb.dismomc.mongodb.net/groupDB?retryWrites=true&w=majority')
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// 👉 Import routes
const userRoutes = require('./routes/user');
app.use('/users', userRoutes);

// 👉 Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
