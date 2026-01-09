import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const BASE_URL = "https://student-teacher-feedback-system.onrender.com";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                `${BASE_URL}/api/users/register`,
                { name, email, password, role },
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
            alert('Error registering user');
        }
    };

    return (
        <div className="flex items-center justify-center p-6 min-h-[90vh]">
            <div className="container max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">

                {/* Visual Section (Left side) */}
                <div className="lg:w-1/2 text-left space-y-8 animate-fadeUp">
                    <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
                        Start your journey <br />
                        <span className="text-blue-500">with excellence.</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
                        Join a community dedicated to academic growth. Our platform provides the weightless tools you need to succeed.
                    </p>
                    <div className="flex gap-4">
                        <div className="w-16 h-1.5 bg-blue-600 rounded-full"></div>
                        <div className="w-6 h-1.5 bg-gray-700 rounded-full"></div>
                    </div>
                </div>

                {/* Register Card (Right side) */}
                <div className="lg:w-1/2 w-full max-w-[540px] animate-fadeUp" style={{ animationDelay: '0.2s' }}>
                    <div className="glass-card p-12 rounded-[32px] shadow-2xl">
                        <h2 className="text-3xl font-bold text-white mb-10">Create Account</h2>

                        <form onSubmit={submitHandler} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="First name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="Last name"
                                />
                            </div>

                            <input
                                type="email"
                                className="input-field"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <input
                                type="password"
                                className="input-field"
                                placeholder="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <select
                                className="input-field appearance-none cursor-pointer"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                style={{ color: role ? 'white' : '#6b7280' }}
                            >
                                <option value="student" className="bg-slate-900">I am a Student</option>
                                <option value="teacher" className="bg-slate-900">I am a Teacher</option>
                            </select>

                            <div className="flex items-center gap-3 ml-1 pt-2">
                                <input
                                    type="checkbox"
                                    id="newsletter"
                                    className="w-4 h-4 rounded border-gray-700 bg-transparent text-blue-600 focus:ring-blue-500/20"
                                />
                                <label htmlFor="newsletter" className="text-sm text-gray-400 cursor-pointer">Subscribe to system updates</label>
                            </div>

                            <button type="submit" className="btn-primary mt-4">
                                Sign Up
                            </button>
                        </form>

                        <div className="mt-10 text-center">
                            <p className="text-gray-500">
                                Already have an account? <Link to="/login" className="text-blue-500 font-semibold hover:underline">Sign in</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
