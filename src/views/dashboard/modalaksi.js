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
  CRow,
  CCol,
} from '@coreui/react'
import { faXmark, faCheck, faEye } from '@fortawesome/free-solid-svg-icons'
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
