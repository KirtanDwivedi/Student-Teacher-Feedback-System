import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const BASE_URL = "https://student-teacher-feedback-system.onrender.com";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        if (e) e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                `${BASE_URL}/api/users/login`,
                { email, password },
                config
            );

            localStorage.setItem('userInfo', JSON.stringify(data));
            if (data.role === 'teacher') {
                navigate('/teacher-dashboard');
            } else {
                navigate('/student-dashboard');
            }
        } catch (error) {
            console.error(error);
            alert('Invalid credentials');
        }
    };

    return (
        <div className="flex items-center justify-center p-4">
            <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">

                {/* Brand Section */}
                <div className="md:w-1/2 text-center md:text-left space-y-6 animate-fadeUp">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                        Student–Teacher <br />
                        <span className="text-blue-600">Feedback System</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-md">
                        Empowering classrooms through meaningful feedback and automated insights. A calm, weightless experience for modern education.
                    </p>
                    <div className="flex gap-4 justify-center md:justify-start">
                        <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
                        <div className="w-4 h-1 bg-blue-200 rounded-full"></div>
                    </div>
                </div>

                {/* Login Card */}
                <div className="md:w-1/2 w-full max-w-md animate-fadeUp" style={{ animationDelay: '0.2s' }}>
                    <div className="glass-card p-10 rounded-3xl transform hover:scale-[1.01] transition-all duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Welcome Back</h2>

                        <form onSubmit={submitHandler} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full px-5 py-3 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-50 backdrop-blur-sm transition-all outline-none"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
                                <input
                                    type="password"
                                    className="w-full px-5 py-3 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-50 backdrop-blur-sm transition-all outline-none"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                            >
                                Sign In
                            </button>
                        </form>

                        <div className="mt-8 text-center space-y-6">
                            <p className="text-gray-500">
                                New here? <Link to="/register" className="text-blue-600 font-semibold hover:underline">Create an account</Link>
                            </p>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or continue with</span></div>
                            </div>

                            <div className="flex justify-center gap-4">
                                {['google', 'github', 'facebook'].map((platform) => (
                                    <button key={platform} className="p-3 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md hover:scale-110 transition-all duration-300 border border-gray-200 uppercase text-[10px] font-bold tracking-wider">
                                        {platform}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
