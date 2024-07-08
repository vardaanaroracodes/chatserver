const Message = require('../models/message');

const sendMessage = async (req, res) => {
    const { sender, receiver, message } = req.body;
    try {
      const newMessage = new Message({ sender, receiver, message });
      await newMessage.save();
      res.json(newMessage);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

const getMessages = async (req, res) => {
  try {
    const { sender, receiver } = req.params;
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort('timestamp');
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  sendMessage,
  getMessages,
};