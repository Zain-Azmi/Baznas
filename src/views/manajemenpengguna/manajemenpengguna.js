import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CFormInput,
} from '@coreui/react'
import { TombolTambah, TombolTolak, TombolEdit } from './tombolaksi.js'

const Pengguna = () => {
  const [penggunaData, setPenggunaData] = useState([])
  const [activeTab, setActiveTab] = useState('admin')
  const [searchTerm, setSearchTerm] = useState('')

  const fetchData = () => {
    axios
      .get('http://localhost:5000/api/pengguna')
      .then((res) => {
        setPenggunaData(res.data)
        console.log('Data pengguna:', res.data)
      })
      .catch((err) => console.error('Gagal mengambil data pengguna:', err))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const ambilUlangDataPengguna = () => {
    fetchData()
  }

  // Filter data berdasarkan role
  const adminData = penggunaData.filter((user) => user.role === 'Admin')
  const pemohonData = penggunaData.filter((user) => user.role === 'Pemohon')

  // Fungsi untuk filter data berdasarkan searchTerm (berdasarkan nama atau nomor HP)
  const filterData = (data) => {
    if (!searchTerm) return data
    return data.filter((user) => {
      const term = searchTerm.toLowerCase()
      return (
        user.name.toLowerCase().includes(term) ||
        (user.phone && user.phone.toLowerCase().includes(term))
      )
    })
  }

  return (
    <CCard>
      <CCardHeader>
        <TombolTambah ambildata={ambilUlangDataPengguna} />
      </CCardHeader>
      <CCardBody>
        {/* Tab Navigation */}
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink active={activeTab === 'admin'} onClick={() => setActiveTab('admin')}>
              Admin
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === 'pemohon'} onClick={() => setActiveTab('pemohon')}>
              Pemohon
            </CNavLink>
          </CNavItem>
        </CNav>
        {/* Tab Content */}
        <CCard>
          <CCardHeader>
            <div className="d-flex justify-content-end">
              <CFormInput
                type="text"
                placeholder="Cari pengguna"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ maxWidth: '200px' }}
              />
            </div>
          </CCardHeader>
          <CTabContent>
            <CTabPane visible={activeTab === 'admin'}>
              <CTable responsive bordered borderColor="green" className="mt-3">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nama Pengguna</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Role Pengguna</CTableHeaderCell>
                    <CTableHeaderCell scope="col">No. HP</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filterData(adminData).map((user) => (
                    <CTableRow key={user.id}>
                      <CTableHeaderCell scope="row">{user.id}</CTableHeaderCell>
                      <CTableDataCell>{user.name}</CTableDataCell>
                      <CTableDataCell>{user.role}</CTableDataCell>
                      <CTableDataCell>{user.phone}</CTableDataCell>
                      <CTableDataCell>
                        <TombolTolak
                          id={user.id}
                          nama={user.name}
                          ambildata={ambilUlangDataPengguna}
                        />{' '}
                        <TombolEdit id={user.id} ambildata={ambilUlangDataPengguna} />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CTabPane>
            <CTabPane visible={activeTab === 'pemohon'}>
              <CTable responsive bordered borderColor="green" className="mt-3">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nama Pengguna</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Role Pengguna</CTableHeaderCell>
                    <CTableHeaderCell scope="col">No. HP</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filterData(pemohonData).map((user) => (
                    <CTableRow key={user.id}>
                      <CTableHeaderCell scope="row">{user.id}</CTableHeaderCell>
                      <CTableDataCell>{user.name}</CTableDataCell>
                      <CTableDataCell>{user.role}</CTableDataCell>
                      <CTableDataCell>{user.phone}</CTableDataCell>
                      <CTableDataCell>
                        <TombolTolak
                          id={user.id}
                          nama={user.name}
                          ambildata={ambilUlangDataPengguna}
                        />{' '}
                        <TombolEdit id={user.id} ambildata={ambilUlangDataPengguna} />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CTabPane>
          </CTabContent>
        </CCard>
      </CCardBody>
    </CCard>
  )
}

export default Pengguna
