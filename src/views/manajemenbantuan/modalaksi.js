import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormTextarea,
  CFormInput,
  CFormCheck,
  CCard,
  CCardBody,
  CFormSelect,
} from '@coreui/react'
import { faTrash, faSquarePlus, faEye, faEdit } from '@fortawesome/free-solid-svg-icons'
export const ModalTambah = ({ ambildata }) => {
  const [visible, setVisible] = useState(false)
  const [namaBantuan, setNamaBantuan] = useState('')
  const [jenisProgram, setJenisProgram] = useState('')
  const [keteranganTambahan, setKeteranganTambahan] = useState('')

  // State untuk Persyaratan Umum (default true)
  const [persyaratanUmum, setPersyaratanUmum] = useState({
    suratPermohonan: true,
    fotokopiKK: true,
    fotokopiKTP: true,
    suratKeteranganTidakMampu: true,
    suratKeteranganJamaah: true,
    fotoDokumentasiRumah: true,
    denahRumah: true,
  })

  // State untuk Persyaratan Tambahan (default false)
  const [persyaratanTambahan, setPersyaratanTambahan] = useState({
    fotokopiKepemilikanTanah: false,
    fotokopiRekening: false,
    fotoPemohonDidepanRumah: false,
    dokumentasi: false,
    suratKeteranganSakit: false,
    kwitansiBerobat: false,
    rincianHutang: false,
    rincianAnggaranBiaya: false,
    naskahPerjanjianBantuan: false,
    pernyataanSiapMemberikanLaporan: false,
  })

  const handleSubmit = async () => {
    try {
      // Membuat array berdasarkan checkbox yang dicentang
      const selectedPersyaratanUmum = Object.keys(persyaratanUmum)
        .filter((key) => persyaratanUmum[key])
        .map((key) => {
          switch (key) {
            case 'suratPermohonan':
              return 'Surat Permohonan'
            case 'fotokopiKK':
              return 'Fotokopi KK'
            case 'fotokopiKTP':
              return 'Fotokopi KTP'
            case 'suratKeteranganTidakMampu':
              return 'Surat Keterangan Tidak Mampu (asli)'
            case 'suratKeteranganJamaah':
              return 'Surat Keterangan Jamaah Masjid (asli)'
            case 'fotoDokumentasiRumah':
              return 'Foto / Dokumentasi Rumah'
            case 'denahRumah':
              return 'Denah Rumah'
            default:
              return key
          }
        })

      const selectedPersyaratanTambahan = Object.keys(persyaratanTambahan)
        .filter((key) => persyaratanTambahan[key])
        .map((key) => {
          switch (key) {
            case 'fotokopiKepemilikanTanah':
              return 'Fotokopi Kepemilikan Tanah'
            case 'fotokopiRekening':
              return 'Fotokopi Rekening'
            case 'fotoPemohonDidepanRumah':
              return 'Foto Pemohon Didepan Rumah'
            case 'dokumentasi':
              return 'Dokumentasi'
            case 'suratKeteranganSakit':
              return 'Surat Keterangan Sakit'
            case 'kwitansiBerobat':
              return 'Kwitansi Berobat'
            case 'rincianHutang':
              return 'Rincian Hutang'
            case 'rincianAnggaranBiaya':
              return 'Rincian Anggaran Biaya'
            case 'naskahPerjanjianBantuan':
              return 'Naskah Perjanjian Bantuan'
            case 'pernyataanSiapMemberikanLaporan':
              return 'Pernyataan Siap Memberikan Laporan'
            default:
              return key
          }
        })

      // Membuat payload untuk dikirim ke backend
      const payload = {
        nama_bantuan: namaBantuan,
        jenis_program: jenisProgram,
        keterangan: keteranganTambahan,
        persyaratan_umum: selectedPersyaratanUmum,
        persyaratan_tambahan: selectedPersyaratanTambahan,
      }

      // Mengirim data ke backend
      const response = await axios.post('http://localhost:5000/api/tambahbantuan', payload)
      console.log('Response:', response.data)
      alert('Bantuan berhasil ditambahkan!')
      // Reset form (opsional)
      setNamaBantuan('')
      setJenisProgram('')
      setKeteranganTambahan('')
      // Tutup modal
      console.log('Tipe ambildata:', typeof ambildata)

      ambildata()
      setVisible(false)
    } catch (error) {
      console.error('Gagal menambahkan bantuan:', error)
      alert('Gagal menambahkan bantuan')
    }
  }

  return (
    <>
      <CButton color="success" onClick={() => setVisible(!visible)}>
        <FontAwesomeIcon icon={faSquarePlus} /> Tambah Jenis Bantuan
      </CButton>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">Jenis Bantuan Baru</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <label>Nama Bantuan</label>
            <CFormInput
              type="text"
              placeholder="Masukkan Nama Bantuan"
              required
              value={namaBantuan}
              onChange={(e) => setNamaBantuan(e.target.value)}
            />
            <br />
            <label>Jenis Program</label>
            <CFormSelect
              aria-label="Default select example"
              options={[
                { label: 'Pilih Jenis Program', value: '' },
                { label: 'Kemanusiaan', value: 'Kemanusiaan' },
                { label: 'Kesehatan', value: 'Kesehatan' },
                { label: 'Pendidikan', value: 'Pendidikan' },
                { label: 'Ekonomi', value: 'Ekonomi' },
                { label: 'Dakwah Dan Advokasi', value: 'Dakwah Dan Advokasi' },
              ]}
              required
              value={jenisProgram}
              onChange={(e) => setJenisProgram(e.target.value)}
            />
            <br />
            <label>Persyaratan Umum</label>
            <CCard>
              <CCardBody>
                <CFormCheck
                  id="Surat Permohonan"
                  label="Surat Permohonan"
                  checked={persyaratanUmum.suratPermohonan}
                  onChange={(e) =>
                    setPersyaratanUmum({ ...persyaratanUmum, suratPermohonan: e.target.checked })
                  }
                />
                <CFormCheck
                  id="Fotokopi KK"
                  label="Fotokopi KK"
                  checked={persyaratanUmum.fotokopiKK}
                  onChange={(e) =>
                    setPersyaratanUmum({ ...persyaratanUmum, fotokopiKK: e.target.checked })
                  }
                />
                <CFormCheck
                  id="Fotokopi KTP"
                  label="Fotokopi KTP"
                  checked={persyaratanUmum.fotokopiKTP}
                  onChange={(e) =>
                    setPersyaratanUmum({ ...persyaratanUmum, fotokopiKTP: e.target.checked })
                  }
                />
                <CFormCheck
                  id="Surat Keterangan Tidak Mampu (asli)"
                  label="Surat Keterangan Tidak Mampu (asli)"
                  checked={persyaratanUmum.suratKeteranganTidakMampu}
                  onChange={(e) =>
                    setPersyaratanUmum({
                      ...persyaratanUmum,
                      suratKeteranganTidakMampu: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Surat Keterangan Jamaah Masjid (asli)"
                  label="Surat Keterangan Jamaah Masjid (asli)"
                  checked={persyaratanUmum.suratKeteranganJamaah}
                  onChange={(e) =>
                    setPersyaratanUmum({
                      ...persyaratanUmum,
                      suratKeteranganJamaah: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Foto / Dokumentasi Rumah"
                  label="Foto / Dokumentasi Rumah"
                  checked={persyaratanUmum.fotoDokumentasiRumah}
                  onChange={(e) =>
                    setPersyaratanUmum({
                      ...persyaratanUmum,
                      fotoDokumentasiRumah: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Denah Rumah"
                  label="Denah Rumah"
                  checked={persyaratanUmum.denahRumah}
                  onChange={(e) =>
                    setPersyaratanUmum({ ...persyaratanUmum, denahRumah: e.target.checked })
                  }
                />
              </CCardBody>
            </CCard>
            <br />
            <label>Persyaratan Tambahan</label>
            <CCard>
              <CCardBody>
                <CFormCheck
                  id="Fotokopi Kepemilikan Tanah"
                  label="Fotokopi Kepemilikan Tanah"
                  checked={persyaratanTambahan.fotokopiKepemilikanTanah}
                  onChange={(e) =>
                    setPersyaratanTambahan({
                      ...persyaratanTambahan,
                      fotokopiKepemilikanTanah: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Fotokopi Rekening"
                  label="Fotokopi Rekening"
                  checked={persyaratanTambahan.fotokopiRekening}
                  onChange={(e) =>
                    setPersyaratanTambahan({
                      ...persyaratanTambahan,
                      fotokopiRekening: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Foto Pemohon Didepan Rumah"
                  label="Foto Pemohon Didepan Rumah"
                  checked={persyaratanTambahan.fotoPemohonDidepanRumah}
                  onChange={(e) =>
                    setPersyaratanTambahan({
                      ...persyaratanTambahan,
                      fotoPemohonDidepanRumah: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Dokumentasi"
                  label="Dokumentasi"
                  checked={persyaratanTambahan.dokumentasi}
                  onChange={(e) =>
                    setPersyaratanTambahan({
                      ...persyaratanTambahan,
                      dokumentasi: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Surat Keterangan Sakit"
                  label="Surat Keterangan Sakit"
                  checked={persyaratanTambahan.suratKeteranganSakit}
                  onChange={(e) =>
                    setPersyaratanTambahan({
                      ...persyaratanTambahan,
                      suratKeteranganSakit: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Kwitansi Berobat"
                  label="Kwitansi Berobat"
                  checked={persyaratanTambahan.kwitansiBerobat}
                  onChange={(e) =>
                    setPersyaratanTambahan({
                      ...persyaratanTambahan,
                      kwitansiBerobat: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Rincian Hutang"
                  label="Rincian Hutang"
                  checked={persyaratanTambahan.rincianHutang}
                  onChange={(e) =>
                    setPersyaratanTambahan({
                      ...persyaratanTambahan,
                      rincianHutang: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Rincian Anggaran Biaya"
                  label="Rincian Anggaran Biaya"
                  checked={persyaratanTambahan.rincianAnggaranBiaya}
                  onChange={(e) =>
                    setPersyaratanTambahan({
                      ...persyaratanTambahan,
                      rincianAnggaranBiaya: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Naskah Perjanjian Bantuan"
                  label="Naskah Perjanjian Bantuan"
                  checked={persyaratanTambahan.naskahPerjanjianBantuan}
                  onChange={(e) =>
                    setPersyaratanTambahan({
                      ...persyaratanTambahan,
                      naskahPerjanjianBantuan: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Pernyataan Siap Memberikan Laporan"
                  label="Pernyataan Siap Memberikan Laporan"
                  checked={persyaratanTambahan.pernyataanSiapMemberikanLaporan}
                  onChange={(e) =>
                    setPersyaratanTambahan({
                      ...persyaratanTambahan,
                      pernyataanSiapMemberikanLaporan: e.target.checked,
                    })
                  }
                />
              </CCardBody>
            </CCard>
            <br />
            <CFormTextarea
              id="Keterangan Tambahan"
              label="Keterangan Tambahan"
              rows={3}
              value={keteranganTambahan}
              onChange={(e) => setKeteranganTambahan(e.target.value)}
            ></CFormTextarea>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={handleSubmit}>
            Tambah
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export const ModalHapus = ({ bantuan, ambildata }) => {
  const [visible, setVisible] = useState(false)

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/hapusbantuan/${bantuan.id}`)
      alert('Bantuan berhasil dihapus!')
      setVisible(false)
      ambildata() // Refresh data di parent
    } catch (error) {
      console.error('Gagal menghapus bantuan:', error)
      alert('Gagal menghapus bantuan')
    }
  }

  return (
    <>
      <CButton color="danger" onClick={() => setVisible(true)}>
        <FontAwesomeIcon icon={faTrash} />{' '}
      </CButton>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="modal-hapus-bantuan"
      >
        <CModalHeader>Konfirmasi Penghapusan</CModalHeader>
        <CModalBody>
          Yakin ingin menghapus bantuan <strong>{bantuan.nama_bantuan}</strong>?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Batal
          </CButton>
          <CButton color="danger" onClick={handleDelete}>
            Hapus
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export const ModalDetail = ({ id }) => {
  const [visible, setVisible] = useState(false)
  const [bantuan, setBantuan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (visible && id) {
      setLoading(true)
      axios
        .get(`http://localhost:5000/api/detailbantuan/${id}`)
        .then((response) => {
          console.log('Data detail bantuan diterima:', response.data)
          // Asumsikan response.data berupa array dan ambil item pertama
          setBantuan(response.data[0])
          setLoading(false)
        })
        .catch((err) => {
          console.error('Gagal mengambil data detail bantuan:', err)
          setError('Gagal mengambil data detail bantuan')
          setLoading(false)
        })
    }
  }, [visible, id])

  return (
    <>
      <CButton color="info" onClick={() => setVisible(true)}>
        <FontAwesomeIcon icon={faEye} />
      </CButton>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="modal-detail-title"
      >
        <CModalHeader>
          <CModalTitle id="modal-detail-title">Detail Bantuan</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {loading ? (
            <p>Loading detail bantuan...</p>
          ) : error ? (
            <p>{error}</p>
          ) : bantuan ? (
            <>
              <p>
                <strong>Persyaratan Umum:</strong>
              </p>
              {bantuan.persyaratan_umum && bantuan.persyaratan_umum.length > 0 ? (
                <ul>
                  {bantuan.persyaratan_umum.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>Tidak ada persyaratan umum.</p>
              )}

              <p>
                <strong>Persyaratan Tambahan:</strong>
              </p>
              {bantuan.persyaratan_tambahan && bantuan.persyaratan_tambahan.length > 0 ? (
                <ul>
                  {bantuan.persyaratan_tambahan.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>Tidak ada persyaratan tambahan.</p>
              )}

              <p>
                <strong>Keterangan Tambahan:</strong>
              </p>
              <CFormTextarea
                readOnly
                value={bantuan.keterangan || 'Tidak ada keterangan tambahan.'}
                rows={3}
              />
            </>
          ) : (
            <p>Data detail tidak tersedia.</p>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export const ModalEdit = ({ id, ambildata }) => {
  const [visible, setVisible] = useState(false)
  // Form state
  const [namaBantuan, setNamaBantuan] = useState('')
  const [jenisProgram, setJenisProgram] = useState('')
  const [keteranganTambahan, setKeteranganTambahan] = useState('')

  // State untuk Persyaratan Umum
  const [persyaratanUmum, setPersyaratanUmum] = useState({
    suratPermohonan: false,
    fotokopiKK: false,
    fotokopiKTP: false,
    suratKeteranganTidakMampu: false,
    suratKeteranganJamaah: false,
    fotoDokumentasiRumah: false,
    denahRumah: false,
  })

  // State untuk Persyaratan Tambahan
  const [persyaratanTambahan, setPersyaratanTambahan] = useState({
    fotokopiKepemilikanTanah: false,
    fotokopiRekening: false,
    fotoPemohonDidepanRumah: false,
    dokumentasi: false,
    suratKeteranganSakit: false,
    kwitansiBerobat: false,
    rincianHutang: false,
    rincianAnggaranBiaya: false,
    naskahPerjanjianBantuan: false,
    pernyataanSiapMemberikanLaporan: false,
  })

  // Fetch detail data ketika modal dibuka
  useEffect(() => {
    if (visible && id) {
      axios
        .get(`http://localhost:5000/api/detaileditbantuan/${id}`)
        .then((response) => {
          const detail = response.data[0]
          if (detail) {
            setNamaBantuan(detail.nama_bantuan)
            setJenisProgram(detail.jenis_program)
            setKeteranganTambahan(detail.keterangan || '')

            setPersyaratanUmum({
              suratPermohonan: detail.persyaratan_umum?.includes('Surat Permohonan'),
              fotokopiKK: detail.persyaratan_umum?.includes('Fotokopi KK'),
              fotokopiKTP: detail.persyaratan_umum?.includes('Fotokopi KTP'),
              suratKeteranganTidakMampu: detail.persyaratan_umum?.includes(
                'Surat Keterangan Tidak Mampu (asli)',
              ),
              suratKeteranganJamaah: detail.persyaratan_umum?.includes(
                'Surat Keterangan Jamaah Masjid (asli)',
              ),
              fotoDokumentasiRumah: detail.persyaratan_umum?.includes('Foto / Dokumentasi Rumah'),
              denahRumah: detail.persyaratan_umum?.includes('Denah Rumah'),
            })

            setPersyaratanTambahan({
              fotokopiKepemilikanTanah: detail.persyaratan_tambahan?.includes(
                'Fotokopi Kepemilikan Tanah',
              ),
              fotokopiRekening: detail.persyaratan_tambahan?.includes('Fotokopi Rekening'),
              fotoPemohonDidepanRumah: detail.persyaratan_tambahan?.includes(
                'Foto Pemohon Didepan Rumah',
              ),
              dokumentasi: detail.persyaratan_tambahan?.includes('Dokumentasi'),
              suratKeteranganSakit: detail.persyaratan_tambahan?.includes('Surat Keterangan Sakit'),
              kwitansiBerobat: detail.persyaratan_tambahan?.includes('Kwitansi Berobat'),
              rincianHutang: detail.persyaratan_tambahan?.includes('Rincian Hutang'),
              rincianAnggaranBiaya: detail.persyaratan_tambahan?.includes('Rincian Anggaran Biaya'),
              naskahPerjanjianBantuan: detail.persyaratan_tambahan?.includes(
                'Naskah Perjanjian Bantuan',
              ),
              pernyataanSiapMemberikanLaporan: detail.persyaratan_tambahan?.includes(
                'Pernyataan Siap Memberikan Laporan',
              ),
            })
          }
        })
        .catch((err) => {
          console.error('Gagal mengambil detail bantuan:', err)
        })
    }
  }, [visible, id])

  const handleSubmit = async () => {
    try {
      // Membuat array untuk persyaratan umum yang dicentang
      const selectedPersyaratanUmum = Object.keys(persyaratanUmum)
        .filter((key) => persyaratanUmum[key])
        .map((key) => {
          switch (key) {
            case 'suratPermohonan':
              return 'Surat Permohonan'
            case 'fotokopiKK':
              return 'Fotokopi KK'
            case 'fotokopiKTP':
              return 'Fotokopi KTP'
            case 'suratKeteranganTidakMampu':
              return 'Surat Keterangan Tidak Mampu (asli)'
            case 'suratKeteranganJamaah':
              return 'Surat Keterangan Jamaah Masjid (asli)'
            case 'fotoDokumentasiRumah':
              return 'Foto / Dokumentasi Rumah'
            case 'denahRumah':
              return 'Denah Rumah'
            default:
              return key
          }
        })

      // Membuat array untuk persyaratan tambahan yang dicentang
      const selectedPersyaratanTambahan = Object.keys(persyaratanTambahan)
        .filter((key) => persyaratanTambahan[key])
        .map((key) => {
          switch (key) {
            case 'fotokopiKepemilikanTanah':
              return 'Fotokopi Kepemilikan Tanah'
            case 'fotokopiRekening':
              return 'Fotokopi Rekening'
            case 'fotoPemohonDidepanRumah':
              return 'Foto Pemohon Didepan Rumah'
            case 'dokumentasi':
              return 'Dokumentasi'
            case 'suratKeteranganSakit':
              return 'Surat Keterangan Sakit'
            case 'kwitansiBerobat':
              return 'Kwitansi Berobat'
            case 'rincianHutang':
              return 'Rincian Hutang'
            case 'rincianAnggaranBiaya':
              return 'Rincian Anggaran Biaya'
            case 'naskahPerjanjianBantuan':
              return 'Naskah Perjanjian Bantuan'
            case 'pernyataanSiapMemberikanLaporan':
              return 'Pernyataan Siap Memberikan Laporan'
            default:
              return key
          }
        })

      const payload = {
        nama_bantuan: namaBantuan,
        jenis_program: jenisProgram,
        keterangan: keteranganTambahan,
        persyaratan_umum: selectedPersyaratanUmum,
        persyaratan_tambahan: selectedPersyaratanTambahan,
      }

      // Mengirim data ke backend (asumsikan menggunakan metode PUT dan endpoint /api/bantuan/:id)
      const response = await axios.put(`http://localhost:5000/api/editbantuan/${id}`, payload)
      console.log('Response:', response.data)
      alert('Bantuan berhasil diupdate!')
      ambildata() // Refresh data dari parent
      setVisible(false)
    } catch (error) {
      console.error('Gagal mengupdate bantuan:', error)
      alert('Gagal mengupdate bantuan')
    }
  }

  return (
    <>
      <CButton color="warning" onClick={() => setVisible(true)}>
        <FontAwesomeIcon icon={faEdit} />
      </CButton>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="modal-edit-title"
      >
        <CModalHeader>
          <CModalTitle id="modal-edit-title">Edit Bantuan</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <label>Nama Bantuan</label>
            <CFormInput
              type="text"
              placeholder="Masukkan Nama Bantuan"
              required
              value={namaBantuan}
              onChange={(e) => setNamaBantuan(e.target.value)}
            />
            <br />
            <label>Jenis Program</label>
            <CFormSelect
              aria-label="Default select example"
              options={[
                { label: 'Pilih Jenis Program', value: '' },
                { label: 'Kemanusiaan', value: 'Kemanusiaan' },
                { label: 'Kesehatan', value: 'Kesehatan' },
                { label: 'Pendidikan', value: 'Pendidikan' },
                { label: 'Ekonomi', value: 'Ekonomi' },
                { label: 'Dakwah Dan Advokasi', value: 'Dakwah Dan Advokasi' },
              ]}
              required
              value={jenisProgram}
              onChange={(e) => setJenisProgram(e.target.value)}
            />
            <br />
            <label>Persyaratan Umum</label>
            <CCard>
              <CCardBody>
                <CFormCheck
                  id="Surat Permohonan"
                  label="Surat Permohonan"
                  checked={persyaratanUmum.suratPermohonan}
                  onChange={(e) =>
                    setPersyaratanUmum({ ...persyaratanUmum, suratPermohonan: e.target.checked })
                  }
                />
                <CFormCheck
                  id="Fotokopi KK"
                  label="Fotokopi KK"
                  checked={persyaratanUmum.fotokopiKK}
                  onChange={(e) =>
                    setPersyaratanUmum({ ...persyaratanUmum, fotokopiKK: e.target.checked })
                  }
                />
                <CFormCheck
                  id="Fotokopi KTP"
                  label="Fotokopi KTP"
                  checked={persyaratanUmum.fotokopiKTP}
                  onChange={(e) =>
                    setPersyaratanUmum({ ...persyaratanUmum, fotokopiKTP: e.target.checked })
                  }
                />
                <CFormCheck
                  id="Surat Keterangan Tidak Mampu (asli)"
                  label="Surat Keterangan Tidak Mampu (asli)"
                  checked={persyaratanUmum.suratKeteranganTidakMampu}
                  onChange={(e) =>
                    setPersyaratanUmum({
                      ...persyaratanUmum,
                      suratKeteranganTidakMampu: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Surat Keterangan Jamaah Masjid (asli)"
                  label="Surat Keterangan Jamaah Masjid (asli)"
                  checked={persyaratanUmum.suratKeteranganJamaah}
                  onChange={(e) =>
                    setPersyaratanUmum({
                      ...persyaratanUmum,
                      suratKeteranganJamaah: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Foto / Dokumentasi Rumah"
                  label="Foto / Dokumentasi Rumah"
                  checked={persyaratanUmum.fotoDokumentasiRumah}
                  onChange={(e) =>
                    setPersyaratanUmum({
                      ...persyaratanUmum,
                      fotoDokumentasiRumah: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Denah Rumah"
                  label="Denah Rumah"
                  checked={persyaratanUmum.denahRumah}
                  onChange={(e) =>
                    setPersyaratanUmum({ ...persyaratanUmum, denahRumah: e.target.checked })
                  }
                />
              </CCardBody>
            </CCard>
            <br />
            <label>Persyaratan Tambahan</label>
            <CCard>
              <CCardBody>
                <CFormCheck
                  id="Fotokopi Kepemilikan Tanah"
                  label="Fotokopi Kepemilikan Tanah"
                  checked={persyaratanTambahan.fotokopiKepemilikanTanah}
                  onChange={(e) =>
                    setPersyaratanTambahan({
                      ...persyaratanTambahan,
                      fotokopiKepemilikanTanah: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Fotokopi Rekening"
                  label="Fotokopi Rekening"
                  checked={persyaratanTambahan.fotokopiRekening}
                  onChange={(e) =>
                    setPersyaratanTambahan({
                      ...persyaratanTambahan,
                      fotokopiRekening: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Foto Pemohon Didepan Rumah"
                  label="Foto Pemohon Didepan Rumah"
                  checked={persyaratanTambahan.fotoPemohonDidepanRumah}
                  onChange={(e) =>
                    setPersyaratanTambahan({
                      ...persyaratanTambahan,
                      fotoPemohonDidepanRumah: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Dokumentasi"
                  label="Dokumentasi"
                  checked={persyaratanTambahan.dokumentasi}
                  onChange={(e) =>
                    setPersyaratanTambahan({
                      ...persyaratanTambahan,
                      dokumentasi: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Surat Keterangan Sakit"
                  label="Surat Keterangan Sakit"
                  checked={persyaratanTambahan.suratKeteranganSakit}
                  onChange={(e) =>
                    setPersyaratanTambahan({
                      ...persyaratanTambahan,
                      suratKeteranganSakit: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Kwitansi Berobat"
                  label="Kwitansi Berobat"
                  checked={persyaratanTambahan.kwitansiBerobat}
                  onChange={(e) =>
                    setPersyaratanTambahan({
                      ...persyaratanTambahan,
                      kwitansiBerobat: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Rincian Hutang"
                  label="Rincian Hutang"
                  checked={persyaratanTambahan.rincianHutang}
                  onChange={(e) =>
                    setPersyaratanTambahan({
                      ...persyaratanTambahan,
                      rincianHutang: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Rincian Anggaran Biaya"
                  label="Rincian Anggaran Biaya"
                  checked={persyaratanTambahan.rincianAnggaranBiaya}
                  onChange={(e) =>
                    setPersyaratanTambahan({
                      ...persyaratanTambahan,
                      rincianAnggaranBiaya: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Naskah Perjanjian Bantuan"
                  label="Naskah Perjanjian Bantuan"
                  checked={persyaratanTambahan.naskahPerjanjianBantuan}
                  onChange={(e) =>
                    setPersyaratanTambahan({
                      ...persyaratanTambahan,
                      naskahPerjanjianBantuan: e.target.checked,
                    })
                  }
                />
                <CFormCheck
                  id="Pernyataan Siap Memberikan Laporan"
                  label="Pernyataan Siap Memberikan Laporan"
                  checked={persyaratanTambahan.pernyataanSiapMemberikanLaporan}
                  onChange={(e) =>
                    setPersyaratanTambahan({
                      ...persyaratanTambahan,
                      pernyataanSiapMemberikanLaporan: e.target.checked,
                    })
                  }
                />
              </CCardBody>
            </CCard>
            <br />
            <CFormTextarea
              id="Keterangan Tambahan"
              label="Keterangan Tambahan"
              rows={3}
              value={keteranganTambahan}
              onChange={(e) => setKeteranganTambahan(e.target.value)}
            ></CFormTextarea>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={handleSubmit}>
            Update
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
