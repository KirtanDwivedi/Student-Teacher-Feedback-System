import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BASE_URL from '../config';

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
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-16 bg-white/[0.02] rounded-2xl border-2 border-dashed border-white/10"
            >
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    className="text-6xl mb-4"
                >
                    📭
                </motion.div>
                <p className="text-gray-400 font-semibold text-lg">No classes scheduled yet.</p>
                <p className="text-gray-500 text-sm mt-2">Check back later for updates</p>
            </motion.div>
        );
    }

    return (
        <div className="overflow-hidden">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500/30 scrollbar-track-transparent">
                <table className="min-w-full bg-transparent">
                    <thead>
                        <tr className="bg-gradient-to-r from-white/[0.03] to-white/[0.01] border-b border-white/5">
                            <th className="py-5 px-6 text-left text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">Day</th>
                            <th className="py-5 px-6 text-left text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">Period</th>
                            <th className="py-5 px-6 text-left text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">Subject</th>
                            <th className="py-5 px-6 text-left text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">Room</th>
                            {role === 'student' && <th className="py-5 px-6 text-left text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">Teacher</th>}
                            <th className="py-5 px-6 text-right text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {timetable.map((entry, index) => (
                            <motion.tr 
                                key={entry._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                className="hover:bg-white/[0.04] transition-all duration-300 group relative"
                            >
                                {/* Hover accent line */}
                                <td className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></td>
                                
                                <td className="py-5 px-6 text-sm font-bold text-gray-300 group-hover:text-white transition-colors">
                                    <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {entry.day}
                                    </span>
                                </td>
                                <td className="py-5 px-6 text-sm">
                                    <span className="inline-flex px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg text-xs font-bold text-blue-400 uppercase tracking-wider group-hover:border-blue-500/40 group-hover:shadow-lg group-hover:shadow-blue-500/10 transition-all">
                                        {entry.period}
                                    </span>
                                </td>
                                <td className="py-5 px-6 text-sm font-black text-white group-hover:text-blue-300 transition-colors">{entry.subject}</td>
                                <td className="py-5 px-6 text-sm text-gray-400 font-medium">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {entry.room}
                                    </span>
                                </td>
                                {role === 'student' && (
                                    <td className="py-5 px-6 text-sm text-gray-300 font-semibold flex items-center gap-2">
                                        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        {entry.teacher?.name}
                                    </td>
                                )}
                                <td className="py-5 px-6 text-right">
                                    {role === 'student' ? (
                                        <motion.button
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => navigate(`/feedback/${entry._id}`)}
                                            className="px-5 py-2.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 text-xs font-black uppercase tracking-wider rounded-xl hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                                        >
                                            <span className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Feedback
                                            </span>
                                        </motion.button>
                                    ) : (
                                        <motion.button
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => navigate(`/feedback-summary/${entry._id}`)}
                                            className="px-5 py-2.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-300 text-xs font-black uppercase tracking-wider rounded-xl hover:from-purple-600 hover:to-pink-600 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                                        >
                                            <span className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                                Insights
                                            </span>
                                        </motion.button>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Timetable;
