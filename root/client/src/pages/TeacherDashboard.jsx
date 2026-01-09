import React from 'react';
import { useNavigate } from 'react-router-dom';
import Timetable from '../components/Timetable';
import NotificationForm from '../components/NotificationForm';
import NotificationList from '../components/NotificationList';

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <div className="p-4 md:p-8">
            <header className="max-w-7xl mx-auto flex justify-between items-center mb-12 animate-fadeUp">
                <div className="space-y-1">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Faculty Console</h1>
                    <p className="text-gray-500 font-medium">Class Management & Analytics</p>
                </div>
                <button
                    onClick={logoutHandler}
                    className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all duration-300 shadow-sm"
                >
                    Logout
                </button>
            </header>

            <div className="max-w-7xl mx-auto space-y-8">
                {/* Top Section: Schedule and Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Schedule */}
                    <div className="lg:col-span-2 animate-fadeUp" style={{ animationDelay: '0.1s' }}>
                        <div className="glass-card p-8 rounded-3xl h-full">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                                <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">📅</span>
                                Teaching Schedule
                            </h2>
                            <Timetable role="teacher" />
                        </div>
                    </div>

                    {/* Quick Notifications */}
                    <div className="animate-fadeUp" style={{ animationDelay: '0.2s' }}>
                        <div className="glass-card p-8 rounded-3xl h-full border-t-4 border-t-blue-500">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-sm">📢</span>
                                Broadcast
                            </h2>
                            <NotificationForm onNotificationSent={() => window.location.reload()} />

                            <div className="mt-8 border-t border-gray-100 pt-6">
                                <h3 className="font-bold mb-4 text-gray-700 flex items-center justify-between">
                                    Recent History
                                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full uppercase tracking-tighter">Live</span>
                                </h3>
                                <div className="max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                                    <NotificationList />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Feedback Insights */}
                <div className="animate-fadeUp" style={{ animationDelay: '0.3s' }}>
                    <div className="glass-card p-8 rounded-3xl bg-opacity-40">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-3">
                            <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 text-sm">🧠</span>
                            Class Intelligence
                        </h2>
                        <div className="bg-white bg-opacity-50 p-6 rounded-2xl border border-dashed border-gray-200 text-center">
                            <p className="text-gray-500 font-medium italic">
                                Select a specific lecture from your schedule above to view AI-summarized student feedback.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
