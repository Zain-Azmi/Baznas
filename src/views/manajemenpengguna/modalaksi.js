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
  const [namaPengguna, setNamaPengguna] = useState('')
  const [rolePengguna, setRolePengguna] = useState('')
  const [nikPemohon, setNikPemohon] = useState('')
  const [noKkPemohon, setNoKkPemohon] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [tanggalLahir, setTanggalLahir] = useState('')
  const [hp, setHp] = useState('')

  const handleSubmit = async () => {
    try {
      const payload = {
        nama_pengguna: namaPengguna,
        role_pengguna: rolePengguna,
        nik_pemohon: rolePengguna === 'pemohon' ? nikPemohon : '',
        no_kk_pemohon: rolePengguna === 'pemohon' ? noKkPemohon : '',
        username: username,
        password: password,
        tanggal_lahir: rolePengguna === 'pemohon' ? tanggalLahir : '',
        hp: hp,
      }

      const response = await axios.post('http://localhost:5000/api/tambahpengguna', payload)
      console.log('Response:', response.data)
      alert('Pengguna berhasil ditambahkan!')

      setNamaPengguna('')
      setRolePengguna('')
      setNikPemohon('')
      setNoKkPemohon('')
      setUsername('')
      setPassword('')
      setTanggalLahir('')
      setHp('')
      ambildata()
      setVisible(false)
    } catch (error) {
      console.error('Gagal menambahkan pengguna:', error)
      alert('Gagal menambahkan pengguna')
    }
  }

  return (
    <>
      <CButton color="success" onClick={() => setVisible(!visible)}>
        <FontAwesomeIcon icon={faSquarePlus} /> Tambah Pengguna
      </CButton>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>Tambah Pengguna Baru</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <label>Nama Pengguna</label>
            <CFormInput
              type="text"
              placeholder="Masukkan Nama Pengguna"
              required
              value={namaPengguna}
              onChange={(e) => setNamaPengguna(e.target.value)}
            />
            <br />
            <label>Username Akun Pengguna</label>
            <CFormInput
              type="text"
              placeholder="Masukkan Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <label>Password Akun Pengguna</label>
            <CFormInput
              type="password"
              placeholder="Masukkan Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <label>No.HP Pengguna</label>
            <CFormInput
              type="tel"
              placeholder="Masukkan No.HP Pengguna"
              required
              value={hp}
              onChange={(e) => setHp(e.target.value)}
            />
            <br />
            <label>Role Pengguna</label>
            <CFormSelect
              aria-label="Default select example"
              required
              value={rolePengguna}
              onChange={(e) => setRolePengguna(e.target.value)}
            >
              <option value="">Pilih Role Pengguna</option>
              <option value="super_admin">Admin</option>
              <option value="pemohon">Pemohon</option>
            </CFormSelect>
            <br />
            {rolePengguna === 'pemohon' && (
              <>
                <label>NIK Pemohon</label>
                <CFormInput
                  type="text"
                  placeholder="Masukkan NIK Pemohon"
                  required
                  value={nikPemohon}
                  onChange={(e) => setNikPemohon(e.target.value)}
                />
                <br />
                <label>No.KK Pemohon</label>
                <CFormInput
                  type="text"
                  placeholder="Masukkan No.KK Pemohon"
                  required
                  value={noKkPemohon}
                  onChange={(e) => setNoKkPemohon(e.target.value)}
                />
                <br />
                <label>Tanggal Lahir Pemohon</label>
                <CFormInput
                  type="date"
                  required
                  value={tanggalLahir}
                  onChange={(e) => setTanggalLahir(e.target.value)}
                />
              </>
            )}
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

export const ModalHapus = ({ id, nama, ambildata }) => {
  const [visible, setVisible] = useState(false)

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/hapuspengguna/${id}`)
      alert('Pengguna berhasil dihapus!')
      setVisible(false)
      ambildata() // Refresh data di parent
    } catch (error) {
      console.error('Gagal menghapus pengguna:', error)
      alert('Gagal menghapus pengguna')
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
        aria-labelledby="modal-hapus-pengguna"
      >
        <CModalHeader>Konfirmasi Penghapusan</CModalHeader>
        <CModalBody>
          Yakin ingin menghapus pengguna <strong>{nama}</strong>?
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
  const [namaPengguna, setNamaPengguna] = useState('')
  const [rolePengguna, setRolePengguna] = useState('')
  const [nikPemohon, setNikPemohon] = useState('')
  const [noKkPemohon, setNoKkPemohon] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [tanggalLahir, setTanggalLahir] = useState('')
  const [hp, setHp] = useState('')

  // Fetch detail data ketika modal dibuka
  useEffect(() => {
    if (visible && id) {
      axios
        .get(`http://localhost:5000/api/detailpengguna/${id}`)
        .then((response) => {
          const detail = response.data[0]
          if (detail) {
            setNamaPengguna(detail.name)
            setRolePengguna(detail.role)
            setUsername(detail.username)
            setHp(detail.phone)
            // Hanya prefill data pemohon jika role-nya pemohon
            if (detail.role === 'pemohon') {
              setNikPemohon(detail.nik || '')
              setNoKkPemohon(detail.nokk || '')
              setTanggalLahir(detail.tanggallahir || '')
            }
          }
        })
        .catch((err) => {
          console.error('Gagal mengambil detail pengguna:', err)
        })
    }
  }, [visible, id])

  const handleSubmit = async () => {
    try {
      const payload = {
        name: namaPengguna,
        role: rolePengguna,
        username: username,
        // Hanya update password jika diisi, jika tidak, backend bisa mengabaikannya
        password: password,
        phone: hp,
        nik: rolePengguna === 'pemohon' ? nikPemohon : '',
        nokk: rolePengguna === 'pemohon' ? noKkPemohon : '',
        tanggallahir: rolePengguna === 'pemohon' ? tanggalLahir : '',
      }

      const response = await axios.put(`http://localhost:5000/api/editpengguna/${id}`, payload)
      console.log('Response:', response.data)
      alert('Pengguna berhasil diupdate!')
      ambildata() // Refresh data dari parent
      setVisible(false)
    } catch (error) {
      console.error('Gagal mengupdate pengguna:', error)
      alert('Gagal mengupdate pengguna')
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
          <CModalTitle id="modal-edit-title">Edit Pengguna</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <label>Nama Pengguna</label>
            <CFormInput
              type="text"
              placeholder="Masukkan Nama Pengguna"
              required
              value={namaPengguna}
              onChange={(e) => setNamaPengguna(e.target.value)}
            />
            <br />
            <label>Username</label>
            <CFormInput
              type="text"
              placeholder="Masukkan Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <label>Password</label>
            <CFormInput
              type="password"
              placeholder="Masukkan Password (kosongkan jika tidak ingin mengubah)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <label>No. HP</label>
            <CFormInput
              type="tel"
              placeholder="Masukkan No. HP"
              required
              value={hp}
              onChange={(e) => setHp(e.target.value)}
            />
            <br />
            <label>Role Pengguna</label>
            <CFormSelect
              aria-label="Default select example"
              required
              value={rolePengguna}
              onChange={(e) => setRolePengguna(e.target.value)}
            >
              <option value="">Pilih Role Pengguna</option>
              <option value="super_admin">Admin</option>
              <option value="pemohon">Pemohon</option>
            </CFormSelect>
            <br />
            {rolePengguna === 'pemohon' && (
              <>
                <label>NIK Pemohon</label>
                <CFormInput
                  type="text"
                  placeholder="Masukkan NIK Pemohon"
                  required
                  value={nikPemohon}
                  onChange={(e) => setNikPemohon(e.target.value)}
                />
                <br />
                <label>No. KK Pemohon</label>
                <CFormInput
                  type="text"
                  placeholder="Masukkan No. KK Pemohon"
                  required
                  value={noKkPemohon}
                  onChange={(e) => setNoKkPemohon(e.target.value)}
                />
                <br />
                <label>Tanggal Lahir</label>
                <CFormInput
                  type="date"
                  required
                  value={tanggalLahir}
                  onChange={(e) => setTanggalLahir(e.target.value)}
                />
              </>
            )}
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
