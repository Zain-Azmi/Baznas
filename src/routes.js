import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const permohonan = React.lazy(() => import('./views/permohonan/permohonanbantuan'))
const Bantuan = React.lazy(() => import('./views/manajemenbantuan/manajemenbantuan'))
const Pengguna = React.lazy(() => import('./views/manajemenpengguna/manajemenpengguna'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/permohonanbantuan', name: 'Permohonan Bantuan', element: permohonan },
  { path: '/manajemenbantuan', name: 'Manajemen Bantuan', element: Bantuan },
  { path: '/manajemenpengguna', name: 'Manajemen Pengguna', element: Pengguna },
]

export default routes
