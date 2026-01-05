import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon
}
    from 'mdb-react-ui-kit';

const BASE_URL = "https://student-teacher-feedback-system.onrender.com";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        // Handle both form submission and button click if needed, though button inside form works best
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
        <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden' style={{ minHeight: '100vh' }}>

            <MDBRow>

                <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                    <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
                        Student–Teacher Feedback System <br />
                        <span style={{ color: 'hsl(218, 81%, 75%)' }}>Empowering classrooms through meaningful feedback</span>
                    </h1>

                    <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
                        This system provides an integrated environment for students and teachers to exchange feedback, manage class schedules, and receive meaningful insights through automated analysis, enhancing transparency and learning effectiveness.
                    </p>

                </MDBCol>

                <MDBCol md='6' className='position-relative'>

                    <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                    <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                    <MDBCard className='my-5 bg-glass'>
                        <MDBCardBody className='p-5'>

                            <h2 className="mb-4 text-center">Login</h2>

                            <form onSubmit={submitHandler}>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Email'
                                    id='form3'
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Password'
                                    id='form4'
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <MDBBtn className='w-100 mb-4' size='md' type='submit'>Login</MDBBtn>
                            </form>

                            <div className="text-center">

                                <p>New here? <Link to="/register" style={{ color: '#1266f1' }}>Register</Link></p>

                                <p>or login with:</p>

                                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                    <MDBIcon fab icon='facebook-f' size="sm" />
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                    <MDBIcon fab icon='twitter' size="sm" />
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                    <MDBIcon fab icon='google' size="sm" />
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                    <MDBIcon fab icon='github' size="sm" />
                                </MDBBtn>

                            </div>

                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );
};

export default Login;
