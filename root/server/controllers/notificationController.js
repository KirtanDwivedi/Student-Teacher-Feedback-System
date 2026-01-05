const Notification = require('../models/Notification');

// @desc    Send a notification
// @route   POST /api/notifications
// @access  Private (Teacher)
const sendNotification = async (req, res) => {
    const { message } = req.body;

    try {
        const notification = new Notification({
            message,
            sender: req.user._id,
        });

        const createdNotification = await notification.save();
        res.status(201).json(createdNotification);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Get all notifications
// @route   GET /api/notifications
// @access  Private
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({})
            .populate('sender', 'name')
            .sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { sendNotification, getNotifications };
