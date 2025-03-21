import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
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
} from '@coreui/react'
import { faXmark, faCheck, faEye } from '@fortawesome/free-solid-svg-icons'
export const Modalsetuju = ({ id, datareload, jumlahlama }) => {
  const [visible, setVisible] = useState(false)
  const [jumlah, setJumlah] = useState('')
  const [alasan, setAlasan] = useState('')

  // Fungsi format rupiah
  const formatRupiah = (value) => {
    const numberString = value.replace(/\D/g, '') // Hapus semua selain angka
    if (!numberString) return '' // Jika kosong, return kosong
    return `Rp. ${new Intl.NumberFormat('id-ID').format(numberString)}`
  }

  // Set nilai default jumlah saat modal dibuka
  useEffect(() => {
    if (visible && jumlahlama) {
      setJumlah(formatRupiah(jumlahlama.toString()))
    }
  }, [visible]) // Gunakan dependensi `visible` saja agar tidak memicu pemanggilan berulang

  const handleChange = (e) => {
    const rawValue = e.target.value
    setJumlah(formatRupiah(rawValue))
  }

  const handleSubmit = async () => {
    if (!alasan.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Gagal!',
        text: 'Alasan persetujuan harus diisi!',
      })
      return
    }

    try {
      const jumlahValue = jumlah.replace(/\D/g, '') // Ambil angka saja
      const idValue = id.id ? id.id : id

      console.log('Jumlah yang dikirim:', jumlahValue)
      console.log('Alasan yang dikirim:', alasan)
      console.log('ID yang dikirim:', idValue)

      await axios.put(`http://localhost:5000/api/permohonan/${idValue}`, {
        jumlah: jumlahValue,
        alasan,
      })

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Permohonan telah disetujui.',
      })

      if (datareload) {
        await datareload() // Pastikan reload selesai sebelum menutup modal
      }

      setVisible(false)
    } catch (error) {
      console.error('Gagal menambahkan bantuan:', error)
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Terjadi kesalahan saat menyetujui permohonan.',
      })
    }
  }

  return (
    <>
      <CButton color="success" onClick={() => setVisible(true)}>
        <FontAwesomeIcon icon={faCheck} />
      </CButton>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">Persetujuan</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Tanggapan Terhadap Permohonan
          <CForm>
            <CFormTextarea
              id="exampleFormControlTextarea1"
              value={alasan}
              rows={5}
              onChange={(e) => setAlasan(e.target.value)}
              placeholder="Masukkan alasan persetujuan..."
            />
            <br />
            Jumlah Bantuan
            <CFormInput
              type="text"
              value={jumlah}
              onChange={handleChange}
              placeholder="Masukkan nominal bantuan..."
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={handleSubmit}>
            Setujui
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export const Modaltolak = ({ id, datareload }) => {
  const [visible, setVisible] = useState(false)
  const [alasan, setAlasan] = useState('')

  const handleTolak = async () => {
    if (!alasan.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Alasan wajib diisi!',
        text: 'Harap masukkan alasan penolakan sebelum melanjutkan.',
      })
      return
    }

    Swal.fire({
      title: 'Konfirmasi Penolakan',
      text: 'Apakah Anda yakin ingin menolak permohonan ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Ya, Tolak',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`http://localhost:5000/api/tolakpermohonan/${id}`, {
            alasan_penolakan: alasan,
          })

          Swal.fire({
            icon: 'success',
            title: 'Permohonan Ditolak',
            text: 'Permohonan berhasil ditolak.',
          })

          setVisible(false) // Tutup modal setelah sukses
          if (datareload) {
            await datareload() // Reload data di parent
          }
        } catch (error) {
          console.error('Gagal menolak permohonan:', error)
          Swal.fire({
            icon: 'error',
            title: 'Gagal!',
            text: 'Terjadi kesalahan saat menolak permohonan.',
          })
        }
      }
    })
  }

  return (
    <>
      <CButton color="danger" onClick={() => setVisible(true)}>
        <FontAwesomeIcon icon={faXmark} />
      </CButton>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="modal-tolak-permohonan"
      >
        <CModalHeader>
          <CModalTitle id="modal-tolak-permohonan">Penolakan Permohonan</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <label>Alasan Penolakan</label>
            <CFormTextarea
              id="penolakan"
              rows={5}
              placeholder="Masukkan alasan penolakan..."
              value={alasan}
              onChange={(e) => setAlasan(e.target.value)}
            ></CFormTextarea>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Batal
          </CButton>
          <CButton color="danger" onClick={handleTolak}>
            Tolak Permohonan
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export const ModalDetail = ({ id }) => {
  const [visible, setVisible] = useState(false)
  const [detail, setDetail] = useState(null)

  // Fetch data detail berdasarkan id permohonan
  useEffect(() => {
    if (visible && id) {
      axios
        .get(`http://localhost:5000/api/detailpermohonan/${id}`)
        .then((response) => {
          console.log('Data detail diterima:', response.data)
          setDetail(response.data[0])
        })
        .catch((err) => {
          setError('Gagal mengambil data detail')
        })
    }
  }, [visible, id])

  return (
    <>
      <CButton color="info" onClick={() => setVisible(!visible)}>
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
          <CModalTitle id="modal-detail-title">Detail Permohonan</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {detail && (
            <CForm>
              <p>
                <strong>Penjelasan Permohonan:</strong>
              </p>
              <CFormTextarea
                readOnly
                value={detail.penjelasanpermohonan || 'Tidak ada Penjelasan Permohonn'}
                rows={3}
              />
              {detail.status === 'bidang2' && (
                <>
                  <p>
                    <strong>Alasan Wakil Ketua Pelaksana:</strong>
                  </p>
                  <CFormTextarea
                    readOnly
                    value={detail.alasanpelaksana || 'Tidak ada alasan dari Ketua Pelaksana'}
                    rows={3}
                  />
                </>
              )}
              {detail.status === 'bidang3' && (
                <>
                  <p>
                    <strong>Alasan Wakil Ketua Pelaksana:</strong>
                  </p>
                  <CFormTextarea
                    readOnly
                    value={detail.alasanpelaksana || 'Tidak ada alasan dari Ketua Pelaksana'}
                    rows={3}
                  />
                  <p>
                    <strong>Alasan Wakil Ketua Bidang 2:</strong>
                  </p>
                  <CFormTextarea
                    readOnly
                    value={detail.alasanbidang2 || 'Tidak ada alasan dari Wakil Ketua Bidang 2'}
                    rows={3}
                  />
                </>
              )}
              {detail.status === 'baznas' && (
                <>
                  <p>
                    <strong>Alasan Wakil Ketua Pelaksana:</strong>
                  </p>
                  <CFormTextarea
                    readOnly
                    value={detail.alasanpelaksana || 'Tidak ada alasan dari Ketua Pelaksana'}
                    rows={3}
                  />
                  <p>
                    <strong>Alasan Wakil Ketua Bidang 2:</strong>
                  </p>
                  <CFormTextarea
                    readOnly
                    value={detail.alasanbidang2 || 'Tidak ada alasan dari Wakil Ketua Bidang 2'}
                    rows={3}
                  />
                  <p>
                    <strong>Alasan Wakil Ketua Bidang 3:</strong>
                  </p>
                  <CFormTextarea
                    readOnly
                    value={detail.alasanbidang3 || 'Tidak ada alasan dari Wakil Ketua Bidang 3'}
                    rows={3}
                  />
                </>
              )}
              {detail.status === 'selesai' && (
                <>
                  <p>
                    <strong>Alasan Wakil Ketua Pelaksana:</strong>
                  </p>
                  <CFormTextarea
                    readOnly
                    value={detail.alasanpelaksana || 'Tidak ada alasan dari Ketua Pelaksana'}
                    rows={3}
                  />
                  <p>
                    <strong>Alasan Wakil Ketua Bidang 2:</strong>
                  </p>
                  <CFormTextarea
                    readOnly
                    value={detail.alasanbidang2 || 'Tidak ada alasan dari Wakil Ketua Bidang 2'}
                    rows={3}
                  />
                  <p>
                    <strong>Alasan Wakil Ketua Bidang 3:</strong>
                  </p>
                  <CFormTextarea
                    readOnly
                    value={detail.alasanbidang3 || 'Tidak ada alasan dari Wakil Ketua Bidang 3'}
                    rows={3}
                  />
                  <p>
                    <strong>Alasan Ketua Baznas:</strong>
                  </p>
                  <CFormTextarea
                    readOnly
                    value={detail.alasanbaznas || 'Tidak ada alasan dari Ketua Baznas'}
                    rows={3}
                  />
                </>
              )}
            </CForm>
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
