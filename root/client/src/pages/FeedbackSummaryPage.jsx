import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FeedbackSummaryPage = () => {
    const { timetableId } = useParams();
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
                    `http://localhost:5000/api/feedback/summary/${timetableId}`,
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
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Feedback Summary</h1>
                {loading ? (
                    <p>Loading summary...</p>
                ) : (
                    <div className="prose lg:prose-xl">
                        <h3 className="text-xl font-semibold mb-3">Re-teaching Points (AI Generated):</h3>
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                            <pre className="whitespace-pre-wrap font-sans text-gray-700">{summary}</pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedbackSummaryPage;
