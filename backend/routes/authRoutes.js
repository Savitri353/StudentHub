const express = require('express');
const router = express.Router();

const { signup, login, profile, logout, verifyEmail } = require('../controllers/authController');
const {authMiddleware} = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.get("/verify/:token", verifyEmail);
router.post('/login', login);
router.get('/profile', authMiddleware, profile);
router.post('/logout', logout);
module.exports = router;