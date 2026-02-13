require("dotenv").config();
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require('./config/db');
connectDB();

const authRoutes = require('./routes/authRoutes');
const {authMiddleware }= require("./middleware/authMiddleware");
const adminMiddleware = require("./middleware/adminMiddleware");

app.use(cookieParser());  // Middleware to parse cookies

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());    // Middleware to parse JSON bodies

app.use(express.urlencoded({ extended: true }));  // Middleware to parse URL-encoded bodies      

app.use(express.static('public'));     // Middleware to serve static files from the 'public' directory 

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {  // Sample route
    res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/admin/books', require('./routes/adminRoute'));

app.get("/api/admin/test", authMiddleware, adminMiddleware, (req, res) => {
  res.json({
    message: "Welcome Admin 🎉",
    user: req.user
  });
});

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed a protected route 🎉",
    user: req.user
  });
});


app.get('/api/test', (req, res) => {
    res.json({ message: 'This is a test endpoint' });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
