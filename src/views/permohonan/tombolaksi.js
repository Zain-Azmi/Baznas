import React from 'react'
import { useState } from 'react'

import { Modalsetuju, Modaltolak, ModalDetail } from './modalaksi'
export const TombolSetuju = ({ id, databaru, jumlah }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <Modalsetuju
      id={id}
      datareload={databaru}
      jumlahlama={jumlah}
      closeModal={() => setShowModal(false)}
    />
  )
}
export const TombolTolak = ({ id, databaru }) => {
  const [showModal, setShowModal] = useState(false)
  return <Modaltolak id={id} datareload={databaru} closeModal={() => setShowModal(false)} />
}
export const TombolDetail = ({ id }) => {
  const [showModal, setShowModal] = useState(false)
  return <ModalDetail id={id} closeModal={() => setShowModal(false)} />
}
