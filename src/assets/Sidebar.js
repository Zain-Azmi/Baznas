import React, { useState } from 'react';
import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react';
import { cilMenu, cilArrowCircleLeft } from '@coreui/icons'; // Ikon dari CoreUI
import CIcon from '@coreui/icons-react';
import CustomIcon from 'src/assets/brand/logobaznas'
import IconKecil from 'src/assets/brand/logokecil'
const Sidebar = () => {
  const [isSidebarFold, setIsSidebarFold] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarFold(!isSidebarFold);
  };

  return (
    <CSidebar unfoldable={isSidebarFold} onHide={() => setIsSidebarFold(true)} onShow={() => setIsSidebarFold(false)}>
      <CSidebarBrand to="/" onClick={toggleSidebar}>
        {isSidebarFold ? (
          <IconKecil className="sidebar-icon-fold" />
        ) : (
          <CustomIcon className="sidebar-brand-full" />
        )}
      </CSidebarBrand>
      <CSidebarNav>
        {/* Navigasi sidebar */}
      </CSidebarNav>
    </CSidebar>
  );
};

export default Sidebar;