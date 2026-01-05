import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = "https://student-teacher-feedback-system.onrender.com";

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get(`${BASE_URL}/api/notifications`, config);
                setNotifications(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNotifications();
    }, []);

    if (notifications.length === 0) {
        return <p className="text-gray-500">No notifications.</p>;
    }

    return (
        <div className="space-y-4">
            {notifications.map((notification) => (
                <div key={notification._id} className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="text-gray-800">{notification.message}</p>
                    <div className="text-xs text-gray-500 mt-2 flex justify-between">
                        <span>From: {notification.sender?.name}</span>
                        <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NotificationList;
