import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import CustomIcon from 'src/assets/brand/logobaznas'
import { sygnet } from 'src/assets/brand/sygnet'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      // Simpan token dan data user ke localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard'); // Arahkan ke dashboard setelah login
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal');
    }
  };
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-column">

  {/* Wrapper supaya card tetap di tengah */}
  <div className="flex-grow-1 d-flex align-items-center justify-content-center">
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={8}>
          <CCardGroup>
            <CCard className="p-4">
              <CCardBody>
              <CForm onSubmit={handleLogin}>
                      <h1>Login</h1>
                      <p className="text-body-secondary">Sign In to your account</p>
                      {error && <p className="text-danger">{error}</p>}
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton type="submit" color="primary" className="px-4">
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
            <CCard className="text-white bg-white py-5 d-flex justify-content-center align-items-center" style={{ width: '44%', minHeight: '200px' }}>
              <CCardBody className="d-flex justify-content-center align-items-center w-100 h-100">
                <CustomIcon />
              </CCardBody>
            </CCard>    
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</div>

  )
}

export default Login
