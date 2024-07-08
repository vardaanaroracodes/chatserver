const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', (req, res, next) => {
    console.log('Register route hit');
    next();
  }, registerUser);//testing 
  router.post('/login', (req, res, next) => {
    console.log('login route hit');
    next();
  }, loginUser);
router.get('/users', authMiddleware, getUsers);

module.exports = router;

//login , loginUser