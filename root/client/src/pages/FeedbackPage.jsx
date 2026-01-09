import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_URL = "https://student-teacher-feedback-system.onrender.com";

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
                `${BASE_URL}/api/feedback`,
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
        <div className="flex items-center justify-center p-6">
            <div className="w-full max-w-2xl animate-fadeUp">
                <div className="glass-card p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" /></svg>
                    </div>

                    <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b border-gray-100 pb-4">Lecture Feedback</h1>

                    <form onSubmit={submitHandler} className="space-y-8">
                        <div className="space-y-3">
                            <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                                What did you understand clearly?
                            </label>
                            <textarea
                                className="w-full px-5 py-4 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-50 backdrop-blur-sm transition-all outline-none resize-none shadow-inner"
                                rows="4"
                                placeholder="..."
                                value={understood}
                                onChange={(e) => setUnderstood(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                                What remains unclear?
                            </label>
                            <textarea
                                className="w-full px-5 py-4 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-50 backdrop-blur-sm transition-all outline-none resize-none shadow-inner"
                                rows="4"
                                placeholder="..."
                                value={notUnderstood}
                                onChange={(e) => setNotUnderstood(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-8 py-4 bg-gray-50 text-gray-600 rounded-2xl font-semibold hover:bg-gray-100 transition-all border border-gray-100"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                            >
                                Submit Observations
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FeedbackPage;
