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
  MDBCheckbox
} from 'mdb-react-ui-kit';
import BASE_URL from '../config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
            Transform Your <br />
            <span style={{color: 'hsl(218, 81%, 75%)'}}>Teaching Experience</span>
          </h1>

          <p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
            Harness AI-powered insights to bridge the gap between teaching and learning. 
            Real-time feedback, automated summaries, and intelligent analytics 
            to empower educators and students alike.
          </p>
        </MDBCol>

        <MDBCol md='6' className='position-relative'>
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
              <h2 className="fw-bold mb-4 text-center">Welcome Back</h2>
              <p className="text-center mb-4">Sign in to continue to your dashboard</p>

              <form onSubmit={submitHandler}>
                <MDBInput 
                  wrapperClass='mb-4' 
                  label='Email' 
                  id='email' 
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MDBInput 
                  wrapperClass='mb-4' 
                  label='Password' 
                  id='password' 
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <div className='d-flex justify-content-between mb-4'>
                  <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                  <a href="#!">Forgot password?</a>
                </div>

                <MDBBtn 
                  className='w-100 mb-4' 
                  size='md' 
                  type='submit'
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </MDBBtn>

                <div className="text-center">
                  <p>Don't have an account? <Link to="/register">Create one now</Link></p>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
