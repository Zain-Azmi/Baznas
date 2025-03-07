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
export const TombolTolak = () => {
  return <Modaltolak />
}
export const TombolDetail = ({ id }) => {
  const [showModal, setShowModal] = useState(false)
  return <ModalDetail id={id} closeModal={() => setShowModal(false)} />
}
