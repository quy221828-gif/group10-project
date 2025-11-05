const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer'); // upload avatar
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
