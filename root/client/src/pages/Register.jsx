import BASE_URL from '../config';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>

            <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
                <div className="container max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left Section - Hero */}
                        <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-semibold backdrop-blur-sm">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 9a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm0 4a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                </svg>
                                Join Thousands of Educators
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                                Start Your
                                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                                    Journey Today
                                </span>
                            </h1>

                            <p className="text-xl text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
                                Join our innovative platform where teaching meets technology. Experience seamless feedback management and AI-driven insights.
                            </p>

                            <div className="space-y-4 max-w-md mx-auto lg:mx-0">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-1">
                                        <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">Instant Setup</p>
                                        <p className="text-sm text-gray-400">Get started in less than 2 minutes</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-1">
                                        <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">AI-Powered Insights</p>
                                        <p className="text-sm text-gray-400">Automated feedback summaries</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-1">
                                        <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">Secure & Private</p>
                                        <p className="text-sm text-gray-400">Enterprise-grade security</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Register Card */}
                        <div className="w-full max-w-md mx-auto order-1 lg:order-2">
                            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                                    <p className="text-gray-400">Join the future of education</p>
                                </div>

                                <form onSubmit={submitHandler} className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                            placeholder="John Doe"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                                        <input
                                            type="password"
                                            className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                            placeholder="Create a strong password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 ml-1">I am a</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setRole('student')}
                                                className={`py-3 px-4 rounded-xl font-medium transition-all ${role === 'student'
                                                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                                                    }`}
                                            >
                                                Student
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setRole('teacher')}
                                                className={`py-3 px-4 rounded-xl font-medium transition-all ${role === 'teacher'
                                                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                                                    }`}
                                            >
                                                Teacher
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2 pt-2">
                                        <input type="checkbox" className="w-4 h-4 mt-1 rounded bg-white/5 border-white/10 text-purple-500 focus:ring-purple-500 focus:ring-offset-0" required />
                                        <label className="text-xs text-gray-400">
                                            I agree to the Terms of Service and Privacy Policy
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Creating Account...
                                            </span>
                                        ) : 'Create Account'}
                                    </button>
                                </form>

                                <div className="mt-8 text-center">
                                    <p className="text-gray-400">
                                        Already have an account?{' '}
                                        <Link to="/login" className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">
                                            Sign in instead
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -50px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(50px, 50px) scale(1.05); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

export default Register;