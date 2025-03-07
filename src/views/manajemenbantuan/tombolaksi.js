import React from 'react'
import { useState } from 'react'

import { ModalTambah, ModalHapus, ModalDetail, ModalEdit } from './modalaksi'
export const TombolTambah = ({ ambildata }) => {
  const [showModal, setShowModal] = useState(false)
  return <ModalTambah ambildata={ambildata} closeModal={() => setShowModal(false)} />
}
export const TombolTolak = ({ bantuan, ambildata }) => {
  return <ModalHapus bantuan={bantuan} ambildata={ambildata} />
}
export const TombolDetail = ({ id }) => {
  const [showModal, setShowModal] = useState(false)
  return <ModalDetail id={id} closeModal={() => setShowModal(false)} />
}
export const TombolEdit = ({ id, ambildata }) => {
  const [showModal, setShowModal] = useState(false)
  return <ModalEdit id={id} ambildata={ambildata} closeModal={() => setShowModal(false)} />
}
