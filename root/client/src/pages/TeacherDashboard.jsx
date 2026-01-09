import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Timetable from '../components/Timetable';
import NotificationForm from '../components/NotificationForm';
import NotificationList from '../components/NotificationList';

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const [refreshNotifications, setRefreshNotifications] = useState(0);

    const fetchNotifications = useCallback(() => {
        setRefreshNotifications(prev => prev + 1);
    }, []);

    return (
        <div className="p-8 md:p-12 lg:p-16 min-h-[90vh]">
            <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 animate-fadeUp">
                <div className="space-y-2">
                    <h1 className="text-5xl font-extrabold text-white tracking-tight">Faculty <span className="text-purple-500">Console</span></h1>
                    <p className="text-gray-400 font-medium">Optimize your teaching with automated class insights.</p>
                </div>
                <button
                    onClick={() => { localStorage.removeItem('userInfo'); navigate('/login'); }}
                    className="px-6 py-2.5 bg-white bg-opacity-[0.05] border border-white border-opacity-10 text-white rounded-xl font-bold hover:bg-opacity-[0.1] hover:border-red-500/50 hover:text-red-400 transition-all shadow-xl"
                >
                    Sign Out
                </button>
            </header>

            <main className="max-w-7xl mx-auto space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Schedule Section */}
                    <section className="lg:col-span-2 space-y-6 animate-fadeUp" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                            <h2 className="text-2xl font-bold text-white">Academic Schedule</h2>
                        </div>
                        <div className="glass-card p-2 rounded-[32px] overflow-hidden">
                            <Timetable role="teacher" />
                        </div>
                    </section>

                    {/* Broadcast Section */}
                    <section className="space-y-6 animate-fadeUp" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                            <h2 className="text-2xl font-bold text-white">Class Broadcast</h2>
                        </div>
                        <div className="glass-card p-8 rounded-[32px]">
                            <NotificationForm onNotificationSent={fetchNotifications} />
                            <NotificationList key={refreshNotifications} />
                        </div>
                    </section>
                </div>

                {/* Intelligence Section */}
                <section className="animate-fadeUp" style={{ animationDelay: '0.3s' }}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-2 h-8 bg-purple-600 rounded-full"></div>
                        <h2 className="text-2xl font-bold text-white">Class Intelligence</h2>
                    </div>
                    <div className="glass-card p-16 rounded-[40px] flex flex-col items-center justify-center border-2 border-dashed border-white border-opacity-5">
                        <span className="text-5xl mb-6 opacity-40">📊</span>
                        <p className="text-gray-500 font-medium text-lg text-center">Select a class from your schedule to view analytical summaries.</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default TeacherDashboard;
