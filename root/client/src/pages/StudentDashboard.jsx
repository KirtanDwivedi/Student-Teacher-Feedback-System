import React from 'react';
import { useNavigate } from 'react-router-dom';
import Timetable from '../components/Timetable';
import NotificationList from '../components/NotificationList';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
            {/* Animated background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
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
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                        {userInfo.name?.charAt(0) || 'S'}
                                    </div>
                                    <div>
                                        <h1 className="text-3xl md:text-4xl font-black text-white">
                                            Welcome back, <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{userInfo.name?.split(' ')[0] || 'Student'}</span>
                                        </h1>
                                        <p className="text-gray-400 text-sm">Your personalized academic dashboard</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => { localStorage.removeItem('userInfo'); navigate('/login'); }}
                                className="px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl font-semibold hover:bg-red-500/20 transition-all group"
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
                </header>

                <main className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                        {/* Timetable Section */}
                        <section className="lg:col-span-2 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-white">Weekly Schedule</h2>
                            </div>
                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
                                <Timetable role="student" />
                            </div>
                        </section>

                        {/* Notifications Section */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-white">Notifications</h2>
                            </div>
                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Latest Updates</h3>
                                        <p className="text-sm text-gray-400">Stay informed with class alerts</p>
                                    </div>
                                </div>
                                <NotificationList />
                            </div>
                        </section>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all group cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Total Classes</p>
                                    <p className="text-2xl font-bold text-white">24</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all group cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Feedback Given</p>
                                    <p className="text-2xl font-bold text-white">18</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-pink-500/50 transition-all group cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">This Week</p>
                                    <p className="text-2xl font-bold text-white">5</p>
                                </div>
                            </div>
                        </div>
                    </div>
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
            `}</style>
        </div>
    );
};

export default StudentDashboard;