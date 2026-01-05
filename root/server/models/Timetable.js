const mongoose = require('mongoose');

const timetableSchema = mongoose.Schema({
    day: {
        type: String,
        required: true,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    },
    period: {
        type: Number,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    room: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
