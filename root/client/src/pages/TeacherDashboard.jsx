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
        <div className="min-h-screen bg-gray-100 p-8">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
                <button
                    onClick={logoutHandler}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Send Notification</h2>
                    <NotificationForm onNotificationSent={() => window.location.reload()} />
                    <h3 className="font-bold mb-2 text-gray-700">Recent Notifications</h3>
                    <div className="max-h-60 overflow-y-auto">
                        <NotificationList />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">My Schedule</h2>
                    <Timetable role="teacher" />
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Class Feedback</h2>
                    <p className="text-gray-600">Select a lecture via 'View Summary' in the schedule.</p>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
