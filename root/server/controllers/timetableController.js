const Timetable = require('../models/Timetable');

// @desc    Get timetable
// @route   GET /api/timetable
// @access  Private
const getTimetable = async (req, res) => {
    try {
        let timetable;
        if (req.user.role === 'teacher') {
            timetable = await Timetable.find({ teacher: req.user._id }).populate('teacher', 'name');
        } else {
            timetable = await Timetable.find({}).populate('teacher', 'name');
        }
        res.json(timetable);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add timetable entry
// @route   POST /api/timetable
// @access  Private (Teacher/Admin - keeping open to teachers for now)
const addTimetableEntry = async (req, res) => {
    const { day, period, subject, room } = req.body;

    // For simplicity, assuming the logged in use is the teacher or we pass teacherId
    // If student tries to add, we should block.
    if (req.user.role !== 'teacher') {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const timetableEntry = new Timetable({
            day,
            period,
            subject,
            teacher: req.user._id,
            room,
        });

        const createdEntry = await timetableEntry.save();
        res.status(201).json(createdEntry);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

module.exports = { getTimetable, addTimetableEntry };
