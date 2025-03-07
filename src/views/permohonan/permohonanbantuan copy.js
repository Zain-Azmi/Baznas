import React from 'react'
import { useEffect, useState } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableHead, CTableRow,CTableBody,CTableHeaderCell,CTableDataCell } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { brandSet } from '@coreui/icons'
import { DocsIcons } from 'src/components'
import { TombolSetuju } from './tombolaksi';
import { TombolTolak } from './tombolaksi';

const toKebabCase = (str) => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

const permohonan = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/permohonan")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <>
     <CCard style={{ width: 'auto' }}>
     <CTabs activeItemKey="profile">
      <CTabList variant="tabs">
        <CTab itemKey="home">Home</CTab>
        <CTab itemKey="profile">Profile</CTab>
        <CTab itemKey="contact">Contact</CTab>
        <CTab disabled itemKey="disabled">
          Disabled
        </CTab>
      </CTabList>
     <CCardBody>
     <CTabContent>
        <CTabPanel className="p-3" itemKey="home">
        <CTable bordered borderColor="green">
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">Id</CTableHeaderCell>
          <CTableHeaderCell scope="col">Nama User</CTableHeaderCell>
          <CTableHeaderCell scope="col">Jenis Bantuan</CTableHeaderCell>
          <CTableHeaderCell scope="col">Status</CTableHeaderCell>
          <CTableHeaderCell scope="col">No Hp</CTableHeaderCell>
          <CTableHeaderCell scope="col">Tanggal Pengajuan</CTableHeaderCell>
          <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {data.map((row, index) => (
          <CTableRow key={row.id}>
            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
            <CTableDataCell>{row.nama_user}</CTableDataCell>
            <CTableDataCell>{row.jenis_bantuan}</CTableDataCell>
            <CTableDataCell>{row.status}</CTableDataCell>
            <CTableDataCell>{row.no_hp || "-"}</CTableDataCell>
            <CTableDataCell>{row.tanggal_pengajuan}</CTableDataCell>
            <CTableDataCell><TombolSetuju />{" "}<TombolTolak /></CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
        </CTabPanel>
        <CTabPanel className="p-3" itemKey="profile">
          Profile tab content
        </CTabPanel>
        <CTabPanel className="p-3" itemKey="contact">
          Contact tab content
        </CTabPanel>
        <CTabPanel className="p-3" itemKey="disabled">
          Disabled tab content
        </CTabPanel>
      </CTabContent>
    </CCardBody>
    </CTabs>
    </CCard>
    </>
  )
}

export default permohonan