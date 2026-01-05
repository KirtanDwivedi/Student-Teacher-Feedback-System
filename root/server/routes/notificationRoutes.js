const express = require('express');
const router = express.Router();
const { sendNotification, getNotifications } = require('../controllers/notificationController');
const { protect, teacher } = require('../middleware/authMiddleware');

router.route('/').post(protect, teacher, sendNotification).get(protect, getNotifications);

module.exports = router;
