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
        return (
            <div className="py-6 text-center">
                <p className="text-gray-400 text-sm">Quiet for now.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {notifications.map((notification) => (
                <div key={notification._id} className="relative group transition-all">
                    <div className="flex flex-col gap-2">
                        <p className="text-gray-800 leading-relaxed font-medium">
                            {notification.message}
                        </p>
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                {notification.sender?.name}
                            </span>
                            <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NotificationList;
