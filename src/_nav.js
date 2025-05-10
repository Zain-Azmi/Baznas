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
  },
  {
    component: CNavItem,
    name: 'Permohonan Bantuan',
    to: '/permohonanbantuan',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Manajemen Bantuan',
    to: '/manajemenbantuan',
    icon: <CIcon icon={cilApps} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Manajemen Pengguna',
    to: '/manajemenpengguna',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
]

export default _nav
