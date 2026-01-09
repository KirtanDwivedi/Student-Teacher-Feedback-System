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
        <div className="flex items-center justify-center p-6 min-h-[90vh]">
            <div className="container max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">

                {/* Brand Section (Left side - following reference) */}
                <div className="lg:w-1/2 text-left space-y-8 animate-fadeUp">
                    <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
                        The smart system <br />
                        <span className="text-blue-500">for your classroom</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
                        Gather meaningful insights, automate feedback summaries, and bridge the gap between teaching and learning through a weightless, premium interface.
                    </p>
                    <div className="flex gap-4">
                        <div className="w-16 h-1.5 bg-blue-600 rounded-full"></div>
                        <div className="w-6 h-1.5 bg-gray-700 rounded-full"></div>
                    </div>
                </div>

                {/* Login Card (Right side - following reference) */}
                <div className="lg:w-1/2 w-full max-w-[480px] animate-fadeUp" style={{ animationDelay: '0.2s' }}>
                    <div className="glass-card p-12 rounded-[32px] transform transition-all duration-500">
                        <h2 className="text-3xl font-bold text-white mb-10 text-center lg:text-left">Sign In</h2>

                        <form onSubmit={submitHandler} className="space-y-6">
                            <div className="space-y-2">
                                <label className="hidden">Email Address</label>
                                <input
                                    type="email"
                                    className="input-field"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="hidden">Password</label>
                                <input
                                    type="password"
                                    className="input-field"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex items-center gap-3 ml-1">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="w-4 h-4 rounded border-gray-700 bg-transparent text-blue-600 focus:ring-blue-500/20"
                                />
                                <label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer">Remember my session</label>
                            </div>

                            <button type="submit" className="btn-primary">
                                Sign In
                            </button>
                        </form>

                        <div className="mt-10 text-center space-y-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white border-opacity-5"></div></div>
                                <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-4 text-gray-500 tracking-widest font-semibold">Or sign in with</span></div>
                            </div>

                            <div className="flex justify-center gap-8">
                                {['google', 'github', 'twitter', 'facebook'].map((platform) => (
                                    <button key={platform} className="text-gray-500 hover:text-white transition-all duration-300 transform hover:scale-125">
                                        <span className="uppercase text-[10px] font-black tracking-tighter">{platform[0]}</span>
                                    </button>
                                ))}
                            </div>

                            <p className="text-gray-500 text-sm">
                                Not a member? <Link to="/register" className="text-blue-500 font-semibold hover:underline">Register now</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
