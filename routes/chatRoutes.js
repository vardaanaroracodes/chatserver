const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/messages', authMiddleware, sendMessage);
router.get('/messages/:sender/:receiver', getMessages);

module.exports = router;