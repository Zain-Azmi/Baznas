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
import Swal from 'sweetalert2'

import { faTrash, faSquarePlus, faEye, faEdit } from '@fortawesome/free-solid-svg-icons'
export const ModalTambah = ({ ambildata }) => {
  const [visible, setVisible] = useState(false)
  const [namaPengguna, setNamaPengguna] = useState('')
  const [rolePengguna, setRolePengguna] = useState('')
  const [EmailPemohon, setEmailPemohon] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [hp, setHp] = useState('')

  const handleSubmit = async () => {
    try {
      const payload = {
        nama_pengguna: namaPengguna,
        role_pengguna: rolePengguna,
        Emailpemohon: rolePengguna === 'Pemohon' ? EmailPemohon : '',
        username: username,
        password: password,
        hp: hp,
      }

      const response = await axios.post('http://localhost:5000/api/tambahpengguna', payload)
      console.log('Response:', response.data)
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Pengguna berhasil ditambahkan!',
      })

      // Reset form
      setNamaPengguna('')
      setRolePengguna('')
      setEmailPemohon('')
      setUsername('')
      setPassword('')
      setHp('')

      ambildata && ambildata()
      setVisible(false)
    } catch (error) {
      console.error('Gagal menambahkan pengguna:', error)
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Gagal menambahkan pengguna',
      })
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
              <option value="Admin">Admin</option>
              <option value="Pemohon">Pemohon</option>
            </CFormSelect>
            <br />
            {rolePengguna === 'Pemohon' && (
              <>
                <label>Email Pemohon</label>
                <CFormInput
                  type="email"
                  placeholder="Masukkan Email Pemohon"
                  required
                  value={EmailPemohon}
                  onChange={(e) => setEmailPemohon(e.target.value)}
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
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Pengguna berhasil dihapus!',
      })
      setVisible(false)
      ambildata() // Refresh data di parent
    } catch (error) {
      console.error('Gagal menghapus pengguna:', error)
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Gagal menghapus pengguna',
      })
    }
  }

  return (
    <>
      <CButton color="danger" onClick={() => setVisible(true)}>
        <FontAwesomeIcon icon={faTrash} />
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


export const ModalEdit = ({ id, ambildata }) => {
  const [visible, setVisible] = useState(false)
  const [namaPengguna, setNamaPengguna] = useState('')
  const [rolePengguna, setRolePengguna] = useState('')
  const [EmailPemohon, setEmailPemohon] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
            if (detail.role === 'Pemohon') {
              setEmailPemohon(detail.email || '')
            }
          }
        })
        .catch((err) => {
          console.error('Gagal mengambil detail pengguna:', err)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Gagal mengambil detail pengguna',
          })
        })
    }
  }, [visible, id])

  const handleSubmit = async () => {
    try {
      const payload = {
        name: namaPengguna,
        role: rolePengguna,
        username: username,
        password: password,
        phone: hp,
        email: rolePengguna === 'Pemohon' ? EmailPemohon : '',
      }

      const response = await axios.put(`http://localhost:5000/api/editpengguna/${id}`, payload)
      console.log('Response:', response.data)
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Pengguna berhasil diupdate!',
      })
      ambildata() // Refresh data dari parent
      setVisible(false)
    } catch (error) {
      console.error('Gagal mengupdate pengguna:', error)
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Gagal mengupdate pengguna',
      })
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
              <option value="Admin">Admin</option>
              <option value="Pemohon">Pemohon</option>
            </CFormSelect>
            <br />
            {rolePengguna === 'Pemohon' && (
              <>
                <label>Email Pemohon</label>
                <CFormInput
                  type="email"
                  placeholder="Masukkan Email Pemohon"
                  required
                  value={EmailPemohon}
                  onChange={(e) => setEmailPemohon(e.target.value)}
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
