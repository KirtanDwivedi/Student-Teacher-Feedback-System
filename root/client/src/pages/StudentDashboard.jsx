import React from 'react';
import { useNavigate } from 'react-router-dom';
import Timetable from '../components/Timetable';
import NotificationList from '../components/NotificationList';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <div className="p-4 md:p-8">
            <header className="max-w-7xl mx-auto flex justify-between items-center mb-12 animate-fadeUp">
                <div className="space-y-1">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
                    <p className="text-gray-500 font-medium">Welcome back, Student</p>
                </div>
                <button
                    onClick={logoutHandler}
                    className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all duration-300 shadow-sm"
                >
                    Logout
                </button>
            </header>

            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Timetable Section */}
                <div className="lg:col-span-2 space-y-6 animate-fadeUp" style={{ animationDelay: '0.1s' }}>
                    <div className="glass-card p-8 rounded-3xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 opacity-20 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                            <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">📅</span>
                            Weekly Schedule
                        </h2>
                        <div className="relative z-10">
                            <Timetable role="student" />
                        </div>
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="animate-fadeUp" style={{ animationDelay: '0.2s' }}>
                    <div className="glass-card p-8 rounded-3xl h-full border-l-4 border-l-blue-500">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                            <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-sm">🔔</span>
                            Alerts
                        </h2>
                        <NotificationList />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;
