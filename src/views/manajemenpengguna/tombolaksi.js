import React from 'react'
import { useState } from 'react'

import { ModalTambah, ModalHapus, ModalEdit } from './modalaksi'
export const TombolTambah = ({ ambildata }) => {
  const [showModal, setShowModal] = useState(false)
  return <ModalTambah ambildata={ambildata} closeModal={() => setShowModal(false)} />
}
export const TombolTolak = ({ id, nama, ambildata }) => {
  return <ModalHapus id={id} nama={nama} ambildata={ambildata} />
}
export const TombolEdit = ({ id, ambildata }) => {
  const [showModal, setShowModal] = useState(false)
  return <ModalEdit id={id} ambildata={ambildata} closeModal={() => setShowModal(false)} />
}
