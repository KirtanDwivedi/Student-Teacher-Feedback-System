import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = "https://student-teacher-feedback-system.onrender.com";

const NotificationForm = ({ onNotificationSent }) => {
    const [message, setMessage] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.post(
                `${BASE_URL}/api/notifications`,
                { message },
                config
            );

            setMessage('');
            alert('Notification sent!');
            if (onNotificationSent) {
                onNotificationSent();
            }
        } catch (error) {
            console.error(error);
            alert('Error sending notification');
        }
    };

    return (
        <form onSubmit={submitHandler} className="mb-12">
            <div className="flex flex-col gap-4">
                <textarea
                    className="w-full px-6 py-5 rounded-2xl border border-white border-opacity-[0.05] bg-white bg-opacity-[0.02] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none text-sm text-gray-200 shadow-inner"
                    rows="2"
                    placeholder="Broadcast message to class..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full py-4 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-2xl hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                    Push Broadcast
                </button>
            </div>
        </form>
    );
};

export default NotificationForm;
