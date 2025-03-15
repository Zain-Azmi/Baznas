-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 15, 2025 at 08:07 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

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
  `id` int NOT NULL,
  `nama_bantuan` varchar(255) NOT NULL,
  `jenis_program` enum('Kemanusiaan','Kesehatan','Pendidikan','Ekonomi','Dakwah Dan Advokasi') NOT NULL,
  `keterangan` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `bantuan`
--

INSERT INTO `bantuan` (`id`, `nama_bantuan`, `jenis_program`, `keterangan`, `created_at`) VALUES
(1, 'Lansia', 'Kesehatan', '', '2025-03-14 16:47:41'),
(2, 'DBU', 'Ekonomi', '', '2025-03-14 16:47:41'),
(3, 'Kebencanaan', 'Kemanusiaan', '', '2025-03-14 16:47:41'),
(4, 'Pendidikan', 'Pendidikan', '', '2025-03-14 16:47:41'),
(5, 'Hutang Rumah Sakit', 'Kesehatan', '', '2025-03-14 16:47:41');

-- --------------------------------------------------------

--
-- Table structure for table `permohonan`
--

CREATE TABLE `permohonan` (
  `id` int NOT NULL,
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bantuan_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` enum('baru','pelaksana','bidang2','bidang3','baznas','revisi','ditolak','selesai') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'baru',
  `jumlah_bantuan` int NOT NULL DEFAULT '0',
  `penjelasanpermohonan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `alasanpelaksana` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `alasanbidang2` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `alasanbidang3` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `alasanbaznas` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `alasanrevisi` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `alasan_penolakan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `tanggal_pengajuan` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `permohonan`
--

INSERT INTO `permohonan` (`id`, `user_id`, `bantuan_id`, `status`, `jumlah_bantuan`, `penjelasanpermohonan`, `alasanpelaksana`, `alasanbidang2`, `alasanbidang3`, `alasanbaznas`, `alasanrevisi`, `alasan_penolakan`, `tanggal_pengajuan`) VALUES
(1, '1', '1', 'baru', 1000000, 'Pengajuan bantuan untuk keperluan medis', '', '', '', '', '', NULL, '2025-03-01 23:44:09'),
(2, '1', '1', 'baru', 500000, 'Permohonan bantuan biaya pendidikan', '', '', '', '', '', NULL, '2025-03-01 23:44:09'),
(3, '1', '1', 'baru', 750000, 'Pengajuan bantuan usaha kecil', '', '', '', '', '', NULL, '2025-03-01 23:44:09'),
(4, '1', '1', 'baru', 2000000, 'Permohonan bantuan renovasi rumah', '', '', '', '', '', NULL, '2025-03-01 23:44:09'),
(5, '1', '1', 'baru', 1200000, 'Pengajuan bantuan sosial', '', '', '', '', '', NULL, '2025-03-01 23:44:09'),
(6, '1', '1', 'pelaksana', 1000000, 'Pengajuan bantuan untuk keperluan medis', 'Diverifikasi oleh pelaksana', '', '', '', '', NULL, '2025-03-01 23:44:09'),
(7, '1', '1', 'pelaksana', 500000, 'Permohonan bantuan biaya pendidikan', 'Diverifikasi oleh pelaksana', '', '', '', '', NULL, '2025-03-01 23:44:09'),
(8, '1', '1', 'pelaksana', 750000, 'Pengajuan bantuan usaha kecil', 'Diverifikasi oleh pelaksana', '', '', '', '', NULL, '2025-03-01 23:44:09'),
(9, '1', '1', 'pelaksana', 2000000, 'Permohonan bantuan renovasi rumah', 'Diverifikasi oleh pelaksana', '', '', '', '', NULL, '2025-03-01 23:44:09'),
(10, '1', '1', 'pelaksana', 500000, 'berdasarkan rkat 123141 jumlah max rp 500.000', 'Diverifikasi oleh pelaksana', '', '', '', '', NULL, '2025-03-01 23:44:09'),
(11, '1', '1', 'bidang2', 1000000, 'Pengajuan bantuan untuk keperluan medis', 'Diverifikasi oleh pelaksana', 'Diverifikasi oleh bidang2', '', '', '', NULL, '2025-03-01 23:44:09'),
(12, '1', '1', 'bidang2', 500000, 'Permohonan bantuan biaya pendidikan', 'Diverifikasi oleh pelaksana', 'Diverifikasi oleh bidang2', '', '', '', NULL, '2025-03-01 23:44:09'),
(13, '1', '1', 'bidang2', 750000, 'Pengajuan bantuan usaha kecil', 'Diverifikasi oleh pelaksana', 'Diverifikasi oleh bidang2', '', '', '', NULL, '2025-03-01 23:44:09'),
(14, '1', '1', 'bidang2', 2000000, 'Permohonan bantuan renovasi rumah', 'Diverifikasi oleh pelaksana', 'Diverifikasi oleh bidang2', '', '', '', NULL, '2025-03-01 23:44:09'),
(15, '1', '1', 'bidang2', 1200000, 'Pengajuan bantuan sosial', 'Diverifikasi oleh pelaksana', 'Diverifikasi oleh bidang2', '', '', '', NULL, '2025-03-01 23:44:09'),
(16, '1', '1', 'bidang3', 1000000, 'Bantuan medis', 'Diverifikasi pelaksana', 'Diverifikasi bidang2', 'Diverifikasi bidang3', '', '', NULL, '2025-03-02 00:34:22'),
(17, '1', '1', 'bidang3', 500000, 'Bantuan pendidikan', 'Diverifikasi pelaksana', 'Diverifikasi bidang2', 'Diverifikasi bidang3', '', '', NULL, '2025-03-02 00:34:22'),
(18, '1', '1', 'bidang3', 750000, 'Bantuan usaha', 'Diverifikasi pelaksana', 'Diverifikasi bidang2', 'Diverifikasi bidang3', '', '', NULL, '2025-03-02 00:34:22'),
(19, '1', '1', 'bidang3', 2000000, 'Bantuan renovasi rumah', 'Diverifikasi pelaksana', 'Diverifikasi bidang2', 'Diverifikasi bidang3', '', '', NULL, '2025-03-02 00:34:22'),
(20, '1', '1', 'bidang3', 1200000, 'Bantuan sosial', 'Diverifikasi pelaksana', 'Diverifikasi bidang2', 'Diverifikasi bidang3', '', '', NULL, '2025-03-02 00:34:22'),
(21, '1', '1', 'baznas', 1000000, 'Bantuan medis', 'Diverifikasi pelaksana', 'Diverifikasi bidang2', 'Diverifikasi bidang3', 'Diverifikasi baznas', '', NULL, '2025-03-02 00:34:22'),
(22, '1', '1', 'baznas', 500000, 'Bantuan pendidikan', 'Diverifikasi pelaksana', 'Diverifikasi bidang2', 'Diverifikasi bidang3', 'Diverifikasi baznas', '', NULL, '2025-03-02 00:34:22'),
(23, '1', '1', 'baznas', 750000, 'Bantuan usaha', 'Diverifikasi pelaksana', 'Diverifikasi bidang2', 'Diverifikasi bidang3', 'Diverifikasi baznas', '', NULL, '2025-03-02 00:34:22'),
(24, '1', '1', 'baznas', 2000000, 'Bantuan renovasi rumah', 'Diverifikasi pelaksana', 'Diverifikasi bidang2', 'Diverifikasi bidang3', 'Diverifikasi baznas', '', NULL, '2025-03-02 00:34:22'),
(25, '1', '1', 'selesai', 1200000, 'Bantuan sosial', 'Diverifikasi pelaksana', 'Diverifikasi bidang2', 'Diverifikasi bidang3', 'bantuan disetujui', '', NULL, '2025-03-02 00:34:22'),
(26, '1', '1', 'revisi', 1000000, 'Bantuan medis', '', '', '', '', 'Dokumen tidak lengkap', NULL, '2025-03-02 00:34:22'),
(27, '1', '1', 'revisi', 500000, 'Bantuan pendidikan', '', '', '', '', 'Formulir belum ditandatangani', NULL, '2025-03-02 00:34:22'),
(28, '1', '1', 'revisi', 750000, 'Bantuan usaha', '', '', '', '', 'Bukti usaha kurang jelas', NULL, '2025-03-02 00:34:22'),
(29, '1', '1', 'revisi', 2000000, 'Bantuan renovasi rumah', '', '', '', '', 'Foto rumah tidak sesuai', NULL, '2025-03-02 00:34:22'),
(30, '1', '1', 'revisi', 1200000, 'Bantuan sosial', '', '', '', '', 'KTP belum valid', NULL, '2025-03-02 00:34:22'),
(31, '1', '1', 'ditolak', 1000000, 'Bantuan medis', '', '', '', '', '', 'Tidak memenuhi syarat', '2025-03-02 00:34:22'),
(32, '1', '1', 'ditolak', 500000, 'Bantuan pendidikan', '', '', '', '', '', 'Penghasilan melebihi batas', '2025-03-02 00:34:22'),
(33, '1', '1', 'ditolak', 750000, 'Bantuan usaha', '', '', '', '', '', 'Kurang bukti usaha', '2025-03-02 00:34:22'),
(34, '1', '1', 'ditolak', 2000000, 'Bantuan renovasi rumah', '', '', '', '', '', 'Dokumen tidak valid', '2025-03-02 00:34:22'),
(35, '1', '1', 'ditolak', 1200000, 'Bantuan sosial', '', '', '', '', '', 'Sudah pernah menerima bantuan', '2025-03-02 00:34:22');

-- --------------------------------------------------------

--
-- Table structure for table `persyaratan_tambahan`
--

CREATE TABLE `persyaratan_tambahan` (
  `id` int NOT NULL,
  `bantuan_id` int DEFAULT NULL,
  `nama_persyaratan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(24, 1, 'Dokumentasi');

-- --------------------------------------------------------

--
-- Table structure for table `persyaratan_umum`
--

CREATE TABLE `persyaratan_umum` (
  `id` int NOT NULL,
  `bantuan_id` int DEFAULT NULL,
  `nama_persyaratan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(161, 1, 'Denah Rumah');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `nik` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nokk` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tanggallahir` date DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password_hash` text COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('Admin','Pemohon','coba') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `nik`, `nokk`, `tanggallahir`, `email`, `username`, `password_hash`, `role`, `phone`, `created_at`, `updated_at`) VALUES
(1, 'zain azmi', NULL, NULL, NULL, 'zain', 'zain', '$2b$10$Gu0CHjgW.VQ4tXqS.Et/3Oq2LAYfIeIQz81qJYvQxwteneRZCUM6i', 'Admin', '081234567890', '2025-02-17 03:10:50', '2025-03-11 10:45:57'),
(2, 'Baznas', NULL, NULL, NULL, NULL, 'Baznas', '$2b$10$PY7rs1u5FMvJshSrYQOhjO9Cf7J99qg.xai2hk1nF46TIFo398Fdy', 'Admin', '083172228453', '2025-03-07 04:48:59', '2025-03-11 10:45:57'),
(4, 'Zaky', NULL, NULL, NULL, NULL, 'zaky', '$2b$10$AkcuBp4uL8b7WQG5ILk7ZOyEyNSRU/yBGoiCMa9iOFHfGloAkd9xi', 'Pemohon', '123443211234', '2025-03-07 07:57:16', '2025-03-11 10:48:55'),
(6, 'pemohon1', NULL, NULL, NULL, NULL, 'pemohon', '$2b$10$gGoWC1yyiB5FyYU9zn2rFu6bRt4LzuYzpg6IILyj3jAfu0TB8B7xm', 'Admin', '123443211234', '2025-03-14 09:15:13', '2025-03-14 09:15:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bantuan`
--
ALTER TABLE `bantuan`
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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `permohonan`
--
ALTER TABLE `permohonan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `persyaratan_tambahan`
--
ALTER TABLE `persyaratan_tambahan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `persyaratan_umum`
--
ALTER TABLE `persyaratan_umum`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=162;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
