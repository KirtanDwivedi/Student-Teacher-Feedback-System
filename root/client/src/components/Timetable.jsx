import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = "https://student-teacher-feedback-system.onrender.com";

const Timetable = ({ role }) => {
    const [timetable, setTimetable] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get(`${BASE_URL}/api/timetable`, config);
                setTimetable(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTimetable();
    }, []);

    if (timetable.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                <span className="text-4xl mb-3">📭</span>
                <p className="text-gray-400 font-medium">No classes scheduled yet.</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white divide-y divide-gray-100">
                    <thead>
                        <tr className="bg-gray-50 bg-opacity-50">
                            <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Day</th>
                            <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Period</th>
                            <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Subject</th>
                            <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Room</th>
                            {role === 'student' && <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Teacher</th>}
                            <th className="py-4 px-6 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {timetable.map((entry) => (
                            <tr key={entry._id} className="hover:bg-blue-50 transition-colors group">
                                <td className="py-4 px-6 text-sm font-semibold text-gray-700">{entry.day}</td>
                                <td className="py-4 px-6 text-sm text-gray-600">
                                    <span className="px-2 py-1 bg-gray-100 rounded-md text-[10px] font-bold text-gray-500 uppercase">{entry.period}</span>
                                </td>
                                <td className="py-4 px-6 text-sm font-bold text-gray-900">{entry.subject}</td>
                                <td className="py-4 px-6 text-sm text-gray-500">{entry.room}</td>
                                {role === 'student' && (
                                    <td className="py-4 px-6 text-sm text-gray-600 font-medium">
                                        {entry.teacher?.name}
                                    </td>
                                )}
                                <td className="py-4 px-6 text-right">
                                    {role === 'student' ? (
                                        <button
                                            onClick={() => navigate(`/feedback/${entry._id}`)}
                                            className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all"
                                        >
                                            Feedback
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => navigate(`/feedback-summary/${entry._id}`)}
                                            className="px-4 py-1.5 bg-purple-600 text-white text-xs font-bold rounded-lg shadow-md hover:bg-purple-700 hover:scale-105 active:scale-95 transition-all"
                                        >
                                            Insights
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Timetable;
