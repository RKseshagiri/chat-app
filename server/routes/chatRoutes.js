const express = require('express');
const { getMessages, postMessage } = require('../controllers/chatController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/messages', verifyToken, getMessages);
router.post('/messages', verifyToken, postMessage);

module.exports = router;
