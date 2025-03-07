import React from 'react'
import { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableBody,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react'
import { CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/react'
import { TombolSetuju, TombolTolak, TombolDetail } from './tombolaksi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpShortWide, faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons'

const permohonan = () => {
  const [data, setData] = useState([])

  const fetchData = () => {
    fetch('http://localhost:5000/api/tabelpermohonan')
      .then((response) => response.json())
      .then((data) => {
        const groupedData = data.reduce((acc, item) => {
          const key = item.status.toLowerCase() // normalisasi jika perlu
          if (!acc[key]) {
            acc[key] = []
          }
          acc[key].push(item)
          return acc
        }, {})
        setData(groupedData)
      })
      .catch((error) => console.error('Error fetching data:', error))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const ambilulangdata = () => {
    fetchData() // 🔹 Toggle refresh untuk memicu useEffect
  }
  const formatRupiah = (angka) => {
    if (!angka) return 'Rp 0' // Jika angka undefined/null, kembalikan Rp 0
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka)
  }
  const [sortOrder, setSortOrder] = useState('asc') // Default sorting ascending

  const handleSortById = (statusKey) => {
    if (!data[statusKey]) return

    const sorted = [...data[statusKey]].sort((a, b) =>
      sortOrder === 'asc' ? a.id - b.id : b.id - a.id,
    )

    setData((prevData) => ({
      ...prevData,
      [statusKey]: sorted, // Update sorting hanya pada status yang diklik
    }))

    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc') // Toggle sorting order
  }

  return (
    <>
      <CCard style={{ width: 'auto' }}>
        <CTabs activeItemKey="baru">
          <CTabList variant="tabs" layout="fill">
            <CTab itemKey="baru">Permohonan Baru</CTab>
            <CTab itemKey="pelaksana">Kepala Pelaksana</CTab>
            <CTab itemKey="bidang2">Waka Bidang II</CTab>
            <CTab itemKey="bidang3">Waka Bidang III</CTab>
            <CTab itemKey="baznas">Ketua Baznas</CTab>
            <CTab itemKey="selesai">Selesai</CTab>
            <CTab itemKey="ditolak">Ditolak</CTab>
          </CTabList>
          <CCardBody>
            <CTabContent>
              <CTabPanel className="p-3" itemKey="baru">
                <CTable responsive bordered borderColor="green">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell
                        onClick={() => handleSortById('baru')}
                        style={{ cursor: 'pointer' }}
                      >
                        ID{' '}
                        {sortOrder === 'asc' ? (
                          <FontAwesomeIcon icon={faArrowUpWideShort} size="xs" />
                        ) : (
                          <FontAwesomeIcon icon={faArrowUpShortWide} size="xs" />
                        )}
                      </CTableHeaderCell>

                      <CTableHeaderCell scope="col">Nama Pemohon</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Jenis Bantuan</CTableHeaderCell>

                      <CTableHeaderCell scope="col">No Hp</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Tanggal Pengajuan</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {data.baru && data.baru.length > 0 ? (
                      data.baru.map((row, index) => (
                        <CTableRow key={row.id}>
                          <CTableHeaderCell scope="row">{row.id}</CTableHeaderCell>
                          <CTableDataCell>{row.nama_user}</CTableDataCell>
                          <CTableDataCell>{row.jenis_bantuan}</CTableDataCell>

                          <CTableDataCell>{row.no_hp || '-'}</CTableDataCell>
                          <CTableDataCell>{row.tanggal_pengajuanformat}</CTableDataCell>
                          <CTableDataCell>
                            <TombolSetuju
                              id={row.id}
                              databaru={ambilulangdata}
                              jumlah={row.jumlah_bantuan}
                            />{' '}
                            <TombolTolak /> <TombolDetail id={row.id} />
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan="7" className="text-center">
                          Tidak ada permohonan baru
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              </CTabPanel>

              <CTabPanel className="p-3" itemKey="pelaksana">
                <CTable responsive bordered borderColor="green">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell
                        onClick={() => handleSortById('pelaksana')}
                        style={{ cursor: 'pointer' }}
                      >
                        ID{' '}
                        {sortOrder === 'asc' ? (
                          <FontAwesomeIcon icon={faArrowUpWideShort} size="xs" />
                        ) : (
                          <FontAwesomeIcon icon={faArrowUpShortWide} size="xs" />
                        )}
                      </CTableHeaderCell>

                      <CTableHeaderCell scope="col">Nama Pemohon</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Jenis Bantuan</CTableHeaderCell>

                      <CTableHeaderCell scope="col">No Hp</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Tanggal Pengajuan</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Jumlah Bantuan</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {data.pelaksana && data.pelaksana.length > 0 ? (
                      data.pelaksana.map((row, index) => (
                        <CTableRow key={row.id}>
                          <CTableHeaderCell scope="row">{row.id}</CTableHeaderCell>
                          <CTableDataCell>{row.nama_user}</CTableDataCell>
                          <CTableDataCell>{row.jenis_bantuan}</CTableDataCell>

                          <CTableDataCell>{row.no_hp || '-'}</CTableDataCell>
                          <CTableDataCell>{row.tanggal_pengajuanformat}</CTableDataCell>
                          <CTableDataCell>{formatRupiah(row.jumlah_bantuan)}</CTableDataCell>
                          <CTableDataCell>
                            <TombolSetuju
                              id={row.id}
                              databaru={ambilulangdata}
                              jumlah={row.jumlah_bantuan}
                            />{' '}
                            <TombolTolak /> <TombolDetail id={row.id} />
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan="7" className="text-center">
                          Tidak ada permohonan baru
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              </CTabPanel>
              <CTabPanel className="p-3" itemKey="bidang2">
                <CTable responsive bordered borderColor="green">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell
                        onClick={() => handleSortById('bidang2')}
                        style={{ cursor: 'pointer' }}
                      >
                        ID{' '}
                        {sortOrder === 'asc' ? (
                          <FontAwesomeIcon icon={faArrowUpWideShort} size="xs" />
                        ) : (
                          <FontAwesomeIcon icon={faArrowUpShortWide} size="xs" />
                        )}
                      </CTableHeaderCell>

                      <CTableHeaderCell scope="col">Nama Pemohon</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Jenis Bantuan</CTableHeaderCell>

                      <CTableHeaderCell scope="col">No Hp</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Tanggal Pengajuan</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Jumlah Bantuan</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {data.bidang2 && data.bidang2.length > 0 ? (
                      data.bidang2.map((row, index) => (
                        <CTableRow key={row.id}>
                          <CTableHeaderCell scope="row">{row.id}</CTableHeaderCell>
                          <CTableDataCell>{row.nama_user}</CTableDataCell>
                          <CTableDataCell>{row.jenis_bantuan}</CTableDataCell>

                          <CTableDataCell>{row.no_hp || '-'}</CTableDataCell>
                          <CTableDataCell>{row.tanggal_pengajuanformat}</CTableDataCell>
                          <CTableDataCell>{formatRupiah(row.jumlah_bantuan)}</CTableDataCell>
                          <CTableDataCell>
                            <TombolSetuju
                              id={row.id}
                              databaru={ambilulangdata}
                              jumlah={row.jumlah_bantuan}
                            />{' '}
                            <TombolTolak /> <TombolDetail id={row.id} />
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan="7" className="text-center">
                          Tidak ada permohonan baru
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              </CTabPanel>
              <CTabPanel className="p-3" itemKey="bidang3">
                <CTable responsive bordered borderColor="green">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell
                        onClick={() => handleSortById('bidang3')}
                        style={{ cursor: 'pointer' }}
                      >
                        ID{' '}
                        {sortOrder === 'asc' ? (
                          <FontAwesomeIcon icon={faArrowUpWideShort} size="xs" />
                        ) : (
                          <FontAwesomeIcon icon={faArrowUpShortWide} size="xs" />
                        )}
                      </CTableHeaderCell>

                      <CTableHeaderCell scope="col">Nama Pemohon</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Jenis Bantuan</CTableHeaderCell>

                      <CTableHeaderCell scope="col">No Hp</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Tanggal Pengajuan</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Jumlah Bantuan</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {data.bidang3 && data.bidang3.length > 0 ? (
                      data.bidang3.map((row, index) => (
                        <CTableRow key={row.id}>
                          <CTableHeaderCell scope="row">{row.id}</CTableHeaderCell>
                          <CTableDataCell>{row.nama_user}</CTableDataCell>
                          <CTableDataCell>{row.jenis_bantuan}</CTableDataCell>

                          <CTableDataCell>{row.no_hp || '-'}</CTableDataCell>
                          <CTableDataCell>{row.tanggal_pengajuanformat}</CTableDataCell>
                          <CTableDataCell>{formatRupiah(row.jumlah_bantuan)}</CTableDataCell>
                          <CTableDataCell>
                            <TombolSetuju
                              id={row.id}
                              databaru={ambilulangdata}
                              jumlah={row.jumlah_bantuan}
                            />{' '}
                            <TombolTolak /> <TombolDetail id={row.id} />
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan="7" className="text-center">
                          Tidak ada permohonan baru
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              </CTabPanel>
              <CTabPanel className="p-3" itemKey="baznas">
                <CTable responsive bordered borderColor="green">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell
                        onClick={() => handleSortById('baznas')}
                        style={{ cursor: 'pointer' }}
                      >
                        ID{' '}
                        {sortOrder === 'asc' ? (
                          <FontAwesomeIcon icon={faArrowUpWideShort} size="xs" />
                        ) : (
                          <FontAwesomeIcon icon={faArrowUpShortWide} size="xs" />
                        )}
                      </CTableHeaderCell>

                      <CTableHeaderCell scope="col">Nama Pemohon</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Jenis Bantuan</CTableHeaderCell>

                      <CTableHeaderCell scope="col">No Hp</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Tanggal Pengajuan</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Jumlah Bantuan</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {data.baznas && data.baznas.length > 0 ? (
                      data.baznas.map((row, index) => (
                        <CTableRow key={row.id}>
                          <CTableHeaderCell scope="row">{row.id}</CTableHeaderCell>
                          <CTableDataCell>{row.nama_user}</CTableDataCell>
                          <CTableDataCell>{row.jenis_bantuan}</CTableDataCell>

                          <CTableDataCell>{row.no_hp || '-'}</CTableDataCell>
                          <CTableDataCell>{row.tanggal_pengajuanformat}</CTableDataCell>
                          <CTableDataCell>{formatRupiah(row.jumlah_bantuan)}</CTableDataCell>
                          <CTableDataCell>
                            <TombolSetuju
                              id={row.id}
                              databaru={ambilulangdata}
                              jumlah={row.jumlah_bantuan}
                            />{' '}
                            <TombolTolak /> <TombolDetail id={row.id} />
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan="7" className="text-center">
                          Tidak ada permohonan baru
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              </CTabPanel>
              <CTabPanel className="p-3" itemKey="selesai">
                <CTable responsive bordered borderColor="green">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell
                        onClick={() => handleSortById('selesai')}
                        style={{ cursor: 'pointer' }}
                      >
                        ID{' '}
                        {sortOrder === 'asc' ? (
                          <FontAwesomeIcon icon={faArrowUpWideShort} size="xs" />
                        ) : (
                          <FontAwesomeIcon icon={faArrowUpShortWide} size="xs" />
                        )}
                      </CTableHeaderCell>

                      <CTableHeaderCell scope="col">Nama Pemohon</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Jenis Bantuan</CTableHeaderCell>

                      <CTableHeaderCell scope="col">No Hp</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Tanggal Pengajuan</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Jumlah Bantuan</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {data.selesai && data.selesai.length > 0 ? (
                      data.selesai.map((row, index) => (
                        <CTableRow key={row.id}>
                          <CTableHeaderCell scope="row">{row.id}</CTableHeaderCell>
                          <CTableDataCell>{row.nama_user}</CTableDataCell>
                          <CTableDataCell>{row.jenis_bantuan}</CTableDataCell>

                          <CTableDataCell>{row.no_hp || '-'}</CTableDataCell>
                          <CTableDataCell>{row.tanggal_pengajuanformat}</CTableDataCell>
                          <CTableDataCell>{formatRupiah(row.jumlah_bantuan)}</CTableDataCell>
                          <CTableDataCell>
                            <TombolDetail id={row.id} />
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan="7" className="text-center">
                          Tidak ada permohonan yang sudah selesai
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              </CTabPanel>
              <CTabPanel className="p-3" itemKey="ditolak">
                <CTable responsive bordered borderColor="green">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell
                        onClick={() => handleSortById('ditolak')}
                        style={{ cursor: 'pointer' }}
                      >
                        ID{' '}
                        {sortOrder === 'asc' ? (
                          <FontAwesomeIcon icon={faArrowUpWideShort} size="xs" />
                        ) : (
                          <FontAwesomeIcon icon={faArrowUpShortWide} size="xs" />
                        )}
                      </CTableHeaderCell>

                      <CTableHeaderCell scope="col">Nama Pemohon</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Jenis Bantuan</CTableHeaderCell>

                      <CTableHeaderCell scope="col">No Hp</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Tanggal Pengajuan</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Jumlah Bantuan</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {data.ditolak && data.ditolak.length > 0 ? (
                      data.ditolak.map((row, index) => (
                        <CTableRow key={row.id}>
                          <CTableHeaderCell scope="row">{row.id}</CTableHeaderCell>
                          <CTableDataCell>{row.nama_user}</CTableDataCell>
                          <CTableDataCell>{row.jenis_bantuan}</CTableDataCell>

                          <CTableDataCell>{row.no_hp || '-'}</CTableDataCell>
                          <CTableDataCell>{row.tanggal_pengajuanformat}</CTableDataCell>
                          <CTableDataCell>{formatRupiah(row.jumlah_bantuan)}</CTableDataCell>
                          <CTableDataCell>
                            <TombolDetail id={row.id} />
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan="7" className="text-center">
                          Tidak ada permohonan yang ditolak
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              </CTabPanel>
              <CTabPanel className="p-3" itemKey="revisi">
                <CTable responsive bordered borderColor="green">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell
                        onClick={() => handleSortById('revisi')}
                        style={{ cursor: 'pointer' }}
                      >
                        ID{' '}
                        {sortOrder === 'asc' ? (
                          <FontAwesomeIcon icon={faArrowUpWideShort} size="xs" />
                        ) : (
                          <FontAwesomeIcon icon={faArrowUpShortWide} size="xs" />
                        )}
                      </CTableHeaderCell>

                      <CTableHeaderCell scope="col">Nama Pemohon</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Jenis Bantuan</CTableHeaderCell>

                      <CTableHeaderCell scope="col">No Hp</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Tanggal Pengajuan</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Jumlah Bantuan</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {data.revisi && data.revisi.length > 0 ? (
                      data.revisi.map((row, index) => (
                        <CTableRow key={row.id}>
                          <CTableHeaderCell scope="row">{row.id}</CTableHeaderCell>
                          <CTableDataCell>{row.nama_user}</CTableDataCell>
                          <CTableDataCell>{row.jenis_bantuan}</CTableDataCell>

                          <CTableDataCell>{row.no_hp || '-'}</CTableDataCell>
                          <CTableDataCell>{row.tanggal_pengajuanformat}</CTableDataCell>
                          <CTableDataCell>{formatRupiah(row.jumlah_bantuan)}</CTableDataCell>
                          <CTableDataCell>
                            <TombolSetuju
                              id={row.id}
                              databaru={ambilulangdata}
                              jumlah={row.jumlah_bantuan}
                            />{' '}
                            <TombolTolak /> <TombolDetail id={row.id} />
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan="7" className="text-center">
                          Tidak ada permohonan yang perlu revisi
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              </CTabPanel>
            </CTabContent>
          </CCardBody>
        </CTabs>
      </CCard>
    </>
  )
}

export default permohonan
