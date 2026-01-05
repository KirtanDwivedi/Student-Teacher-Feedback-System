import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FeedbackPage = () => {
    const { timetableId } = useParams();
    const navigate = useNavigate();
    const [understood, setUnderstood] = useState('');
    const [notUnderstood, setNotUnderstood] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.post(
                'http://localhost:5000/api/feedback',
                { timetableId, understood, notUnderstood },
                config
            );

            alert('Feedback submitted successfully!');
            navigate('/student-dashboard');
        } catch (error) {
            console.error(error);
            alert('Error submitting feedback');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Submit Feedback</h1>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">What did you understand?</label>
                        <textarea
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                            value={understood}
                            onChange={(e) => setUnderstood(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">What did you NOT understand?</label>
                        <textarea
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                            value={notUnderstood}
                            onChange={(e) => setNotUnderstood(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Submit Feedback
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FeedbackPage;
