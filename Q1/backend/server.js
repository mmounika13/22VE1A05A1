const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const urlRoutes = require('./routes/urlRoutes');
const { redirectToOriginalUrl } = require('./controllers/urlController');

// Load environment variables
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// 🔁 Handle short redirect at root (important!)
app.get('/:shortCode', redirectToOriginalUrl);

// 📦 Routes to create + stats
app.use('/shorturls', urlRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(3000, () => {
    console.log('🚀 Server is running on http://localhost:3000');
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
