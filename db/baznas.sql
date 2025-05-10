-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2025 at 12:18 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `baznas`
--

-- --------------------------------------------------------

--
-- Table structure for table `bantuan`
--

CREATE TABLE `bantuan` (
  `id` int(11) NOT NULL,
  `nama_bantuan` varchar(255) NOT NULL,
  `jenis_program` enum('Kemanusiaan','Kesehatan','Pendidikan','Ekonomi','Dakwah Dan Advokasi') NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bantuan`
--

INSERT INTO `bantuan` (`id`, `nama_bantuan`, `jenis_program`, `keterangan`, `created_at`) VALUES
(1, 'Lansia', 'Kesehatan', '', '2025-03-14 16:47:41'),
(2, 'DBU', 'Ekonomi', '', '2025-03-14 16:47:41'),
(3, 'Kebencanaan', 'Kemanusiaan', '', '2025-03-14 16:47:41'),
(4, 'Pendidikan', 'Pendidikan', '', '2025-03-14 16:47:41'),
(5, 'Hutang Rumah Sakit', 'Kesehatan', '', '2025-03-14 16:47:41'),
(19, 'Lomba Ngaji', 'Dakwah Dan Advokasi', '', '2025-05-08 08:23:16');

-- --------------------------------------------------------

--
-- Table structure for table `pengajuan_bantuan`
--

CREATE TABLE `pengajuan_bantuan` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `nik` char(16) NOT NULL,
  `no_kk` char(16) NOT NULL,
  `tempat_lahir` varchar(50) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `pekerjaan` varchar(100) NOT NULL,
  `alamat` text NOT NULL,
  `no_hp` varchar(20) NOT NULL,
  `nama_bank` varchar(50) NOT NULL,
  `no_rekening` varchar(50) NOT NULL,
  `nama_file` varchar(255) NOT NULL,
  `path_file` varchar(255) NOT NULL,
  `belum_pernah_menerima` tinyint(1) DEFAULT 0,
  `bantuan_id` int(11) NOT NULL,
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pengajuan_bantuan`
--

INSERT INTO `pengajuan_bantuan` (`id`, `user_id`, `full_name`, `nik`, `no_kk`, `tempat_lahir`, `tanggal_lahir`, `pekerjaan`, `alamat`, `no_hp`, `nama_bank`, `no_rekening`, `nama_file`, `path_file`, `belum_pernah_menerima`, `bantuan_id`, `submitted_at`) VALUES
(1, 2, 'zain', '3216065811880012', '3216065811880012', 'BANDUNG', '2025-05-09', 'mahasiswa', 'Perm Pondok Pratama II Blok B-9 RT 001 RW 022 Kel. Lubuk Buaya Kec Koto Tangah', '083815264318', 'bsi', '11111111', 'UTS SPKC [6SI-D] - Kurnia Ningsih - 2217020116.pdf', '1746775966034_399937850.pdf', 1, 3, '2025-05-09 07:32:46'),
(2, 2, 'zain', '1371106109780004', '1371106109780004', 'bandung', '2025-05-28', 'dasdas', 'Ampang KP. Jambak RT 001 RW 006 Kel. Ampang Kec. Kuranji', '082383807963', 'bsi', '11111111', 'UTS SPKC [6SI-D] - Kurnia Ningsih - 2217020116.pdf', '1746779529763_262042949.pdf', 1, 3, '2025-05-09 08:32:09'),
(3, 2, 'Zain Azmi', '3271050212050007', '3216065811880012', 'Uin Ib', '2025-05-22', 'mahasiswa', 'Ampang KP. Jambak RT 001 RW 006 Kel. Ampang Kec. Kuranji', '082383807963', 'BSI', '11111111', 'UTS SPKC [6SI-D] - Kurnia Ningsih - 2217020116.pdf', '1746806516055_707528316.pdf', 1, 3, '2025-05-09 16:01:56');

-- --------------------------------------------------------

--
-- Table structure for table `permohonan`
--

CREATE TABLE `permohonan` (
  `id` int(11) NOT NULL,
  `pengajuan_id` int(11) NOT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  `bantuan_id` varchar(36) DEFAULT NULL,
  `status` enum('baru','pelaksana','bidang2','bidang3','baznas','revisi','ditolak','selesai') DEFAULT 'baru',
  `jumlah_bantuan` int(11) NOT NULL DEFAULT 0,
  `penjelasanpermohonan` text NOT NULL,
  `alasanpelaksana` text NOT NULL,
  `alasanbidang2` text NOT NULL,
  `alasanbidang3` text NOT NULL,
  `alasanbaznas` text NOT NULL,
  `alasanrevisi` text NOT NULL,
  `alasan_penolakan` text DEFAULT NULL,
  `tanggal_pengajuan` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permohonan`
--

INSERT INTO `permohonan` (`id`, `pengajuan_id`, `user_id`, `bantuan_id`, `status`, `jumlah_bantuan`, `penjelasanpermohonan`, `alasanpelaksana`, `alasanbidang2`, `alasanbidang3`, `alasanbaznas`, `alasanrevisi`, `alasan_penolakan`, `tanggal_pengajuan`) VALUES
(36, 1, '2', '3', 'baru', 0, '', '', '', '', '', '', NULL, '2025-05-09 14:32:46'),
(37, 2, '2', '3', 'baru', 0, '', '', '', '', '', '', NULL, '2025-05-09 15:32:09'),
(38, 3, '2', '3', 'baru', 0, '', '', '', '', '', '', NULL, '2025-05-09 23:01:56');

-- --------------------------------------------------------

--
-- Table structure for table `persyaratan_tambahan`
--

CREATE TABLE `persyaratan_tambahan` (
  `id` int(11) NOT NULL,
  `bantuan_id` int(11) DEFAULT NULL,
  `nama_persyaratan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `persyaratan_tambahan`
--

INSERT INTO `persyaratan_tambahan` (`id`, `bantuan_id`, `nama_persyaratan`) VALUES
(2, 2, 'Rincian Anggaran Biaya'),
(3, 3, 'Fotokopi Rekening'),
(4, 3, 'Dokumentasi'),
(5, 4, 'Rincian Hutang'),
(6, 5, 'Surat Keterangan Sakit'),
(7, 5, 'Kwitansi Berobat'),
(8, 5, 'Rincian Hutang'),
(24, 1, 'Dokumentasi'),
(25, 19, 'Rincian Anggaran Biaya'),
(26, 19, 'Pernyataan Siap Memberikan Laporan');

-- --------------------------------------------------------

--
-- Table structure for table `persyaratan_umum`
--

CREATE TABLE `persyaratan_umum` (
  `id` int(11) NOT NULL,
  `bantuan_id` int(11) DEFAULT NULL,
  `nama_persyaratan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `persyaratan_umum`
--

INSERT INTO `persyaratan_umum` (`id`, `bantuan_id`, `nama_persyaratan`) VALUES
(8, 2, 'Surat Permohonan'),
(9, 2, 'Fotokopi KK'),
(10, 2, 'Fotokopi KTP'),
(11, 2, 'Surat Keterangan Tidak Mampu (asli)'),
(12, 2, 'Surat Keterangan Jamaah Masjid (asli)'),
(13, 2, 'Foto / Dokumentasi Rumah'),
(14, 2, 'Denah Rumah'),
(15, 3, 'Surat Permohonan'),
(16, 3, 'Fotokopi KK'),
(17, 3, 'Fotokopi KTP'),
(18, 3, 'Surat Keterangan Tidak Mampu (asli)'),
(19, 3, 'Surat Keterangan Jamaah Masjid (asli)'),
(20, 3, 'Foto / Dokumentasi Rumah'),
(21, 3, 'Denah Rumah'),
(22, 4, 'Surat Permohonan'),
(23, 4, 'Fotokopi KK'),
(24, 4, 'Fotokopi KTP'),
(25, 4, 'Surat Keterangan Tidak Mampu (asli)'),
(26, 4, 'Surat Keterangan Jamaah Masjid (asli)'),
(27, 4, 'Foto / Dokumentasi Rumah'),
(28, 4, 'Denah Rumah'),
(29, 5, 'Surat Permohonan'),
(30, 5, 'Fotokopi KK'),
(31, 5, 'Fotokopi KTP'),
(32, 5, 'Surat Keterangan Tidak Mampu (asli)'),
(33, 5, 'Surat Keterangan Jamaah Masjid (asli)'),
(34, 5, 'Foto / Dokumentasi Rumah'),
(35, 5, 'Denah Rumah'),
(155, 1, 'Surat Permohonan'),
(156, 1, 'Fotokopi KK'),
(157, 1, 'Fotokopi KTP'),
(158, 1, 'Surat Keterangan Tidak Mampu (asli)'),
(159, 1, 'Surat Keterangan Jamaah Masjid (asli)'),
(160, 1, 'Foto / Dokumentasi Rumah'),
(161, 1, 'Denah Rumah'),
(162, 19, 'Surat Permohonan'),
(163, 19, 'Fotokopi KK'),
(164, 19, 'Fotokopi KTP'),
(165, 19, 'Surat Keterangan Tidak Mampu (asli)'),
(166, 19, 'Surat Keterangan Jamaah Masjid (asli)'),
(167, 19, 'Foto / Dokumentasi Rumah'),
(168, 19, 'Denah Rumah');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password_hash` text NOT NULL,
  `role` enum('Admin','Pemohon','coba') NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `username`, `password_hash`, `role`, `phone`, `created_at`, `updated_at`) VALUES
(1, 'zain azmi', 'zain', 'zain', '$2b$10$Gu0CHjgW.VQ4tXqS.Et/3Oq2LAYfIeIQz81qJYvQxwteneRZCUM6i', 'Admin', '081234567890', '2025-02-17 03:10:50', '2025-03-11 10:45:57'),
(2, 'Baznas padang', 'baznas@gmail.com', 'Baznas', '$2b$10$QJoglsj3OIlXnD2qw8i7n.wSLkjZ6/OKWSwIh.vcc9ePGzMkvCsE2', 'Admin', '111111111111', '2025-03-07 04:48:59', '2025-05-09 16:15:56'),
(4, 'Zaky', NULL, 'zaky', '$2b$10$AkcuBp4uL8b7WQG5ILk7ZOyEyNSRU/yBGoiCMa9iOFHfGloAkd9xi', 'Pemohon', '123443211234', '2025-03-07 07:57:16', '2025-03-11 10:48:55'),
(6, 'pemohon1', NULL, 'pemohon', '$2b$10$gGoWC1yyiB5FyYU9zn2rFu6bRt4LzuYzpg6IILyj3jAfu0TB8B7xm', 'Admin', '123443211234', '2025-03-14 09:15:13', '2025-03-14 09:15:13'),
(7, 'Uin Ib', 'uin@gmail.com', '', '$2b$10$1VEcAObsbGKLVSA/sLcpB.NkZNHOEOJqdv7ZD/XHRB7988Qf7Cs/S', 'Admin', '123123123123', '2025-05-09 21:22:47', '2025-05-09 21:22:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bantuan`
--
ALTER TABLE `bantuan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pengajuan_bantuan`
--
ALTER TABLE `pengajuan_bantuan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permohonan`
--
ALTER TABLE `permohonan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `persyaratan_tambahan`
--
ALTER TABLE `persyaratan_tambahan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bantuan_id` (`bantuan_id`);

--
-- Indexes for table `persyaratan_umum`
--
ALTER TABLE `persyaratan_umum`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bantuan_id` (`bantuan_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bantuan`
--
ALTER TABLE `bantuan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `pengajuan_bantuan`
--
ALTER TABLE `pengajuan_bantuan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `permohonan`
--
ALTER TABLE `permohonan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `persyaratan_tambahan`
--
ALTER TABLE `persyaratan_tambahan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `persyaratan_umum`
--
ALTER TABLE `persyaratan_umum`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=169;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `persyaratan_tambahan`
--
ALTER TABLE `persyaratan_tambahan`
  ADD CONSTRAINT `persyaratan_tambahan_ibfk_1` FOREIGN KEY (`bantuan_id`) REFERENCES `bantuan` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `persyaratan_umum`
--
ALTER TABLE `persyaratan_umum`
  ADD CONSTRAINT `persyaratan_umum_ibfk_1` FOREIGN KEY (`bantuan_id`) REFERENCES `bantuan` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
