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
        <form onSubmit={submitHandler} className="mb-8">
            <div className="flex flex-col gap-3">
                <textarea
                    className="w-full px-5 py-4 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500 bg-gray-50 bg-opacity-50 transition-all outline-none resize-none text-sm shadow-inner"
                    rows="2"
                    placeholder="Broadcast message to class..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                    Push Notification
                </button>
            </div>
        </form>
    );
};

export default NotificationForm;
