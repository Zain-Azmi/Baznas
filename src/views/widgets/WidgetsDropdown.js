import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilUser, cilFile, cilTag, cilArrowBottom, cilArrowTop } from '@coreui/icons'

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)
  const widgetChartRef3 = useRef(null)
  const [stats, setStats] = useState({
    userCount: 0,
    userChange: 0,
    permohonanCount: 0,
    permohonanChange: 0,
    jenisBantuanCount: 0,
    jenisBantuanChange: 0,
  })
  const [chartData, setChartData] = useState({
    users: new Array(12).fill(0),
    permohonan: new Array(12).fill(0),
    jenisBantuan: new Array(12).fill(0),
  })

  // Ambil data statistik
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/statistics')
      .then((res) => {
        const {
          userCount,
          userChange,
          permohonanCount,
          permohonanChange,
          jenisBantuanCount,
          jenisBantuanChange,
        } = res.data
        setStats({
          userCount,
          userChange,
          permohonanCount,
          permohonanChange,
          jenisBantuanCount,
          jenisBantuanChange,
        })
      })
      .catch((err) => console.error('Gagal mengambil data statistik:', err))
  }, [])

  // Ambil data grafik per bulan
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/chartdata')
      .then((res) => {
        setChartData(res.data)
      })
      .catch((err) => console.error('Gagal mengambil data grafik:', err))
  }, [])

  // Update warna grafik saat terjadi perubahan tema
  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }
      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
      if (widgetChartRef3.current) {
        setTimeout(() => {
          widgetChartRef3.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-warning')
          widgetChartRef3.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2, widgetChartRef3])

  const monthlyLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const chartOptions = {
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
    scales: {
      x: {
        border: { display: false },
        grid: { display: false, drawBorder: false },
        ticks: { display: false },
      },
      y: { display: false, grid: { display: false }, ticks: { display: false } },
    },
    elements: {
      line: { borderWidth: 1, tension: 0.4 },
      point: { radius: 4, hitRadius: 10, hoverRadius: 4 },
    },
  }

  const renderChangeIcon = (change) =>
    change >= 0 ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      {/* Kartu Pengguna */}
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="primary"
          value={
            <>
              {stats.userCount}{' '}
              <span className="fs-6 fw-normal">
                ({stats.userChange}% {renderChangeIcon(stats.userChange)})
              </span>
            </>
          }
          title="Pengguna"
          icon={<CIcon icon={cilUser} height={52} className="my-4 text-white" />}
          chart={
            <CChartLine
              ref={widgetChartRef1}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: monthlyLabels,
                datasets: [
                  {
                    label: 'Pengguna',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-primary'),
                    data: chartData.users,
                  },
                ],
              }}
              options={chartOptions}
            />
          }
          style={{ '--cui-card-cap-bg': '#3b5998' }}
        />
      </CCol>

      {/* Kartu Permohonan */}
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="info"
          value={
            <>
              {stats.permohonanCount}{' '}
              <span className="fs-6 fw-normal">
                ({stats.permohonanChange}% {renderChangeIcon(stats.permohonanChange)})
              </span>
            </>
          }
          title="Permohonan"
          icon={<CIcon icon={cilFile} height={52} className="my-4 text-white" />}
          chart={
            <CChartLine
              ref={widgetChartRef2}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: monthlyLabels,
                datasets: [
                  {
                    label: 'Permohonan',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-info'),
                    data: chartData.permohonan,
                  },
                ],
              }}
              options={chartOptions}
            />
          }
          style={{ '--cui-card-cap-bg': '#00aced' }}
        />
      </CCol>

      {/* Kartu Jenis Bantuan */}
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="warning"
          value={
            <>
              {stats.jenisBantuanCount}{' '}
              <span className="fs-6 fw-normal">
                ({stats.jenisBantuanChange}% {renderChangeIcon(stats.jenisBantuanChange)})
              </span>
            </>
          }
          title="Jenis Bantuan"
          icon={<CIcon icon={cilTag} height={52} className="my-4 text-white" />}
          chart={
            <CChartLine
              ref={widgetChartRef3}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: monthlyLabels,
                datasets: [
                  {
                    label: 'Jenis Bantuan',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-warning'),
                    data: chartData.jenisBantuan,
                  },
                ],
              }}
              options={chartOptions}
            />
          }
          style={{ '--cui-card-cap-bg': '#4875b4' }}
        />
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
}

export default WidgetsDropdown
