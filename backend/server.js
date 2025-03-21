const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

// Koneksi ke database MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err)
  } else {
    console.log('Connected to MySQL database')
  }
})

// API Untuk Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body

  // Cari user berdasarkan username
  const query = 'SELECT * FROM users WHERE username = ?'
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err })
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Username atau password salah' })
    }

    const user = results[0]

    // Bandingkan password yang diinput dengan hash yang tersimpan
    bcrypt.compare(password, user.password_hash, (compareErr, isMatch) => {
      if (compareErr) {
        return res.status(500).json({ message: 'Error comparing passwords', error: compareErr })
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Username atau password salah' })
      }

      // Buat token JWT jika password cocok
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      })

      res.json({ token, user: { id: user.id, username: user.username, name: user.name } })
    })
  })
})

// API Untuk Tabel data permohonan
app.get('/api/tabelpermohonan', (req, res) => {
  const query = `
SELECT 
    p.*, 
    u.name AS nama_user, 
    b.nama_bantuan AS jenis_bantuan, 
    u.phone AS no_hp, 
    DATE_FORMAT(p.tanggal_pengajuan, '%d-%m-%Y') AS tanggal_pengajuanformat
FROM permohonan p
JOIN users u ON p.user_id = u.id
JOIN bantuan b ON p.bantuan_id = b.id;  `

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json(results)
  })
})
const port = process.env.NODE_PORT || 5000

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

app.get('/', (req, res) => {
  res.send('Backend is running!')
})

app.put('/api/permohonan/:id', (req, res) => {
  const { id } = req.params
  const { jumlah, alasan } = req.body

  // Ambil status permohonan saat ini dari database
  const getStatusQuery = 'SELECT status FROM permohonan WHERE id = ?'

  db.query(getStatusQuery, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error saat mengambil status' })
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Permohonan tidak ditemukan' })
    }

    const currentStatus = results[0].status
    let updateQuery = ''
    let updateParams = []

    // Tentukan query berdasarkan status saat ini
    switch (currentStatus) {
      case 'baru':
        updateQuery =
          "UPDATE permohonan SET jumlah_bantuan = ?, penjelasanpermohonan = ?, status = 'pelaksana' WHERE id = ?"
        updateParams = [jumlah, alasan, id]
        break
      case 'pelaksana':
        updateQuery =
          "UPDATE permohonan SET jumlah_bantuan = ?, alasanpelaksana = ?, status = 'bidang2' WHERE id = ?"
        updateParams = [jumlah, alasan, id]
        break
      case 'bidang2':
        updateQuery =
          "UPDATE permohonan SET jumlah_bantuan = ?, alasanbidang2 = ?, status = 'bidang3' WHERE id = ?"
        updateParams = [jumlah, alasan, id]
        break
      case 'bidang3':
        updateQuery =
          "UPDATE permohonan SET jumlah_bantuan = ?, alasanbidang3 = ?, status = 'baznas' WHERE id = ?"
        updateParams = [jumlah, alasan, id]
        break
      case 'baznas':
        updateQuery =
          "UPDATE permohonan SET jumlah_bantuan = ?, alasanbaznas = ?, status = 'selesai' WHERE id = ?"
        updateParams = [jumlah, alasan, id]
        break
      case 'revisi':
        updateQuery = "UPDATE permohonan SET alasanrevisi = ?, status = 'revisi' WHERE id = ?"
        updateParams = [alasan, id]
        break
      case 'ditolak':
        updateQuery = "UPDATE permohonan SET alasan_penolakan = ?, status = 'ditolak' WHERE id = ?"
        updateParams = [alasan, id]
        break
      default:
        return res.status(400).json({ error: 'Status tidak valid atau sudah selesai' })
    }

    // Jalankan query update
    db.query(updateQuery, updateParams, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      res.json({ message: `Status berhasil diperbarui menjadi ${currentStatus}` })
    })
  })
})

app.get('/api/detailpermohonan/:id', (req, res) => {
  const { id } = req.params
  const query = `
SELECT 
    p.*, 
    u.name AS nama_user, 
    b.nama_bantuan AS jenis_bantuan, 
    u.phone AS no_hp, 
    DATE_FORMAT(p.tanggal_pengajuan, '%d-%m-%Y') AS tanggal_pengajuanformat
FROM permohonan p
JOIN users u ON p.user_id = u.id
JOIN bantuan b ON p.bantuan_id = b.id
WHERE p.id = ? ;
`
  queryParams = [id]

  db.query(query, queryParams, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json(results)
  })
})
// Endpoint GET /bantuan untuk mengambil daftar bantuan
app.get('/api/bantuan', (req, res) => {
  const sql = 'SELECT * FROM bantuan'
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json(results)
  })
})
// Endpoint untuk menambahkan bantuan baru
app.post('/api/tambahbantuan', (req, res) => {
  const { nama_bantuan, jenis_program, keterangan, persyaratan_umum, persyaratan_tambahan } =
    req.body

  const sqlBantuan =
    'INSERT INTO bantuan (nama_bantuan, jenis_program, keterangan) VALUES (?, ?, ?)'
  db.query(sqlBantuan, [nama_bantuan, jenis_program, keterangan], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })

    const bantuanId = result.insertId

    // Menyimpan persyaratan umum
    const sqlPersyaratanUmum =
      'INSERT INTO persyaratan_umum (bantuan_id, nama_persyaratan) VALUES ?'
    const valuesPersyaratanUmum = persyaratan_umum.map((item) => [bantuanId, item])
    if (valuesPersyaratanUmum.length > 0) {
      db.query(sqlPersyaratanUmum, [valuesPersyaratanUmum], (err) => {
        if (err) console.error('Gagal menyimpan persyaratan umum:', err)
      })
    }

    // Menyimpan persyaratan tambahan
    const sqlPersyaratanTambahan =
      'INSERT INTO persyaratan_tambahan (bantuan_id, nama_persyaratan) VALUES ?'
    const valuesPersyaratanTambahan = persyaratan_tambahan.map((item) => [bantuanId, item])
    if (valuesPersyaratanTambahan.length > 0) {
      db.query(sqlPersyaratanTambahan, [valuesPersyaratanTambahan], (err) => {
        if (err) console.error('Gagal menyimpan persyaratan tambahan:', err)
      })
    }

    res.status(201).json({ message: 'Bantuan berhasil ditambahkan', bantuan_id: bantuanId })
  })
})
// Endpoint DELETE untuk menghapus bantuan berdasarkan ID
app.delete('/api/hapusbantuan/:id', (req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM bantuan WHERE id = ?'
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error menghapus data:', err)
      return res.status(500).json({ error: err.message })
    }
    // Jika data tidak ditemukan atau tidak terhapus, Anda bisa memeriksanya dengan result.affectedRows
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Bantuan tidak ditemukan' })
    }
    res.json({ message: 'Bantuan berhasil dihapus', bantuan_id: id })
  })
})
// Endpoint untuk mengambil detail bantuan beserta persyaratan umum dan tambahan
app.get('/api/detailbantuan/:id', (req, res) => {
  const { id } = req.params

  // Query untuk mengambil data bantuan
  const sqlBantuan = 'SELECT * FROM bantuan WHERE id = ?'
  db.query(sqlBantuan, [id], (err, resultsBantuan) => {
    if (err) {
      console.error('Error mengambil data bantuan:', err)
      return res.status(500).json({ error: err.message })
    }
    if (resultsBantuan.length === 0) {
      return res.status(404).json({ message: 'Bantuan tidak ditemukan' })
    }
    const bantuan = resultsBantuan[0]

    // Query untuk mengambil persyaratan umum terkait bantuan
    const sqlUmum = 'SELECT nama_persyaratan FROM persyaratan_umum WHERE bantuan_id = ?'
    db.query(sqlUmum, [id], (err, resultsUmum) => {
      if (err) {
        console.error('Error mengambil persyaratan umum:', err)
        return res.status(500).json({ error: err.message })
      }

      // Query untuk mengambil persyaratan tambahan terkait bantuan
      const sqlTambahan = 'SELECT nama_persyaratan FROM persyaratan_tambahan WHERE bantuan_id = ?'
      db.query(sqlTambahan, [id], (err, resultsTambahan) => {
        if (err) {
          console.error('Error mengambil persyaratan tambahan:', err)
          return res.status(500).json({ error: err.message })
        }

        // Buat objek detail dengan menggabungkan data dari ketiga query
        const detail = {
          id: bantuan.id,
          nama_bantuan: bantuan.nama_bantuan,
          jenis_program: bantuan.jenis_program,
          keterangan: bantuan.keterangan,
          persyaratan_umum: resultsUmum.map((row) => row.nama_persyaratan),
          persyaratan_tambahan: resultsTambahan.map((row) => row.nama_persyaratan),
        }

        res.json([detail]) // Mengembalikan data sebagai array
      })
    })
  })
})
app.get('/api/detaileditbantuan/:id', (req, res) => {
  const { id } = req.params

  // Ambil data utama dari tabel bantuan
  const sqlBantuan = 'SELECT * FROM bantuan WHERE id = ?'
  db.query(sqlBantuan, [id], (err, resultsBantuan) => {
    if (err) {
      console.error('Error mengambil data bantuan:', err)
      return res.status(500).json({ error: err.message })
    }
    if (resultsBantuan.length === 0) {
      return res.status(404).json({ message: 'Bantuan tidak ditemukan' })
    }
    const bantuan = resultsBantuan[0]

    // Ambil data persyaratan umum yang terkait
    const sqlUmum = 'SELECT nama_persyaratan FROM persyaratan_umum WHERE bantuan_id = ?'
    db.query(sqlUmum, [id], (err, resultsUmum) => {
      if (err) {
        console.error('Error mengambil persyaratan umum:', err)
        return res.status(500).json({ error: err.message })
      }

      // Ambil data persyaratan tambahan yang terkait
      const sqlTambahan = 'SELECT nama_persyaratan FROM persyaratan_tambahan WHERE bantuan_id = ?'
      db.query(sqlTambahan, [id], (err, resultsTambahan) => {
        if (err) {
          console.error('Error mengambil persyaratan tambahan:', err)
          return res.status(500).json({ error: err.message })
        }

        // Gabungkan data menjadi satu objek detail
        const detail = {
          id: bantuan.id,
          nama_bantuan: bantuan.nama_bantuan,
          jenis_program: bantuan.jenis_program,
          keterangan: bantuan.keterangan,
          persyaratan_umum: resultsUmum.map((row) => row.nama_persyaratan),
          persyaratan_tambahan: resultsTambahan.map((row) => row.nama_persyaratan),
        }

        res.json([detail]) // Mengembalikan data sebagai array
      })
    })
  })
})
app.put('/api/editbantuan/:id', (req, res) => {
  const { id } = req.params
  const {
    nama_bantuan,
    jenis_program,
    keterangan,
    persyaratan_umum, // Array of string, misalnya: ["Surat Permohonan", "Fotokopi KK", ...]
    persyaratan_tambahan, // Array of string, misalnya: ["Fotokopi Kepemilikan Tanah", "Dokumentasi", ...]
  } = req.body

  // Mulai transaksi
  db.beginTransaction((err) => {
    if (err) return res.status(500).json({ error: err.message })

    // 1. Update data utama di tabel bantuan
    const sqlUpdate =
      'UPDATE bantuan SET nama_bantuan = ?, jenis_program = ?, keterangan = ? WHERE id = ?'
    db.query(sqlUpdate, [nama_bantuan, jenis_program, keterangan, id], (err, result) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).json({ error: err.message })
        })
      }

      // 2. Hapus data persyaratan lama dari tabel persyaratan_umum
      const sqlDeleteUmum = 'DELETE FROM persyaratan_umum WHERE bantuan_id = ?'
      db.query(sqlDeleteUmum, [id], (err, result) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ error: err.message })
          })
        }

        // Hapus data persyaratan lama dari tabel persyaratan_tambahan
        const sqlDeleteTambahan = 'DELETE FROM persyaratan_tambahan WHERE bantuan_id = ?'
        db.query(sqlDeleteTambahan, [id], (err, result) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ error: err.message })
            })
          }

          // 3. Insert data baru persyaratan_umum (jika ada)
          const insertUmum = () => {
            if (persyaratan_umum && persyaratan_umum.length > 0) {
              const valuesUmum = persyaratan_umum.map((item) => [id, item])
              const sqlInsertUmum =
                'INSERT INTO persyaratan_umum (bantuan_id, nama_persyaratan) VALUES ?'
              return new Promise((resolve, reject) => {
                db.query(sqlInsertUmum, [valuesUmum], (err, result) => {
                  if (err) return reject(err)
                  resolve()
                })
              })
            } else {
              return Promise.resolve()
            }
          }

          // 4. Insert data baru persyaratan_tambahan (jika ada)
          const insertTambahan = () => {
            if (persyaratan_tambahan && persyaratan_tambahan.length > 0) {
              const valuesTambahan = persyaratan_tambahan.map((item) => [id, item])
              const sqlInsertTambahan =
                'INSERT INTO persyaratan_tambahan (bantuan_id, nama_persyaratan) VALUES ?'
              return new Promise((resolve, reject) => {
                db.query(sqlInsertTambahan, [valuesTambahan], (err, result) => {
                  if (err) return reject(err)
                  resolve()
                })
              })
            } else {
              return Promise.resolve()
            }
          }

          // Eksekusi kedua insert secara berurutan
          insertUmum()
            .then(() => insertTambahan())
            .then(() => {
              // Commit transaksi setelah semua operasi berhasil
              db.commit((err) => {
                if (err) {
                  return db.rollback(() => {
                    res.status(500).json({ error: err.message })
                  })
                }
                res.json({ message: 'Bantuan berhasil diupdate', bantuan_id: id })
              })
            })
            .catch((err) => {
              db.rollback(() => {
                res.status(500).json({ error: err.message })
              })
            })
        })
      })
    })
  })
})
app.get('/api/pengguna', (req, res) => {
  const sql = 'SELECT id, name, role, phone FROM users'
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Gagal mengambil data pengguna:', err)
      return res.status(500).json({ message: 'Gagal mengambil data pengguna' })
    }
    res.json(results)
  })
})
const bcrypt = require('bcrypt')
const saltRounds = 10

app.post('/api/tambahpengguna', (req, res) => {
  const {
    nama_pengguna,
    role_pengguna,
    nik_pemohon,
    no_kk_pemohon,
    username,
    password,
    tanggal_lahir,
    hp,
  } = req.body

  // Hash password terlebih dahulu
  bcrypt.hash(password, saltRounds, (hashErr, hash) => {
    if (hashErr) {
      console.error('Gagal meng-hash password:', hashErr)
      return res.status(500).json({ message: 'Gagal meng-hash password' })
    }

    // Query SQL untuk insert data dengan password yang sudah di-hash
    const sql = `INSERT INTO users (name, role, nik, nokk, username, password_hash, tanggallahir, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

    db.query(
      sql,
      [
        nama_pengguna,
        role_pengguna,
        nik_pemohon || null,
        no_kk_pemohon || null,
        username,
        hash,
        tanggal_lahir || null,
        hp,
      ],
      (err, result) => {
        if (err) {
          console.error('Gagal menambahkan pengguna:', err)
          return res.status(500).json({ message: 'Gagal menambahkan pengguna' })
        }
        res.json({ message: 'Pengguna berhasil ditambahkan', userId: result.insertId })
      },
    )
  })
})

app.put('/api/editpengguna/:id', (req, res) => {
  const { id } = req.params
  const { name, role, username, password, phone, nik, nokk, tanggallahir } = req.body

  // Fungsi untuk menjalankan query update
  const runQuery = (passwordHash = null) => {
    let sql, values
    if (passwordHash) {
      sql = `
        UPDATE users 
        SET name = ?, role = ?, username = ?, password_hash = ?, phone = ?, nik = ?, nokk = ?, tanggallahir = ?
        WHERE id = ?
      `
      values = [
        name,
        role,
        username,
        passwordHash,
        phone,
        role === 'pemohon' ? nik : null,
        role === 'pemohon' ? nokk : null,
        role === 'pemohon' ? tanggallahir : null,
        id,
      ]
    } else {
      sql = `
        UPDATE users 
        SET name = ?, role = ?, username = ?, phone = ?, nik = ?, nokk = ?, tanggallahir = ?
        WHERE id = ?
      `
      values = [
        name,
        role,
        username,
        phone,
        role === 'pemohon' ? nik : null,
        role === 'pemohon' ? nokk : null,
        role === 'pemohon' ? tanggallahir : null,
        id,
      ]
    }

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Gagal mengupdate pengguna:', err)
        return res.status(500).json({ message: 'Gagal mengupdate pengguna' })
      }
      res.json({ message: 'Pengguna berhasil diupdate', affectedRows: result.affectedRows })
    })
  }

  // Jika password diisi, hash terlebih dahulu
  if (password) {
    bcrypt.hash(password, saltRounds, (hashErr, hash) => {
      if (hashErr) {
        console.error('Gagal meng-hash password:', hashErr)
        return res.status(500).json({ message: 'Gagal meng-hash password' })
      }
      runQuery(hash)
    })
  } else {
    runQuery() // Update tanpa mengubah password
  }
})
app.delete('/api/hapuspengguna/:id', (req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM users WHERE id = ?'

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Gagal menghapus pengguna:', err)
      return res.status(500).json({ message: 'Gagal menghapus pengguna' })
    }
    res.json({ message: 'Pengguna berhasil dihapus' })
  })
})
app.get('/api/detailpengguna/:id', (req, res) => {
  const { id } = req.params
  const sql = 'SELECT * FROM users WHERE id = ?'

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Gagal mengambil detail pengguna:', err)
      return res.status(500).json({ message: 'Gagal mengambil detail pengguna' })
    }
    res.json(results)
  })
})
/* 
  Endpoint /api/statistics 
  Menghitung:
  - userCount: jumlah pengguna pada bulan ini  
  - userChange: persentase perubahan dibanding bulan sebelumnya  
  - permohonanCount: jumlah permohonan pada bulan ini  
  - permohonanChange: persentase perubahan dibanding bulan sebelumnya  
  - jenisBantuanCount: jumlah jenis bantuan (distinct nama_bantuan) pada bulan ini  
  - jenisBantuanChange: persentase perubahan dibanding bulan sebelumnya  
*/
app.get('/api/statistics', (req, res) => {
  const currentMonth = new Date().getMonth() + 1 // getMonth() mulai dari 0
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1

  const userCurrentQuery = 'SELECT COUNT(*) AS count FROM users WHERE MONTH(created_at) = ?'
  const userPreviousQuery = 'SELECT COUNT(*) AS count FROM users WHERE MONTH(created_at) = ?'

  const permohonanCurrentQuery =
    'SELECT COUNT(*) AS count FROM permohonan WHERE MONTH(tanggal_pengajuan) = ?'
  const permohonanPreviousQuery =
    'SELECT COUNT(*) AS count FROM permohonan WHERE MONTH(tanggal_pengajuan) = ?'

  const jenisBantuanCurrentQuery =
    'SELECT COUNT(DISTINCT nama_bantuan) AS count FROM bantuan WHERE MONTH(created_at) = ?'
  const jenisBantuanPreviousQuery =
    'SELECT COUNT(DISTINCT nama_bantuan) AS count FROM bantuan WHERE MONTH(created_at) = ?'

  db.query(userCurrentQuery, [currentMonth], (err, userCurrentResult) => {
    if (err) return res.status(500).json({ error: err.message })
    db.query(userPreviousQuery, [previousMonth], (err, userPreviousResult) => {
      if (err) return res.status(500).json({ error: err.message })
      db.query(permohonanCurrentQuery, [currentMonth], (err, permohonanCurrentResult) => {
        if (err) return res.status(500).json({ error: err.message })
        db.query(permohonanPreviousQuery, [previousMonth], (err, permohonanPreviousResult) => {
          if (err) return res.status(500).json({ error: err.message })
          db.query(jenisBantuanCurrentQuery, [currentMonth], (err, jenisBantuanCurrentResult) => {
            if (err) return res.status(500).json({ error: err.message })
            db.query(
              jenisBantuanPreviousQuery,
              [previousMonth],
              (err, jenisBantuanPreviousResult) => {
                if (err) return res.status(500).json({ error: err.message })

                const userCount = userCurrentResult[0].count
                const permohonanCount = permohonanCurrentResult[0].count
                const jenisBantuanCount = jenisBantuanCurrentResult[0].count

                // Hitung persentase perubahan, jika nilai bulan sebelumnya 0 maka set ke 0
                const userChange =
                  userPreviousResult[0].count === 0
                    ? 0
                    : Number(
                        (
                          ((userCount - userPreviousResult[0].count) /
                            userPreviousResult[0].count) *
                          100
                        ).toFixed(1),
                      )
                const permohonanChange =
                  permohonanPreviousResult[0].count === 0
                    ? 0
                    : Number(
                        (
                          ((permohonanCount - permohonanPreviousResult[0].count) /
                            permohonanPreviousResult[0].count) *
                          100
                        ).toFixed(1),
                      )
                const jenisBantuanChange =
                  jenisBantuanPreviousResult[0].count === 0
                    ? 0
                    : Number(
                        (
                          ((jenisBantuanCount - jenisBantuanPreviousResult[0].count) /
                            jenisBantuanPreviousResult[0].count) *
                          100
                        ).toFixed(1),
                      )

                res.json({
                  userCount,
                  userChange,
                  permohonanCount,
                  permohonanChange,
                  jenisBantuanCount,
                  jenisBantuanChange,
                })
              },
            )
          })
        })
      })
    })
  })
})

/* 
  Endpoint /api/chartdata 
  Mengembalikan data grafik per bulan untuk:
  - users: jumlah pengguna per bulan
  - permohonan: jumlah permohonan per bulan
  - jenisBantuan: jumlah jenis bantuan (distinct) per bulan
*/
app.get('/api/chartdata', (req, res) => {
  const usersQuery = `
    SELECT MONTH(created_at) AS month, COUNT(*) AS count 
    FROM users 
    GROUP BY MONTH(created_at)
  `
  const permohonanQuery = `
    SELECT MONTH(tanggal_pengajuan) AS month, COUNT(*) AS count 
    FROM permohonan 
    GROUP BY MONTH(tanggal_pengajuan)
  `
  const jenisBantuanQuery = `
    SELECT MONTH(created_at) AS month, COUNT(DISTINCT nama_bantuan) AS count 
    FROM bantuan 
    GROUP BY MONTH(created_at)
  `

  db.query(usersQuery, (err, userResults) => {
    if (err) return res.status(500).json({ error: err.message })
    db.query(permohonanQuery, (err, permohonanResults) => {
      if (err) return res.status(500).json({ error: err.message })
      db.query(jenisBantuanQuery, (err, jenisResults) => {
        if (err) return res.status(500).json({ error: err.message })

        // Buat array 12 elemen untuk setiap kategori
        let usersMonthly = new Array(12).fill(0)
        userResults.forEach((row) => {
          usersMonthly[row.month - 1] = row.count
        })

        let permohonanMonthly = new Array(12).fill(0)
        permohonanResults.forEach((row) => {
          permohonanMonthly[row.month - 1] = row.count
        })

        let jenisBantuanMonthly = new Array(12).fill(0)
        jenisResults.forEach((row) => {
          jenisBantuanMonthly[row.month - 1] = row.count
        })

        res.json({
          users: usersMonthly,
          permohonan: permohonanMonthly,
          jenisBantuan: jenisBantuanMonthly,
        })
      })
    })
  })
})
// Endpoint untuk mengambil permohonan terbaru
app.get('/api/permohonanTerbaru', (req, res) => {
  // Query untuk mengambil data permohonan terbaru, misalnya 10 data terbaru
  const sql = `
    SELECT 
      p.id,
      u.name AS nama_user,
      b.nama_bantuan AS jenis_bantuan,
      u.phone AS no_hp,
      DATE_FORMAT(p.tanggal_pengajuan, '%d-%m-%Y') AS tanggal_pengajuanformat
    FROM permohonan p
    JOIN users u ON p.user_id = u.id
    JOIN bantuan b ON p.bantuan_id = b.id
    WHERE p.status = 'baru' 
    ORDER BY p.tanggal_pengajuan DESC 
    LIMIT 10;
  `
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching permohonan terbaru:', err)
      return res.status(500).json({ error: err.message })
    }
    res.json(results)
  })
})
app.get('/api/permohonanDashboard', (req, res) => {
  // Untuk contoh, gunakan periode bulan berjalan (bisa disesuaikan dengan query param)
  const sqlChart = `
    SELECT MONTH(tanggal_pengajuan) AS month, COUNT(*) AS count
    FROM permohonan
    GROUP BY MONTH(tanggal_pengajuan)
  `

  // Query summary: group by status untuk bulan berjalan
  const sqlSummary = `
    SELECT status, COUNT(*) AS count
    FROM permohonan
    WHERE MONTH(tanggal_pengajuan) = MONTH(CURRENT_DATE())
    GROUP BY status
  `

  db.query(sqlChart, (err, chartResults) => {
    if (err) return res.status(500).json({ error: err.message })

    // Buat array 12 elemen, index 0 = Jan, 11 = Dec
    let labels = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    let chartData = new Array(12).fill(0)
    chartResults.forEach((row) => {
      chartData[row.month - 1] = row.count
    })

    db.query(sqlSummary, (err, summaryResults) => {
      if (err) return res.status(500).json({ error: err.message })

      let total = 0,
        selesai = 0,
        ditolak = 0
      summaryResults.forEach((row) => {
        total += row.count
        const status = row.status.toLowerCase()
        if (status === 'selesai') {
          selesai = row.count
        } else if (status === 'ditolak') {
          ditolak = row.count
        }
      })
      let diproses = total - (selesai + ditolak)
      // Jika perlu, bisa hitung persentase perubahan; di sini kita set change = 0
      const change = 0

      res.json({
        labels,
        data: chartData,
        summary: { total, selesai, ditolak, diproses, change },
      })
    })
  })
})
app.put('/api/tolakpermohonan/:id', (req, res) => {
  const { id } = req.params
  const { alasan_penolakan } = req.body

  const sql = `UPDATE permohonan 
               SET status = 'ditolak', 
                   alasan_penolakan = ? 
               WHERE id = ?`

  db.query(sql, [alasan_penolakan, id], (err, result) => {
    if (err) {
      console.error('Gagal menolak permohonan:', err)
      return res.status(500).json({ message: 'Gagal menolak permohonan' })
    }
    res.json({ message: 'Permohonan berhasil ditolak' })
  })
})
