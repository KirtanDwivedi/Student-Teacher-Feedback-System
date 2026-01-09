import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import FeedbackPage from './pages/FeedbackPage';
import FeedbackSummaryPage from './pages/FeedbackSummaryPage';

// Shared Layout for "Antigravity" Experience
const AntigravityLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-antigravity relative overflow-hidden">
            {/* Core Antigravity Background Elements (Rendered once for all pages) */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 opacity-20 rounded-full blur-3xl animate-float pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 opacity-20 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '-2s' }}></div>

            {/* Page Content */}
            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    );
};

function App() {
    return (
        <Router>
            <AntigravityLayout>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/student-dashboard" element={<StudentDashboard />} />
                    <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
                    <Route path="/feedback/:timetableId" element={<FeedbackPage />} />
                    <Route path="/feedback-summary/:timetableId" element={<FeedbackSummaryPage />} />
                </Routes>
            </AntigravityLayout>
        </Router>
    );
}

export default App;
