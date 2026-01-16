const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware: Allows the server to read JSON sent in a request body
app.use(express.json()); 

// Connect to the Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));