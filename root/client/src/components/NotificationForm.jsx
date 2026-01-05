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
        <form onSubmit={submitHandler} className="mb-6">
            <div className="flex gap-2">
                <input
                    type="text"
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type notification message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Send
                </button>
            </div>
        </form>
    );
};

export default NotificationForm;
