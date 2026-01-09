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
        <div className="p-8 md:p-12 lg:p-16 flex flex-col items-center min-h-[90vh]">
            <button
                onClick={() => navigate(-1)}
                className="self-start mb-12 flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs animate-fadeUp"
            >
                <span className="text-lg">←</span> Back to Dashboard
            </button>

            <div className="w-full max-w-4xl animate-fadeUp">
                {loading ? (
                    <div className="glass-card p-24 rounded-[40px] flex flex-col items-center">
                        <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-8"></div>
                        <p className="text-gray-400 font-bold animate-pulse tracking-widest uppercase text-sm">Synthesizing Feedback...</p>
                    </div>
                ) : (
                    <div className="glass-card rounded-[40px] shadow-2xl overflow-hidden">
                        <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>

                        <div className="p-12 md:p-16 space-y-12">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div className="space-y-2">
                                    <h2 className="text-4xl font-extrabold text-white tracking-tight italic">AI Synthesis</h2>
                                    <p className="text-gray-400 font-medium">Automated analysis of recent classroom feedback.</p>
                                </div>
                                <div className="px-6 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-black uppercase tracking-tighter">
                                    Real-time Insight
                                </div>
                            </div>

                            <div className="bg-white bg-opacity-[0.02] border border-white border-opacity-[0.05] p-10 rounded-[32px] relative group">
                                <div className="absolute -left-1 top-10 bottom-10 w-2 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
                                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-medium italic pl-6">
                                    "{summary}"
                                </p>
                            </div>

                            <div className="flex justify-center pt-4">
                                <button
                                    onClick={() => navigate(-1)}
                                    className="px-12 py-4 bg-white bg-opacity-[0.05] text-white rounded-2xl font-bold hover:bg-opacity-[0.1] transition-all border border-white border-opacity-10"
                                >
                                    Dismiss & Return
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedbackSummaryPage;
