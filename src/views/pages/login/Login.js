import React from 'react'
import { Link } from 'react-router-dom'
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

const Login = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-column">
  {/* Header di atas CContainer */}
  <div className="bg-primary text-white py-3 px-4 w-100 text-center">
  <CustomIcon />
  </div>

  {/* Wrapper supaya card tetap di tengah */}
  <div className="flex-grow-1 d-flex align-items-center justify-content-center">
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={8}>
          <CCardGroup>
            <CCard className="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p className="text-body-secondary">Sign In to your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput type="password" placeholder="Password" autoComplete="current-password" />
                  </CInputGroup>
                  <CRow>
                    <CCol xs={6}>
                      <CButton color="primary" className="px-4">Login</CButton>
                    </CCol>
                    <CCol xs={6} className="text-right">
                      <CButton color="link" className="px-0">Forgot password?</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
              <CCardBody className="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                  <Link to="/register">
                    <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                  </Link>
                </div>
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
