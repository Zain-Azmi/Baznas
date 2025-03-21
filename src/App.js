import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { CSpinner, useColorModes } from '@coreui/react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import './scss/style.scss'
import './scss/examples.scss'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// Import IdleDetector (yang telah kamu modifikasi)
import IdleDetector from './IdleDetector'

// Komponen PrivateRoute untuk melindungi route
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

const AppContent = () => {
  const navigate = useNavigate()
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  // State untuk memantau apakah pengguna sedang idle
  const [isIdle, setIsIdle] = useState(false)

  // Callback saat pengguna dianggap idle (tidak ada aktivitas selama 60 detik)
  const handleIdle = () => {
    // Cek apakah sudah dalam keadaan idle untuk mencegah multiple panggilan
    if (!isIdle) {
      console.log('Pengguna idle')
      setIsIdle(true)
      Swal.fire({
        icon: 'info',
        title: 'Session Expired',
        text: 'Sesi Anda telah habis karena tidak ada aktivitas. Silakan login kembali.',
      }).then(() => {
        localStorage.removeItem('token')
        navigate('/login', { replace: true })
      })
    }
  }

  // Callback ketika pengguna aktif kembali
  const handleActive = () => {
    if (isIdle) {
      console.log('Pengguna aktif kembali')
      setIsIdle(false)
    } else {
      console.log('Reset timer dipanggil (pengguna aktif)')
    }
  }

  useEffect(() => {
    // Konfigurasi tema (opsional)
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }
    if (!isColorModeSet()) {
      setColorMode(storedTheme)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <IdleDetector idleTime={900000} onIdle={handleIdle} onActive={handleActive} />
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
          {/* Semua route lainnya harus melalui PrivateRoute */}
          <Route
            path="*"
            element={
              <PrivateRoute>
                <DefaultLayout />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </>
  )
}

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
