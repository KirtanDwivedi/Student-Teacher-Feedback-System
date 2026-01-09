import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Timetable from '../components/Timetable';
import NotificationForm from '../components/NotificationForm';
import NotificationList from '../components/NotificationList';

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const [refreshNotifications, setRefreshNotifications] = useState(0);
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

    const fetchNotifications = useCallback(() => {
        setRefreshNotifications(prev => prev + 1);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
            {/* Animated background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
            </div>

            {/* Grid overlay */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

            <div className="relative z-10 p-6 md:p-8 lg:p-12">
                {/* Header */}
                <header className="max-w-7xl mx-auto mb-8 md:mb-12">
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                        {userInfo.name?.charAt(0) || 'T'}
                                    </div>
                                    <div>
                                        <h1 className="text-3xl md:text-4xl font-black text-white">
                                            Faculty <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Console</span>
                                        </h1>
                                        <p className="text-gray-400 text-sm">Empower your teaching with intelligent insights</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="px-5 py-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl font-semibold hover:bg-indigo-500/20 transition-all">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                        </svg>
                                        Settings
                                    </span>
                                </button>
                                <button
                                    onClick={() => { localStorage.removeItem('userInfo'); navigate('/login'); }}
                                    className="px-5 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl font-semibold hover:bg-red-500/20 transition-all group"
                                >
                                    <span className="flex items-center gap-2">
                                        <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Sign Out
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                        {/* Schedule Section */}
                        <section className="lg:col-span-2 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-white">Academic Schedule</h2>
                                </div>
                                <span className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs font-semibold">
                                    Active
                                </span>
                            </div>
                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
                                <Timetable role="teacher" />
                            </div>
                        </section>

                        {/* Broadcast Section */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-white">Broadcast</h2>
                            </div>
                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Send Alert</h3>
                                        <p className="text-sm text-gray-400">Notify your students</p>
                                    </div>
                                </div>
                                <NotificationForm onNotificationSent={fetchNotifications} />
                                <div className="border-t border-white/10 pt-6">
                                    <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Recent Alerts</h4>
                                    <NotificationList key={refreshNotifications} />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Analytics Section */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-orange-500 rounded-full"></div>
                            <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 transition-all group cursor-pointer">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm mb-1">Total Students</p>
                                <p className="text-3xl font-bold text-white">156</p>
                                <div className="flex items-center gap-1 mt-2">
                                    <span className="text-green-400 text-xs">↑ 12%</span>
                                    <span className="text-gray-500 text-xs">vs last month</span>
                                </div>
                            </div>

                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all group cursor-pointer">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm mb-1">Feedback Received</p>
                                <p className="text-3xl font-bold text-white">342</p>
                                <div className="flex items-center gap-1 mt-2">
                                    <span className="text-green-400 text-xs">↑ 8%</span>
                                    <span className="text-gray-500 text-xs">this week</span>
                                </div>
                            </div>

                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-pink-500/50 transition-all group cursor-pointer">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm mb-1">Avg. Rating</p>
                                <p className="text-3xl font-bold text-white">4.8</p>
                                <div className="flex items-center gap-1 mt-2">
                                    <span className="text-yellow-400 text-xs">★★★★★</span>
                                </div>
                            </div>

                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-orange-500/50 transition-all group cursor-pointer">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm mb-1">Engagement</p>
                                <p className="text-3xl font-bold text-white">92%</p>
                                <div className="flex items-center gap-1 mt-2">
                                    <span className="text-green-400 text-xs">↑ 5%</span>
                                    <span className="text-gray-500 text-xs">improvement</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Intelligence Section */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                            <h2 className="text-2xl font-bold text-white">AI Intelligence</h2>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-12 border border-white/10 shadow-2xl border-dashed">
                            <div className="flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Select a Class</h3>
                                    <p className="text-gray-400 max-w-md">Choose a class from your schedule to view AI-generated insights and feedback summaries</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -50px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(50px, 50px) scale(1.05); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

export default TeacherDashboard;