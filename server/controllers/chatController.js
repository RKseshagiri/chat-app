const Message = require('../models/Message');
const Joi = require('joi');
const xss = require('xss');

const messageSchema = Joi.object({
  user: Joi.string().required(),
  content: Joi.string().required(),
});

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const postMessage = async (req, res) => {
  const { user, content } = req.body;
  const { error } = messageSchema.validate({ user, content });

  if (error) {
    return res.status(400).json({ message: 'Invalid input', details: error.details });
  }

  // Sanitize user input to prevent XSS
  const sanitizedUser = xss(user);
  const sanitizedContent = xss(content);

  try {
    const newMessage = new Message({ user: sanitizedUser, content: sanitizedContent });
    await newMessage.save();
    
    res.status(201).json(newMessage);

    const io = req.app.get('socketio');
    if (io) {
      io.emit('newMessage', newMessage);
      console.log('New message emitted via Socket.io');
    } else {
      console.warn('Socket.io not initialized');
    }
  } catch (err) {
    console.error('Error posting message:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getMessages, postMessage };
