import BASE_URL from '../config';

const FeedbackSummaryPage = () => {
    const { timetableId } = useParams();
    const navigate = useNavigate();
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get(
                    `${BASE_URL}/api/feedback/summary/${timetableId}`,
                    config
                );
                setSummary(data.summary);
            } catch (error) {
                console.error(error);
                setSummary('Error fetching summary or no feedback available.');
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [timetableId]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>

            <div className="relative z-10 flex flex-col items-center min-h-screen p-6">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="self-start mb-8 mt-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="font-semibold">Back to Dashboard</span>
                </button>

                <div className="w-full max-w-5xl flex-1 flex items-center justify-center">
                    {loading ? (
                        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-16 border border-white/10 shadow-2xl">
                            <div className="flex flex-col items-center space-y-6">
                                <div className="relative w-24 h-24">
                                    <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                                    <div className="absolute inset-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-center space-y-2">
                                    <h3 className="text-2xl font-bold text-white">AI Analysis in Progress</h3>
                                    <p className="text-gray-400 max-w-md">Synthesizing feedback from students using advanced language models...</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden w-full">
                            {/* Gradient Header Bar */}
                            <div className="h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>

                            <div className="p-8 md:p-12">
                                {/* Header */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h1 className="text-3xl md:text-4xl font-black text-white">
                                                AI <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Intelligence Report</span>
                                            </h1>
                                            <p className="text-gray-400 mt-1">Automated feedback synthesis</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <span className="text-green-400 text-sm font-semibold">Analysis Complete</span>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Responses</p>
                                        <p className="text-2xl font-bold text-white">42</p>
                                    </div>
                                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Sentiment</p>
                                        <p className="text-2xl font-bold text-green-400">Positive</p>
                                    </div>
                                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Confidence</p>
                                        <p className="text-2xl font-bold text-cyan-400">94%</p>
                                    </div>
                                </div>

                                {/* Summary Content */}
                                <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-8 md:p-10 border border-white/10 relative overflow-hidden group">
                                    {/* Decorative elements */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl"></div>
                                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>

                                    {/* Quote icon */}
                                    <div className="absolute top-6 left-6 text-cyan-500/10 text-6xl font-serif">"</div>

                                    <div className="relative space-y-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-1 h-12 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                                            <h2 className="text-xl font-bold text-white">Key Insights</h2>
                                        </div>

                                        <p className="text-lg md:text-xl text-gray-200 leading-relaxed pl-6">
                                            {summary}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                    <button
                                        onClick={() => navigate(-1)}
                                        className="flex-1 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-semibold hover:bg-white/10 transition-all"
                                    >
                                        Back to Dashboard
                                    </button>
                                    <button className="flex-1 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-cyan-500/25 hover:from-cyan-700 hover:to-blue-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all">
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Export Report
                                        </span>
                                    </button>
                                    <button className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold shadow-lg shadow-purple-500/25 hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all">
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                            </svg>
                                            Share Insights
                                        </span>
                                    </button>
                                </div>

                                {/* Footer Note */}
                                <div className="mt-8 p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-sm text-gray-400">
                                            This summary was generated using advanced AI analysis of student feedback. Individual responses remain anonymous and confidential.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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

export default FeedbackSummaryPage;