import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_URL = "https://student-teacher-feedback-system.onrender.com";

const FeedbackSummaryPage = () => {
    const { timetableId } = useParams();
    const navigate = useNavigate();
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get(
                    `${BASE_URL}/api/feedback/summary/${timetableId}`,
                    config
                );
                setSummary(data.summary);
            } catch (error) {
                console.error(error);
                setSummary('Error fetching summary or no feedback available.');
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [timetableId]);

    return (
        <div className="p-4 md:p-8 flex flex-col items-center">
            <button
                onClick={() => navigate(-1)}
                className="self-start mb-8 flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium animate-fadeUp"
            >
                ← Back to Console
            </button>

            <div className="w-full max-w-4xl animate-fadeUp" style={{ animationDelay: '0.1s' }}>
                <div className="glass-card p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                    <header className="mb-10 text-center">
                        <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                            AI-Powered Insight
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Lecture Synthesis</h1>
                        <p className="text-gray-500 mt-2">Aggregated student feedback & re-teaching points</p>
                    </header>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                            <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
                            <p className="text-gray-400 font-medium">Analyzing responses...</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="relative">
                                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-blue-100 rounded-full"></div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    Key Takeaways
                                </h3>
                                <div className="bg-white bg-opacity-60 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 shadow-sm leading-relaxed text-gray-700">
                                    <pre className="whitespace-pre-wrap font-sans text-lg">{summary}</pre>
                                </div>
                            </div>

                            <div className="flex justify-center pt-8 border-t border-gray-100">
                                <p className="text-sm text-gray-400">
                                    Generated automatically based on class submissions.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackSummaryPage;
