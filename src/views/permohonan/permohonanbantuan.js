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
  CButton,
} from '@coreui/react'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { TombolSetuju, TombolTolak, TombolDetail } from './tombolaksi'
import DownloadButton from './tombolaksi'
const Permohonan = () => {
  const [permohonanData, setPermohonanData] = useState([])
  const [activeTab, setActiveTab] = useState('baru')
  const [searchTerm, setSearchTerm] = useState('')

  const fetchData = () => {
    axios
      .get('http://localhost:5000/api/tabelpermohonan')
      .then((res) => {
        setPermohonanData(res.data)
        console.log('Data permohonan:', res.data)
      })
      .catch((err) => console.error('Gagal mengambil data permohonan:', err))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const refreshData = () => {
    fetchData()
  }


  // Filter data berdasarkan status
  const filterByStatus = (status) =>
    permohonanData.filter((item) => item.status && item.status.toLowerCase() === status)

  // Fungsi filter data sesuai field yang diinginkan
  const filterData = (dataArray) => {
    if (!searchTerm) return dataArray
    const term = searchTerm.toLowerCase()
    return dataArray.filter((item) => {
      let fieldsToSearch = []
      if (item.status.toLowerCase() === 'baru') {
        fieldsToSearch = [
          item.id,
          item.nama_user,
          item.jenis_bantuan,
          item.no_hp,
          item.tanggal_pengajuanformat,
        ]
      } else {
        fieldsToSearch = [
          item.id,
          item.nama_user,
          item.jenis_bantuan,
          item.no_hp,
          item.tanggal_pengajuanformat,
          item.jumlah_bantuan,
        ]
      }

      return fieldsToSearch
        .filter((val) => typeof val === 'string' || typeof val === 'number')
        .some((val) => val.toString().toLowerCase().includes(term))
    })
  }

  // Fungsi formatRupiah untuk menampilkan jumlah bantuan dalam format mata uang Indonesia
  const formatRupiah = (angka) => {
    if (!angka) return 'Rp 0'
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka)
  }

  return (
    <CCard>
      <CCardBody>
        {/* Tab Navigation */}
        <CNav variant="tabs" layout="fill">
          <CNavItem>
            <CNavLink active={activeTab === 'baru'} onClick={() => setActiveTab('baru')}>
              Permohonan Baru
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === 'pelaksana'} onClick={() => setActiveTab('pelaksana')}>
              Kepala Pelaksana
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === 'bidang2'} onClick={() => setActiveTab('bidang2')}>
              Waka Bidang II
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === 'bidang3'} onClick={() => setActiveTab('bidang3')}>
              Waka Bidang III
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === 'baznas'} onClick={() => setActiveTab('baznas')}>
              Ketua Baznas
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === 'selesai'} onClick={() => setActiveTab('selesai')}>
              Selesai
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === 'ditolak'} onClick={() => setActiveTab('ditolak')}>
              Ditolak
            </CNavLink>
          </CNavItem>
        </CNav>

        <CCard className="mt-3">
          <CCardHeader>
            <div className="d-flex justify-content-end">
              <CFormInput
                type="text"
                placeholder="Cari (semua data)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ maxWidth: '200px' }}
              />
            </div>
          </CCardHeader>
          <CTabContent>
            {/* Tab Permohonan Baru */}
            <CTabPane visible={activeTab === 'baru'}>
              <CTable responsive bordered borderColor="green" className="mt-3">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Nama Pemohon</CTableHeaderCell>
                    <CTableHeaderCell>Jenis Bantuan</CTableHeaderCell>
                    <CTableHeaderCell>No Hp</CTableHeaderCell>
                    <CTableHeaderCell>Tanggal Pengajuan</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filterData(filterByStatus('baru')).map((item) => (
                    <CTableRow key={item.id}>
                      <CTableHeaderCell>{item.id}</CTableHeaderCell>
                      <CTableDataCell>{item.nama_user}</CTableDataCell>
                      <CTableDataCell>{item.jenis_bantuan}</CTableDataCell>
                      <CTableDataCell>{item.no_hp || '-'}</CTableDataCell>
                      <CTableDataCell>{item.tanggal_pengajuanformat}</CTableDataCell>
                      <CTableDataCell>
                        <TombolSetuju
                          id={item.id}
                          databaru={refreshData}
                          jumlah={item.jumlah_bantuan}
                        />{' '}
                        <TombolTolak id={item.id} databaru={refreshData} />{' '}
                        <TombolDetail id={item.id} />
                        {' '}
                        <DownloadButton namafile={item.nama_file} />
                        
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CTabPane>

            {/* Tab Kepala Pelaksana */}
            <CTabPane visible={activeTab === 'pelaksana'}>
              <CTable responsive bordered borderColor="green" className="mt-3">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Nama Pemohon</CTableHeaderCell>
                    <CTableHeaderCell>Jenis Bantuan</CTableHeaderCell>
                    <CTableHeaderCell>No Hp</CTableHeaderCell>
                    <CTableHeaderCell>Tanggal Pengajuan</CTableHeaderCell>
                    <CTableHeaderCell>Jumlah Bantuan</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filterData(filterByStatus('pelaksana')).map((item) => (
                    <CTableRow key={item.id}>
                      <CTableHeaderCell>{item.id}</CTableHeaderCell>
                      <CTableDataCell>{item.nama_user}</CTableDataCell>
                      <CTableDataCell>{item.jenis_bantuan}</CTableDataCell>
                      <CTableDataCell>{item.no_hp || '-'}</CTableDataCell>
                      <CTableDataCell>{item.tanggal_pengajuanformat}</CTableDataCell>
                      <CTableDataCell>{formatRupiah(item.jumlah_bantuan)}</CTableDataCell>
                      <CTableDataCell>
                        <TombolSetuju
                          id={item.id}
                          databaru={refreshData}
                          jumlah={item.jumlah_bantuan}
                        />{' '}
                        <TombolTolak id={item.id} databaru={refreshData} />{' '}
                                                <TombolDetail id={item.id} />
                        {' '}
                        <DownloadButton namafile={item.nama_file} />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CTabPane>

            {/* Tab Waka Bidang II */}
            <CTabPane visible={activeTab === 'bidang2'}>
              <CTable responsive bordered borderColor="green" className="mt-3">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Nama Pemohon</CTableHeaderCell>
                    <CTableHeaderCell>Jenis Bantuan</CTableHeaderCell>
                    <CTableHeaderCell>No Hp</CTableHeaderCell>
                    <CTableHeaderCell>Tanggal Pengajuan</CTableHeaderCell>
                    <CTableHeaderCell>Jumlah Bantuan</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filterData(filterByStatus('bidang2')).map((item) => (
                    <CTableRow key={item.id}>
                      <CTableHeaderCell>{item.id}</CTableHeaderCell>
                      <CTableDataCell>{item.nama_user}</CTableDataCell>
                      <CTableDataCell>{item.jenis_bantuan}</CTableDataCell>
                      <CTableDataCell>{item.no_hp || '-'}</CTableDataCell>
                      <CTableDataCell>{item.tanggal_pengajuanformat}</CTableDataCell>
                      <CTableDataCell>{formatRupiah(item.jumlah_bantuan)}</CTableDataCell>
                      <CTableDataCell>
                        <TombolSetuju
                          id={item.id}
                          databaru={refreshData}
                          jumlah={item.jumlah_bantuan}
                        />{' '}
                        <TombolTolak id={item.id} databaru={refreshData} />{' '}
                                                <TombolDetail id={item.id} />
                        {' '}
                        <DownloadButton namafile={item.nama_file} />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CTabPane>

            {/* Tab Waka Bidang III */}
            <CTabPane visible={activeTab === 'bidang3'}>
              <CTable responsive bordered borderColor="green" className="mt-3">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Nama Pemohon</CTableHeaderCell>
                    <CTableHeaderCell>Jenis Bantuan</CTableHeaderCell>
                    <CTableHeaderCell>No Hp</CTableHeaderCell>
                    <CTableHeaderCell>Tanggal Pengajuan</CTableHeaderCell>
                    <CTableHeaderCell>Jumlah Bantuan</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filterData(filterByStatus('bidang3')).map((item) => (
                    <CTableRow key={item.id}>
                      <CTableHeaderCell>{item.id}</CTableHeaderCell>
                      <CTableDataCell>{item.nama_user}</CTableDataCell>
                      <CTableDataCell>{item.jenis_bantuan}</CTableDataCell>
                      <CTableDataCell>{item.no_hp || '-'}</CTableDataCell>
                      <CTableDataCell>{item.tanggal_pengajuanformat}</CTableDataCell>
                      <CTableDataCell>{formatRupiah(item.jumlah_bantuan)}</CTableDataCell>
                      <CTableDataCell>
                        <TombolSetuju
                          id={item.id}
                          databaru={refreshData}
                          jumlah={item.jumlah_bantuan}
                        />{' '}
                        <TombolTolak id={item.id} databaru={refreshData} />{' '}
                                                <TombolDetail id={item.id} />
                        {' '}
                        <DownloadButton namafile={item.nama_file} />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CTabPane>

            {/* Tab Ketua Baznas */}
            <CTabPane visible={activeTab === 'baznas'}>
              <CTable responsive bordered borderColor="green" className="mt-3">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Nama Pemohon</CTableHeaderCell>
                    <CTableHeaderCell>Jenis Bantuan</CTableHeaderCell>
                    <CTableHeaderCell>No Hp</CTableHeaderCell>
                    <CTableHeaderCell>Tanggal Pengajuan</CTableHeaderCell>
                    <CTableHeaderCell>Jumlah Bantuan</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filterData(filterByStatus('baznas')).map((item) => (
                    <CTableRow key={item.id}>
                      <CTableHeaderCell>{item.id}</CTableHeaderCell>
                      <CTableDataCell>{item.nama_user}</CTableDataCell>
                      <CTableDataCell>{item.jenis_bantuan}</CTableDataCell>
                      <CTableDataCell>{item.no_hp || '-'}</CTableDataCell>
                      <CTableDataCell>{item.tanggal_pengajuanformat}</CTableDataCell>
                      <CTableDataCell>{formatRupiah(item.jumlah_bantuan)}</CTableDataCell>
                      <CTableDataCell>
                        <TombolSetuju
                          id={item.id}
                          databaru={refreshData}
                          jumlah={item.jumlah_bantuan}
                        />{' '}
                        <TombolTolak id={item.id} databaru={refreshData} />{' '}
                                                <TombolDetail id={item.id} />
                        {' '}
                        <DownloadButton namafile={item.nama_file} />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CTabPane>

            {/* Tab Selesai */}
            <CTabPane visible={activeTab === 'selesai'}>
              <CTable responsive bordered borderColor="green" className="mt-3">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Nama Pemohon</CTableHeaderCell>
                    <CTableHeaderCell>Jenis Bantuan</CTableHeaderCell>
                    <CTableHeaderCell>No Hp</CTableHeaderCell>
                    <CTableHeaderCell>Tanggal Pengajuan</CTableHeaderCell>
                    <CTableHeaderCell>Jumlah Bantuan</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filterData(filterByStatus('selesai')).map((item) => (
                    <CTableRow key={item.id}>
                      <CTableHeaderCell>{item.id}</CTableHeaderCell>
                      <CTableDataCell>{item.nama_user}</CTableDataCell>
                      <CTableDataCell>{item.jenis_bantuan}</CTableDataCell>
                      <CTableDataCell>{item.no_hp || '-'}</CTableDataCell>
                      <CTableDataCell>{item.tanggal_pengajuanformat}</CTableDataCell>
                      <CTableDataCell>{formatRupiah(item.jumlah_bantuan)}</CTableDataCell>
                      <CTableDataCell>
                                                <TombolDetail id={item.id} />
                        {' '}
                        <DownloadButton namafile={item.nama_file} />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CTabPane>

            {/* Tab Ditolak */}
            <CTabPane visible={activeTab === 'ditolak'}>
              <CTable responsive bordered borderColor="green" className="mt-3">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Nama Pemohon</CTableHeaderCell>
                    <CTableHeaderCell>Jenis Bantuan</CTableHeaderCell>
                    <CTableHeaderCell>No Hp</CTableHeaderCell>
                    <CTableHeaderCell>Tanggal Pengajuan</CTableHeaderCell>
                    <CTableHeaderCell>Jumlah Bantuan</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filterData(filterByStatus('ditolak')).map((item) => (
                    <CTableRow key={item.id}>
                      <CTableHeaderCell>{item.id}</CTableHeaderCell>
                      <CTableDataCell>{item.nama_user}</CTableDataCell>
                      <CTableDataCell>{item.jenis_bantuan}</CTableDataCell>
                      <CTableDataCell>{item.no_hp || '-'}</CTableDataCell>
                      <CTableDataCell>{item.tanggal_pengajuanformat}</CTableDataCell>
                      <CTableDataCell>{formatRupiah(item.jumlah_bantuan)}</CTableDataCell>
                      <CTableDataCell>
                                                <TombolDetail id={item.id} />
                        {' '}
                        <DownloadButton namafile={item.nama_file} />
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

export default Permohonan
