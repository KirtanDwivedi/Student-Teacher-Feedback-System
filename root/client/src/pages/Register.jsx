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

function Register() {
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
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
            Join Our <br />
            <span style={{color: 'hsl(218, 81%, 75%)'}}>Learning Community</span>
          </h1>

          <p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
            Create your account and experience seamless feedback management.
            Join thousands of educators and students transforming education
            with AI-powered insights and real-time analytics.
          </p>
        </MDBCol>

        <MDBCol md='6' className='position-relative'>
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
              <h2 className="fw-bold mb-4 text-center">Create Account</h2>
              <p className="text-center mb-4">Join the future of education</p>

              <form onSubmit={submitHandler}>
                <MDBInput 
                  wrapperClass='mb-4' 
                  label='Full Name' 
                  id='name' 
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

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

                <div className='mb-4'>
                  <label className='form-label fw-bold'>I am a:</label>
                  <div className='d-flex gap-3'>
                    <MDBBtn 
                      color={role === 'student' ? 'primary' : 'light'}
                      onClick={() => setRole('student')}
                      type='button'
                      className='flex-fill'
                    >
                      Student
                    </MDBBtn>
                    <MDBBtn 
                      color={role === 'teacher' ? 'primary' : 'light'}
                      onClick={() => setRole('teacher')}
                      type='button'
                      className='flex-fill'
                    >
                      Teacher
                    </MDBBtn>
                  </div>
                </div>

                <div className='d-flex justify-content-center mb-4'>
                  <MDBCheckbox 
                    name='flexCheck' 
                    value='' 
                    id='flexCheckDefault' 
                    label='I agree to the Terms of Service and Privacy Policy' 
                    required
                  />
                </div>

                <MDBBtn 
                  className='w-100 mb-4' 
                  size='md' 
                  type='submit'
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </MDBBtn>

                <div className="text-center">
                  <p>Already have an account? <Link to="/login">Sign in instead</Link></p>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
