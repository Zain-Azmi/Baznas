import React from 'react'
import { useEffect, useState } from 'react'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { cilInfo } from '@coreui/icons'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { CChartLine } from '@coreui/react-chartjs'
import { TombolDetail } from './tombolaksi.js'

const Dashboard = () => {
  const [permohonanData, setPermohonanData] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/permohonanTerbaru')
      .then((res) => {
        setPermohonanData(res.data)
      })
      .catch((err) => console.error('Error fetching permohonan data:', err))
  }, [])
  const [period, setPeriod] = useState('Month')
  const [chartData, setChartData] = useState({
    labels: [],
    data: [],
  })
  const [summary, setSummary] = useState({
    total: 0,
    selesai: 0,
    ditolak: 0,
    diproses: 0,
    change: 0,
  })

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/permohonanDashboard?period=${period}`)
      .then((res) => {
        const { labels, data, summary } = res.data
        setChartData({ labels, data })
        setSummary(summary)
      })
      .catch((err) => console.error('Gagal mengambil data dashboard:', err))
  }, [period])

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <br />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="permohonan" className="card-title mb-0">
                Permohonan Bantuan
              </h4>
              <div className="small text-body-secondary">Periode: {period}</div>
            </CCol>
          </CRow>
          <CChartLine
            className="mt-4"
            style={{ height: '300px' }}
            data={{
              labels: chartData.labels,
              datasets: [
                {
                  label: 'Jumlah Permohonan',
                  backgroundColor: 'rgba(54, 162, 235, 0.1)',
                  borderColor: 'rgba(54, 162, 235, 0.8)',
                  pointBackgroundColor: 'rgba(54, 162, 235, 0.8)',
                  data: chartData.data,
                  fill: true,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                x: { grid: { display: false } },
                y: { grid: { display: true, color: '#f0f0f0' } },
              },
            }}
          />
        </CCardBody>
        <CCardFooter>
          <CRow xs={{ cols: 1, gutter: 4 }} sm={{ cols: 3 }} className="mb-2 text-center">
            <CCol>
              <div className="text-body-secondary">Selesai</div>
              <div className="fw-semibold">{summary.selesai}</div>
              <CProgress
                thin
                color="success"
                value={summary.total > 0 ? (summary.selesai / summary.total) * 100 : 0}
              />
            </CCol>
            <CCol>
              <div className="text-body-secondary">Ditolak</div>
              <div className="fw-semibold">{summary.ditolak}</div>
              <CProgress
                thin
                color="danger"
                value={summary.total > 0 ? (summary.ditolak / summary.total) * 100 : 0}
              />
            </CCol>
            <CCol>
              <div className="text-body-secondary">Diproses</div>
              <div className="fw-semibold">{summary.diproses}</div>
              <CProgress
                thin
                color="primary"
                value={summary.total > 0 ? (summary.diproses / summary.total) * 100 : 0}
              />
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Permohonan Terbaru</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">ID</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Nama Pemohon</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Jenis Bantuan</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">No HP</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Tanggal Pengajuan
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {permohonanData.length > 0 ? (
                    permohonanData.map((item) => (
                      <CTableRow key={item.id}>
                        <CTableDataCell className="text-center">{item.id}</CTableDataCell>
                        <CTableDataCell>{item.nama_user}</CTableDataCell>
                        <CTableDataCell>{item.jenis_bantuan}</CTableDataCell>
                        <CTableDataCell>{item.no_hp || '-'}</CTableDataCell>
                        <CTableDataCell>{item.tanggal_pengajuanformat}</CTableDataCell>
                        <CTableDataCell>
                          <TombolDetail id={item.id} />{' '}
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="6" className="text-center">
                        Tidak ada permohonan terbaru.
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
