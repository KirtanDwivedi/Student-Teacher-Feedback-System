const Feedback = require('../models/Feedback');
const { summarizeText } = require('../utils/summarizer');

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Private (Student)
const submitFeedback = async (req, res) => {
    const { timetableId, understood, notUnderstood } = req.body;

    try {
        const feedback = new Feedback({
            timetable: timetableId,
            student: req.user._id,
            understood,
            notUnderstood,
        });

        const createdFeedback = await feedback.save();
        res.status(201).json(createdFeedback);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Get feedback summary for a lecture
// @route   GET /api/feedback/summary/:timetableId
// @access  Private (Teacher)
const getFeedbackSummary = async (req, res) => {
    const { timetableId } = req.params;

    try {
        const feedbacks = await Feedback.find({ timetable: timetableId });

        if (!feedbacks || feedbacks.length === 0) {
            return res.json({
                summary: 'No feedback submitted yet.',
                understoodSummary: '',
                notUnderstoodSummary: ''
            });
        }

        const understoodTexts = feedbacks.map(f => f.understood).filter(t => t && t.trim().length > 0);
        const notUnderstoodTexts = feedbacks.map(f => f.notUnderstood).filter(t => t && t.trim().length > 0);

        const understoodSummary = summarizeText(understoodTexts);
        const notUnderstoodSummary = summarizeText(notUnderstoodTexts);

        res.json({
            summary: `Understood:\n${understoodSummary}\n\nNot Understood:\n${notUnderstoodSummary}`,
            understoodSummary,
            notUnderstoodSummary,
            originalFeedbacks: feedbacks
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { submitFeedback, getFeedbackSummary };
