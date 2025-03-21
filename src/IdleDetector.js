import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const IdleDetector = ({ idleTime = 900000, onIdle, onActive }) => {
  const timerRef = useRef(null)
  const navigate = useNavigate()

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    if (onActive) {
      onActive()
    }
    timerRef.current = setTimeout(() => {
      if (onIdle) {
        onIdle()
      } else {
        localStorage.removeItem('token')
        Swal.fire({
          icon: 'info',
          title: 'Session Expired',
          text: 'Sesi Anda telah habis karena tidak ada aktivitas. Silakan login kembali.',
        }).then(() => {
          navigate('/login', { replace: true })
        })
      }
    }, idleTime)
  }

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click', 'scroll']
    events.forEach((event) => window.addEventListener(event, resetTimer))
    // Mulai timer saat komponen dipasang
    resetTimer()
    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer))
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [idleTime, onIdle, onActive])

  return null
}

export default IdleDetector
