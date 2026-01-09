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
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-lg animate-fadeUp relative z-10">
                <div className="glass-card p-10 rounded-3xl shadow-2xl">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Create Account</h1>
                        <p className="text-gray-500">Join our modern classroom community</p>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full px-5 py-3 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-50 backdrop-blur-sm transition-all outline-none"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-5 py-3 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-50 backdrop-blur-sm transition-all outline-none"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
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

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 ml-1">Identity</label>
                            <select
                                className="w-full px-5 py-3 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-50 backdrop-blur-sm transition-all outline-none appearance-none"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                        >
                            Get Started
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500">
                            Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
