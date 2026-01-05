import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
                const { data } = await axios.get('http://localhost:5000/api/timetable', config);
                setTimetable(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTimetable();
    }, []);

    if (timetable.length === 0) {
        return <p className="text-gray-500">No classes scheduled.</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b text-left">Day</th>
                        <th className="py-2 px-4 border-b text-left">Period</th>
                        <th className="py-2 px-4 border-b text-left">Subject</th>
                        <th className="py-2 px-4 border-b text-left">Room</th>
                        {role === 'student' && <th className="py-2 px-4 border-b text-left">Teacher</th>}
                        <th className="py-2 px-4 border-b text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {timetable.map((entry) => (
                        <tr key={entry._id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">{entry.day}</td>
                            <td className="py-2 px-4 border-b">{entry.period}</td>
                            <td className="py-2 px-4 border-b">{entry.subject}</td>
                            <td className="py-2 px-4 border-b">{entry.room}</td>
                            {role === 'student' && <td className="py-2 px-4 border-b">{entry.teacher?.name}</td>}
                            <td className="py-2 px-4 border-b">
                                {role === 'student' ? (
                                    <button
                                        onClick={() => navigate(`/feedback/${entry._id}`)}
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                    >
                                        Give Feedback
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => navigate(`/feedback-summary/${entry._id}`)}
                                        className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                                    >
                                        View Summary
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Timetable;
