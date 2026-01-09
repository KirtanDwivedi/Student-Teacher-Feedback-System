import BASE_URL from '../config';

const Timetable = ({ role }) => {
    const [timetable, setTimetable] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get(`${BASE_URL}/api/timetable`, config);
                setTimetable(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTimetable();
    }, []);

    if (timetable.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                <span className="text-4xl mb-3">📭</span>
                <p className="text-gray-400 font-medium">No classes scheduled yet.</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-transparent divide-y divide-white divide-opacity-[0.03]">
                    <thead>
                        <tr className="bg-white bg-opacity-[0.02]">
                            <th className="py-6 px-8 text-left text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Day</th>
                            <th className="py-6 px-8 text-left text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Period</th>
                            <th className="py-6 px-8 text-left text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Subject</th>
                            <th className="py-6 px-8 text-left text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Room</th>
                            {role === 'student' && <th className="py-6 px-8 text-left text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Teacher</th>}
                            <th className="py-6 px-8 text-right text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white divide-opacity-[0.03]">
                        {timetable.map((entry) => (
                            <tr key={entry._id} className="hover:bg-white hover:bg-opacity-[0.03] transition-colors group">
                                <td className="py-6 px-8 text-sm font-bold text-gray-400">{entry.day}</td>
                                <td className="py-6 px-8 text-sm">
                                    <span className="px-3 py-1 bg-white bg-opacity-[0.05] rounded-md text-[10px] font-black text-blue-500 uppercase tracking-tighter">{entry.period}</span>
                                </td>
                                <td className="py-6 px-8 text-sm font-black text-white">{entry.subject}</td>
                                <td className="py-6 px-8 text-sm text-gray-500 font-medium">{entry.room}</td>
                                {role === 'student' && (
                                    <td className="py-6 px-8 text-sm text-gray-400 font-bold italic">
                                        {entry.teacher?.name}
                                    </td>
                                )}
                                <td className="py-6 px-8 text-right">
                                    {role === 'student' ? (
                                        <button
                                            onClick={() => navigate(`/feedback/${entry._id}`)}
                                            className="px-6 py-2 bg-blue-600 bg-opacity-[0.1] border border-blue-600/30 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105"
                                        >
                                            Feedback
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => navigate(`/feedback-summary/${entry._id}`)}
                                            className="px-6 py-2 bg-purple-600 bg-opacity-[0.1] border border-purple-600/30 text-purple-400 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-purple-600 hover:text-white transition-all transform hover:scale-105"
                                        >
                                            Insights
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Timetable;
