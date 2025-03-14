import React from 'react'
import { useState } from 'react'

import { ModalDetail } from './modalaksi'
export const TombolDetail = ({ id }) => {
  const [showModal, setShowModal] = useState(false)
  return <ModalDetail id={id} closeModal={() => setShowModal(false)} />
}
