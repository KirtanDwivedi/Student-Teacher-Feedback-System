import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import BASE_URL from '../config';

const NotificationForm = ({ onNotificationSent }) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
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
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
            if (onNotificationSent) {
                onNotificationSent();
            }
        } catch (error) {
            console.error(error);
            alert('Error sending notification');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={submitHandler} className="space-y-4">
            <div className="relative">
                <textarea
                    className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/[0.03] focus:bg-white/[0.05] focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none resize-none text-sm text-gray-200 placeholder-gray-500 hover:border-white/20"
                    rows="3"
                    placeholder="Type your message to broadcast to all students..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                    {message.length}/500
                </div>
            </div>
            
            <motion.button
                type="submit"
                disabled={loading || !message.trim()}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300"
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                    </span>
                ) : success ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Sent Successfully!
                    </span>
                ) : (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                        </svg>
                        Broadcast Notification
                    </span>
                )}
            </motion.button>
        </form>
    );
};

export default NotificationForm;
