import React from 'react'
import { useState } from 'react'
import { CButton } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

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


const DownloadButton = ({ namafile }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    
    try {
      const response = await fetch(`http://localhost:8080/api/files/${namafile}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = namafile;  // Menggunakan nama file dari props
        link.click();
      } else {
        console.error('File tidak ditemukan');
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat mendownload file:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CButton
      color="secondary"
      onClick={handleDownload}
      disabled={loading}
    >
      {loading ? 'Loading...' : <FontAwesomeIcon icon={faDownload} />}
    </CButton>
  );
};

export default DownloadButton;
