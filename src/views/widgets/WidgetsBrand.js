import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { CWidgetStatsD, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilNotes, cilTag } from '@coreui/icons'

const WidgetsBrand = (props) => {
  const [stats, setStats] = useState({
    userCount: 0,
    bantuanCount: 0,
    jenisBantuanCount: 0,
  })

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/statistics')
      .then((res) => {
        const { userCount, bantuanCount, jenisBantuanCount } = res.data
        setStats({ userCount, bantuanCount, jenisBantuanCount })
      })
      .catch((err) => console.error('Gagal mengambil data statistik:', err))
  }, [])

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      {/* Kartu Jumlah Pengguna */}
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          icon={<CIcon icon={cilUser} height={52} className="my-4 text-white" />}
          values={[{ title: 'Pengguna', value: stats.userCount }]}
          style={{
            '--cui-card-cap-bg': '#3b5998',
          }}
        />
      </CCol>

      {/* Kartu Jumlah Bantuan */}
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          icon={<CIcon icon={cilNotes} height={52} className="my-4 text-white" />}
          values={[{ title: 'Bantuan', value: stats.bantuanCount }]}
          style={{
            '--cui-card-cap-bg': '#00aced',
          }}
        />
      </CCol>

      {/* Kartu Jumlah Jenis Bantuan */}
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          icon={<CIcon icon={cilTag} height={52} className="my-4 text-white" />}
          values={[{ title: 'Jenis Bantuan', value: stats.jenisBantuanCount }]}
          style={{
            '--cui-card-cap-bg': '#4875b4',
          }}
        />
      </CCol>
    </CRow>
  )
}

WidgetsBrand.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsBrand
