const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// 1. MIDDLEWARE FIRST (The Translator)
// This MUST be above your routes so it can parse the body before the routes handle it
app.use(express.json()); 

// 2. ROUTES SECOND
// I removed the duplicates. Just one of each is enough.
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// 3. DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connected");
    // It's safer to start the server ONLY after the DB is connected
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => {
    console.log("MongoDB Connection Error: ", err);
  });