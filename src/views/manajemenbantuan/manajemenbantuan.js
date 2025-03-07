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
} from '@coreui/react'
import { faArrowUpWideShort, faArrowUpShortWide, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TombolTambah, TombolTolak, TombolDetail, TombolEdit } from './tombolaksi.js'
const Bantuan = () => {
  const [bantuanData, setBantuanData] = useState([])
  const fetchData = () => {
    axios
      .get('http://localhost:5000/api/bantuan')
      .then((res) => {
        setBantuanData(res.data)
        console.log(bantuanData)
      })
      .catch((err) => console.error('Gagal mengambil data bantuan:', err))
  }

  // Panggil fetchData saat komponen pertama kali dimount
  useEffect(() => {
    fetchData()
  }, [])

  // Fungsi untuk memicu refresh data (misalnya setelah tambah permohonan baru)
  const ambilulangdatabantuan = () => {
    fetchData()
  }
  return (
    <CCard>
      <CCardHeader>
        <TombolTambah ambildata={ambilulangdatabantuan} />
      </CCardHeader>
      <CCardBody>
        <CTable responsive bordered borderColor="green">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Nama Bantuan</CTableHeaderCell>
              <CTableHeaderCell scope="col">Jenis Program</CTableHeaderCell>
              <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {bantuanData.map((bantuan) => (
              <CTableRow key={bantuan.id}>
                <CTableHeaderCell scope="row">{bantuan.id}</CTableHeaderCell>
                <CTableDataCell>{bantuan.nama_bantuan}</CTableDataCell>
                <CTableDataCell>{bantuan.jenis_program}</CTableDataCell>
                <CTableDataCell>
                  <TombolTolak bantuan={bantuan} ambildata={ambilulangdatabantuan} />{' '}
                  <TombolDetail id={bantuan.id} />{' '}
                  <TombolEdit id={bantuan.id} ambildata={ambilulangdatabantuan} />
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}
export default Bantuan
