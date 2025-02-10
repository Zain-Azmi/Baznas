import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCalculator,
  cilDescription,
  cilSpeedometer,
  cilStar,
  cilApps,
  cilPeople,
  cilChartLine,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavGroup,
    name: 'Permohonan Bantuan',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Daftar Permohonan',
        to: '/icons/coreui-icons',
      },
      {
        component: CNavItem,
        name: 'Verifikasi Permohonan',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'Permohonan Disetujui',
        to: '/icons/brands',
      },
      {
        component: CNavItem,
        name: 'Permohonan Ditolak',
        to: '/icons/brands',
      },
      {
        component: CNavItem,
        name: 'Permohonan Revisi',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Manajemen Bantuan',
    icon: <CIcon icon={cilApps} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Kelola Jenis Bantuan',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Persyaratan Dokumen',
        to: '/notifications/badges',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Manajemen Pengguna',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Admin & Verifikator',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Hak Akses',
        to: '/notifications/badges',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Laporan & Statistik',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Laporan Bulanan/Tahunan',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Statistik Jenis Bantuan',
        to: '/notifications/badges',
      }
    ],
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
]

export default _nav
