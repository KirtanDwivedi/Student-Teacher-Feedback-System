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
        <div className="p-8 md:p-12 lg:p-16 min-h-[90vh]">
            <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 animate-fadeUp">
                <div className="space-y-2">
                    <h1 className="text-5xl font-extrabold text-white tracking-tight">Student <span className="text-blue-500">Dashboard</span></h1>
                    <p className="text-gray-400 font-medium">Welcome back. Here is your academic overview.</p>
                </div>
                <button
                    onClick={() => { localStorage.removeItem('userInfo'); navigate('/login'); }}
                    className="px-6 py-2.5 bg-white bg-opacity-[0.05] border border-white border-opacity-10 text-white rounded-xl font-bold hover:bg-opacity-[0.1] hover:border-red-500/50 hover:text-red-400 transition-all shadow-xl"
                >
                    Sign Out
                </button>
            </header>

            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Timetable Section */}
                <section className="lg:col-span-2 space-y-6 animate-fadeUp" style={{ animationDelay: '0.1s' }}>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                        <h2 className="text-2xl font-bold text-white">Your Weekly Schedule</h2>
                    </div>
                    <div className="glass-card p-2 rounded-[32px] overflow-hidden">
                        <Timetable role="student" />
                    </div>
                </section>

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
