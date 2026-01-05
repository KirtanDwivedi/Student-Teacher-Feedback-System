const express = require('express');
const router = express.Router();
const { getTimetable, addTimetableEntry } = require('../controllers/timetableController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getTimetable).post(protect, addTimetableEntry);

module.exports = router;
