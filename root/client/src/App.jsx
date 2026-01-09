import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import FeedbackPage from './pages/FeedbackPage';
import FeedbackSummaryPage from './pages/FeedbackSummaryPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
                <Route path="/feedback/:timetableId" element={<FeedbackPage />} />
                <Route path="/feedback-summary/:timetableId" element={<FeedbackSummaryPage />} />
            </Routes>
        </Router>
    );
}

export default App;
