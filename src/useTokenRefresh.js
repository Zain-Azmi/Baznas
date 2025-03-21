import { useEffect } from 'react'
import axios from 'axios'

const useTokenRefresh = (isIdle) => {
  useEffect(() => {
    // Jika pengguna idle, jangan refresh token
    if (isIdle) return

    // Refresh token setiap 1 jam (3600000 ms)
    const intervalId = setInterval(() => {
      const token = localStorage.getItem('token')
      if (token) {
        axios
          .post('http://localhost:5000/api/refresh', { token })
          .then((res) => {
            // Simpan token baru ke localStorage
            localStorage.setItem('token', res.data.newToken)
            console.log('Token berhasil direfresh')
          })
          .catch((error) => {
            console.error('Gagal memperbarui token:', error)
          })
      }
    }, 3600000)

    return () => clearInterval(intervalId)
  }, [isIdle])
}

export default useTokenRefresh
