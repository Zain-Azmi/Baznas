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
  CRow,
  CCol,
} from '@coreui/react'
import { faXmark, faCheck, faEye } from '@fortawesome/free-solid-svg-icons'
export const Modalsetuju = ({ id, datareload, jumlahlama }) => {
  const [visible, setVisible] = useState(false)
  const [jumlah, setJumlah] = useState('')
  const [alasan, setAlasan] = useState('')

  // Fungsi format rupiah
  const formatRupiah = (value) => {
    const numberString = value.replace(/\D/g, '') 
    if (!numberString) return ''
    return `Rp. ${new Intl.NumberFormat('id-ID').format(numberString)}`
  }

  useEffect(() => {
    if (visible && jumlahlama) {
      setJumlah(formatRupiah(jumlahlama.toString()))
    }
  }, [visible]) 

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
      const jumlahValue = jumlah.replace(/\D/g, '')
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
        await datareload()
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
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (visible && id) {
      axios
        .get(`http://localhost:5000/api/detailpermohonan/${id}`)
        .then((response) => setDetail(response.data[0]))
        .catch(() => setError('Gagal mengambil data detail'));
    }
  }, [visible, id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    const ye = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, '0');
    const da = String(d.getDate()).padStart(2, '0');
    return `${ye}-${mo}-${da}`;
  };

  // Determine modal size: md for new ('baru'), lg for others
  const modalSize = detail && detail.status === 'baru' ? 'md' : 'lg';

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
        size={modalSize}
        aria-labelledby="modal-detail-title"
      >
        <CModalHeader>
          <CModalTitle id="modal-detail-title">Detail Permohonan</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {error && <div className="text-danger mb-3">{error}</div>}
          {detail && (
            <CForm>
              <CRow>
                {detail.status === 'baru' ? (
                  <CCol xs={12}>
                    {/* Single-column layout for new submissions */}
                    <div className="mb-3">
                      <strong>Nama Pemohon:</strong>
                      <div>{detail.full_name || '-'}</div>
                    </div>
                    <div className="mb-3">
                      <strong>NIK:</strong>
                      <div>{detail.nik || '-'}</div>
                    </div>
                    <div className="mb-3">
                      <strong>No KK:</strong>
                      <div>{detail.no_kk || '-'}</div>
                    </div>
                    <div className="mb-3">
                      <strong>Tempat Lahir:</strong>
                      <div>{detail.tempat_lahir || '-'}</div>
                    </div>
                    <div className="mb-3">
                      <strong>Tanggal Lahir:</strong>
                      <div>{formatDate(detail.tanggal_lahir)}</div>
                    </div>
                    <div className="mb-3">
                      <strong>Pekerjaan:</strong>
                      <div>{detail.pekerjaan || '-'}</div>
                    </div>
                    <div className="mb-3">
                      <strong>Alamat:</strong>
                      <div>{detail.alamat || '-'}</div>
                    </div>
                    <div className="mb-3">
                      <strong>No HP:</strong>
                      <div>{detail.no_hp || '-'}</div>
                    </div>
                    <div className="mb-3">
                      <strong>Nama Bank:</strong>
                      <div>{detail.nama_bank || '-'}</div>
                    </div>
                    <div className="mb-3">
                      <strong>No Rekening:</strong>
                      <div>{detail.no_rekening || '-'}</div>
                    </div>
                  </CCol>
                ) : (
                  <>
                    <CCol xs={12} md={6} className="pe-md-4">
                      {/* Left column for processed submissions */}
                      <div className="mb-3">
                        <strong>Nama Pemohon:</strong>
                        <div>{detail.full_name || '-'}</div>
                      </div>
                      <div className="mb-3">
                        <strong>NIK:</strong>
                        <div>{detail.nik || '-'}</div>
                      </div>
                      <div className="mb-3">
                        <strong>No KK:</strong>
                        <div>{detail.no_kk || '-'}</div>
                      </div>
                      <div className="mb-3">
                        <strong>Tempat Lahir:</strong>
                        <div>{detail.tempat_lahir || '-'}</div>
                      </div>
                      <div className="mb-3">
                        <strong>Tanggal Lahir:</strong>
                        <div>{formatDate(detail.tanggal_lahir)}</div>
                      </div>
                      <div className="mb-3">
                        <strong>Pekerjaan:</strong>
                        <div>{detail.pekerjaan || '-'}</div>
                      </div>
                      <div className="mb-3">
                        <strong>Alamat:</strong>
                        <div>{detail.alamat || '-'}</div>
                      </div>
                      <div className="mb-3">
                        <strong>No HP:</strong>
                        <div>{detail.no_hp || '-'}</div>
                      </div>
                      <div className="mb-3">
                        <strong>Nama Bank:</strong>
                        <div>{detail.nama_bank || '-'}</div>
                      </div>
                      <div className="mb-3">
                        <strong>No Rekening:</strong>
                        <div>{detail.no_rekening || '-'}</div>
                      </div>
                    </CCol>

                    <CCol xs={12} md={6} className="ps-md-4">
                      {/* Right column: Explanation and reasons based on status */}
                      <div className="mb-3">
                        <strong>Penjelasan Permohonan:</strong>
                        <CFormTextarea
                          readOnly
                          value={detail.penjelasanpermohonan || 'Tidak ada penjelasan'}
                          rows={4}
                          className="mt-1"
                        />
                      </div>
                      {detail.status === 'bidang2' && (
                        <div className="mb-3">
                          <strong>Alasan Wakil Ketua Pelaksana:</strong>
                          <CFormTextarea
                            readOnly
                            value={detail.alasanpelaksana || 'Tidak ada alasan'}
                            rows={3}
                            className="mt-1"
                          />
                        </div>
                      )}
                      {detail.status === 'bidang3' && (
                        <>
                          <div className="mb-3">
                            <strong>Alasan Wakil Ketua Pelaksana:</strong>
                            <CFormTextarea
                              readOnly
                              value={detail.alasanpelaksana || 'Tidak ada alasan'}
                              rows={3}
                              className="mt-1"
                            />
                          </div>
                          <div className="mb-3">
                            <strong>Alasan Wakil Ketua Bidang 2:</strong>
                            <CFormTextarea
                              readOnly
                              value={detail.alasanbidang2 || 'Tidak ada alasan'}
                              rows={3}
                              className="mt-1"
                            />
                          </div>
                        </>
                      )}
                      {detail.status === 'baznas' && (
                        <>
                          <div className="mb-3">
                            <strong>Alasan Wakil Ketua Pelaksana:</strong>
                            <CFormTextarea
                              readOnly
                              value={detail.alasanpelaksana || 'Tidak ada alasan'}
                              rows={3}
                              className="mt-1"
                            />
                          </div>
                          <div className="mb-3">
                            <strong>Alesan Wakil Ketua Bidang 2:</strong>
                            <CFormTextarea
                              readOnly
                              value={detail.alasanbidang2 || 'Tidak ada alasan'}
                              rows={3}
                              className="mt-1"
                            />
                          </div>
                          <div className="mb-3">
                            <strong>Alasan Wakil Ketua Bidang 3:</strong>
                            <CFormTextarea
                              readOnly
                              value={detail.alasanbidang3 || 'Tidak ada alasan'}
                              rows={3}
                              className="mt-1"
                            />
                          </div>
                        </>
                      )}
                      {detail.status === 'selesai' && (
                        <>
                          <div className="mb-3">
                            <strong>Alasan Wakil Ketua Pelaksana:</strong>
                            <CFormTextarea
                              readOnly
                              value={detail.alasanpelaksanan || 'Tidak ada alasan'}
                              rows={3}
                              className="mt-1"
                            />
                          </div>
                          <div className="mb-3">
                            <strong>Alasan Wakil Ketua Bidang 2:</strong>
                            <CFormTextarea
                              readOnly
                              value={detail.alasanbidang2 || 'Tidak ada alasan'}
                              rows={3}
                              className="mt-1"
                            />
                          </div>
                          <div className="mb-3">
                            <strong>Alasan Wakil Ketua Bidang 3:</strong>
                            <CFormTextarea
                              readOnly
                              value={detail.alasanbidang3 || 'Tidak ada alasan'}
                              rows={3}
                              className="mt-1"
                            />
                          </div>
                          <div className="mb-3">
                            <strong>Alasan Ketua Baznas:</strong>
                            <CFormTextarea
                              readOnly
                              value={detail.alasanbaznas || 'Tidak ada alasan'}
                              rows={3}
                              className="mt-1"
                            />
                          </div>
                        </>
                      )}
                    </CCol>
                  </>
                )}
              </CRow>
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
  );
};


