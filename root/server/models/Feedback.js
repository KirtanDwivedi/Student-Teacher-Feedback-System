const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    timetable: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Timetable',
        required: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    understood: {
        type: String,
        required: true,
    },
    notUnderstood: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
