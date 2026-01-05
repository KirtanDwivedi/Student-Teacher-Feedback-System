const express = require('express');
const router = express.Router();
const { submitFeedback, getFeedbackSummary } = require('../controllers/feedbackController');
const { protect, teacher } = require('../middleware/authMiddleware');

router.post('/', protect, submitFeedback);
router.get('/summary/:timetableId', protect, teacher, getFeedbackSummary);

module.exports = router;
