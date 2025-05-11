import React from 'react'
import {
  CAvatar,
  CBadge,
  CButton,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import baznas from './../../assets/images/avatars/images.png'

const AppHeaderDropdown = () => {
  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem('token')
    // Redirect ke halaman login
    window.location.href = '/#/login'
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
          <CAvatar src={baznas} size="md"  style={{ border: '2px solid green' }} />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownDivider />
        <CDropdownItem href="#">
          <CButton color="secondary" onClick={handleLogout}>
            <CIcon icon={cilLockLocked} className="me-2" />
            Logout
          </CButton>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
