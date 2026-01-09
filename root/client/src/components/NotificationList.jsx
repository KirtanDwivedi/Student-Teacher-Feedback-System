import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../config';

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
        <div className="space-y-10">
            {notifications.map((notification) => (
                <div key={notification._id} className="relative group transition-all">
                    <div className="flex flex-col gap-4">
                        <p className="text-gray-300 leading-relaxed font-bold text-lg">
                            {notification.message}
                        </p>
                        <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
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
