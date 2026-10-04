---
title: "Apa itu Cloud Computing"
description: "Kenali cara kerja cloud computing, perbedaan cloud dan server sendiri, serta layanan IaaS, PaaS, dan SaaS melalui analogi sederhana."
order: 4
author: "vynts"
github: "https://github.com/vynts"
---

# Apa itu Cloud Computing?

Bayangkan Kita ingin menggunakan listrik di rumah. Apakah Kita harus membangun pembangkit listrik sendiri di halaman belakang? Tentu tidak. Kita cukup menyambung ke jaringan PLN, memakai listrik seperlunya, dan membayar sesuai kapasitas yang digunakan.

**Cloud Computing** bekerja dengan cara yang persis sama, tetapi untuk komputer dan Internet. 

Daripada membeli komputer server mahal, menyediakannya ruangan khusus, dan menyalakan AC 24 jam, Kita tinggal **menyewa komputer virtual** milik perusahaan besar (seperti Amazon, Google, atau Microsoft) melalui internet. Kita hanya membayar apa yang Kita pakai.


### Perbandingan: Server Sendiri (On-Premises) vs Cloud

Sebelum ada teknologi Cloud, perusahaan harus membangun **Data Center** sendiri (*On-Premises*). Mari lihat bedanya dengan Cloud:

| Hal yang Dibandingkan | Server Sendiri (On-Premises) | Cloud Computing |
| :--- | :--- | :--- |
| **Modal Awal** | Sangat besar (Beli fisik komputer, AC pendingin, tempat aman). | Tanpa modal awal (Sistem sewa bulanan/per detik). |
| **Kemudahan Tambah Kapasitas** | Sulit dan lama (Harus pesan toko, tunggu kirim, pasang kabel). | Sangat cepat (Cukup klik tombol, selesai dalam hitungan detik). |
| **Perawatan Hardware** | Harus diperbaiki sendiri jika ada kerusakan komponen. | Sepenuhnya diurus oleh penyedia layanan Cloud. |
| **Cadangan Data (Backup)** | Butuh biaya ganda dan lokasi fisik terpisah. | Sudah tersedia fitur cadangan otomatis di berbagai negara. |


## 3 Jenis Layanan Cloud (IaaS, PaaS, SaaS)

Untuk mempermudah pemahaman, bayangkan analogi **"Sewa Tempat Tinggal"**:

**IaaS (Infrastructure as a Service) — Sewa Tanah Kosong:**
   Penyedia cloud hanya memberi Kita lahan dan fondasi dasar (komputer kosongan). Kita bebas membangun rumah, memasang perabot, dan mengatur sendiri isinya.
   *Contoh:* Amazon EC2, Google Compute Engine.

**PaaS (Platform as a Service) — Sewa Apartemen Furnished:**
   Penyedia cloud memberi Kita ruangan yang sudah ada listrik, air, dan perabotnya. Kita tinggal membawa pakaian (kode aplikasi) dan langsung tinggal di sana tanpa pusing memikirkan fasilitas dasar.
   *Contoh:* Vercel, AWS Elastic Beanstalk.

**SaaS (Software as a Service) — Menginap di Hotel:**
   Semua sudah siap pakai. Kita tinggal masuk, menikmati fasilitas, dan menggunakannya langsung tanpa perlu tahu cara merawat kamar atau memasak.
   *Contoh:* Google Drive, Gmail, Spotify, Netflix.


## Mengenal Amazon Web Services (AWS)

**AWS (Amazon Web Services)** adalah penyedia layanan cloud terbesar saat ini. Di dalam AWS, ada puluhan layanan, tetapi untuk pemula kita cukup memahami **4 Layanan Utama**:

* **Amazon EC2 (Server Virtual):** Komputer di cloud yang bisa kita atur performanya (CPU, RAM, Sistem Operasi) sesuai kebutuhan.
* **Amazon S3 (Gudang Data):** Tempat menyimpan file seperti foto, video, dokumen, atau cadangan data di cloud secara aman dan tanpa batas kapasitas.
* **AWS IAM (Satpam & Kunci Akses):** Pintu keamanan yang mengatur *siapa saja* orang atau aplikasi yang boleh mengakses data di akun cloud kita.
* **AWS VPC (Pagar & Jaringan Pribadi):** Pagar virtual yang mengisolasi server-server kita agar aman dari jangkauan publik yang tidak berhak.


## Mengapa Server Cloud Menggunakan Linux?

Sebagian besar server cloud di dunia menggunakan sistem operasi **Linux** (seperti Ubuntu). Mengapa bukan Windows?

1. **Ringan & Cepat:** Linux tidak membutuhkan tampilan grafis (layar desktop/wallpaper) yang berat untuk berjalan.
2. **Stabil:** Linux jarang mengalami pembekuan (*hang*) atau membutuhkan *restart* mendadak.
3. **Gratis & Aman:** Kebanyakan versi Linux bersifat terbuka (*Open Source*) dan memiliki sistem keamanan yang sangat baik.

### Cara Berkomunikasi dengan Server Linux (Command Line)

Server cloud umumnya **tidak memiliki layar, mouse, ataupun tampilan tombol yang bisa diklik**. Kita berkomunikasi dengan server melalui **Command Line Interface (CLI)**, yaitu dengan mengetikkan perintah teks singkat.

Berikut adalah logika dasar dari perintah yang biasa digunakan:

* **Melihat Posisi & Folder:** Sama seperti membuka *File Explorer*, tetapi dengan mengetik kata kunci untuk melihat daftar folder dan file.
* **Memindahkan & Menyalin File:** Sama seperti aksi *Copy-Paste* atau *Cut*, tetapi dilakukan dengan perintah ketik sederhana.
* **Membaca Isinya:** Tanpa perlu membuka aplikasi pemutar atau pembaca dokumen, kita bisa langsung menampilkan teks file di layar hitam terminal.
* **Melihat Kesehatan Server:** Mengecek seberapa berat kerja CPU atau sisa memori komputer secara langsung.


## Latihan Konseptual: Alur Kerja Seorang Cloud Engineer

Sebagai gambaran sederhana tanpa perlu mengetik kodingan rumit, inilah alur kerja umum saat seorang Cloud Engineer menyiapkan web server:

1. **Menyewa Server Virtual:** Memilih spesifikasi komputer di AWS sesuai kebutuhan.
2. **Menyiapkan Lokasi Penyimpanan:** Membuat folder khusus untuk menampung file halaman web.
3. **Menyalin File Web:** Mengirim file gambar dan dokumen ke dalam server cloud.
4. **Memberi Izin Akses:** Memastikan server boleh diakses oleh pengunjung internet dari luar.
5. **Menjalankan Layanan Web:** Memastikan server tetap menyala dan siap melayani pengunjung 24/7.


## Rangkuman & Langkah Selanjutnya

Di bab ini, kita telah memahami:

* **Cloud Computing** adalah sistem sewa komputer virtual via internet yang hemat dan fleksibel.
* **AWS** menyediakan komponen dasar seperti server virtual (EC2), penyimpanan (S3), keamanan (IAM), dan jaringan (VPC).
* **Linux** adalah sistem operasi pilihan utama server cloud karena cepat, aman, dan dapat dikendalikan cukup lewat perintah teks (*Command Line*).