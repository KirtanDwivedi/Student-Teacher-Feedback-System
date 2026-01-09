import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
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
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center"
            >
                <motion.div
                    animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    className="text-5xl mb-4"
                >
                    🔔
                </motion.div>
                <p className="text-gray-400 text-sm font-semibold">All caught up!</p>
                <p className="text-gray-500 text-xs mt-1">No new notifications</p>
            </motion.div>
        );
    }

    return (
        <div className="space-y-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent pr-2">
            <AnimatePresence>
                {notifications.map((notification, index) => (
                    <motion.div 
                        key={notification._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="relative group"
                    >
                        <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm rounded-xl p-5 border border-white/5 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                            {/* Accent line */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="flex gap-4">
                                {/* Icon */}
                                <motion.div 
                                    whileHover={{ scale: 1.1, rotate: 10 }}
                                    className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/20"
                                >
                                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </motion.div>
                                
                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-gray-200 leading-relaxed font-medium text-sm mb-3">
                                        {notification.message}
                                    </p>
                                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                                        <span className="flex items-center gap-2 text-purple-400/80">
                                            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></span>
                                            {notification.sender?.name}
                                        </span>
                                        <span className="text-gray-500">
                                            {new Date(notification.createdAt).toLocaleDateString('en-US', { 
                                                month: 'short', 
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default NotificationList;
