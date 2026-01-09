const BASE_URL = import.meta.env.VITE_API_URL ||
    (window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://student-teacher-feedback-system.onrender.com');

export default BASE_URL;
