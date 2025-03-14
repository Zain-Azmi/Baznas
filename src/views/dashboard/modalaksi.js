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
} from '@coreui/react'
import { faXmark, faCheck, faEye } from '@fortawesome/free-solid-svg-icons'
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
