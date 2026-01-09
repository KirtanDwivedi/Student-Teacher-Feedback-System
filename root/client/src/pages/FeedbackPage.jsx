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
        <div className="flex items-center justify-center p-8 min-h-[90vh]">
            <div className="w-full max-w-3xl animate-fadeUp">
                <div className="glass-card p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <span className="text-9xl font-black text-white">FB</span>
                    </div>

                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-3 h-10 bg-blue-600 rounded-full"></div>
                        <h2 className="text-4xl font-extrabold text-white tracking-tight">Lecture Feedback</h2>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-8 relative z-10">
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Positive Insights</label>
                            <textarea
                                className="w-full px-6 py-5 rounded-2xl border border-white border-opacity-10 bg-white bg-opacity-[0.02] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none text-gray-200"
                                rows="3"
                                placeholder="What parts of the lecture were most helpful?"
                                value={pros}
                                onChange={(e) => setPros(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Areas for Improvement</label>
                            <textarea
                                className="w-full px-6 py-5 rounded-2xl border border-white border-opacity-10 bg-white bg-opacity-[0.02] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none text-gray-200"
                                rows="3"
                                placeholder="What could be explained more clearly?"
                                value={cons}
                                onChange={(e) => setCons(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="flex-1 py-4 bg-white bg-opacity-[0.05] border border-white border-opacity-10 text-white rounded-2xl font-bold hover:bg-opacity-[0.1] transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/10 hover:bg-blue-700 hover:-translate-y-1 active:translate-y-0 transition-all"
                            >
                                Submit Feedback
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FeedbackPage;
