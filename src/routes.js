import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// Icons
const CoreUIIcons = React.lazy(() => import('./views/laporan/laporan'))
const permohonan = React.lazy(() => import('./views/permohonan/permohonanbantuan'))
const Bantuan = React.lazy(() => import('./views/manajemenbantuan/manajemenbantuan'))
// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/permohonanbantuan', name: 'Permohonan Bantuan', element: permohonan },
  { path: '/manajemenbantuan', name: 'Manajemen Bantuan', element: Bantuan },
  { path: '/manajemenpengguna', name: 'Manajemen Pengguna', element: CoreUIIcons },
  { path: '/laporan', name: 'Laporan & Statistik', element: CoreUIIcons },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
