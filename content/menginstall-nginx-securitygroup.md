---
title: "3. Menginstall Web Server"
description: "Pelajari cara memasang Nginx di AWS EC2 dan mengatur Security Group agar web server dapat diakses dari internet."
order: 6
author: "vynts"
github: "https://github.com/vynts"
---

# Menjalankan Web Server (Nginx) & Security Group

Setelah berhasil membuat server EC2 di cloud dan bisa masuk via SSH, server tersebut masih dalam keadaan **kosong**. Ibarat sebuah ruko baru, ruko ini belum memiliki toko atau pelayan yang bisa melayani pembeli.

Pada bab ini, kita akan belajar bagaimana mengubah server kosong tersebut menjadi sebuah **Web Server** yang siap melayani pengunjung dari internet.

## 1. Analogi Sederhana: Memahami Web Server & Application Server

Bayangkan kamu sedang mendatangi sebuah **Restoran Modern**:

```
[ Pengunjung / Browser ]
           │
           ▼
  [ Pelayan / Kasir ]  <--- (Web Server: Nginx / Apache)
           │
           ▼
     [ Koki Dapur ]    <--- (Application Server: Uvicorn / Gunicorn / PM2)
           │
           ▼
   [ Bahan Makanan ]   <--- (Database: MySQL / PostgreSQL)
```

1. **Pengunjung (Browser / Client)**  
   Orang yang membuka website dari HP atau laptop mereka.

2. **Pelayan / Kasir (Web Server - Nginx / Apache)**  
   Tugasnya berdiri di depan pintu restoran. Pelayan ini menerima pesanan dari pengunjung, menyajikan brosur/menu langsung (file statis HTML/CSS/Gambar), dan meneruskan pesanan makanan ke dapur.

3. **Koki Dapur (Application Server - Uvicorn / Gunicorn / PM2)**  
   Tugasnya memasak makanan sesuai pesanan. Koki inilah yang menjalankan logika pemrograman (bahasa Python, Node.js, PHP) dan mengambil bahan dari lemari es (Database).

---

## 2. Mengenal "Pemain Utama" di Dunia Server

Agar tidak bingung dengan istilah-istilah teknis yang sering kamu dengar, mari kita kenali peran masing-masing *software*:

### Kelompok Pelayan Depan (Web Server)

* **Nginx (Dibaca: *Engine-X*)**:  
  Ibarat **Pelayan Super Cepat**. Nginx sangat terkenal karena sangat ringan dan bisa melayani ribuan pengunjung dalam waktu bersamaan tanpa membuat server pingsan. Sangat cocok digunakan untuk website modern.
* **Apache**:  
  Ibarat **Pelayan Senior Fleksibel**. Salah satu web server tertua dan paling stabil. Sangat populer digunakan untuk website ber-platform WordPress atau Laravel.

---

### Kelompok Koki Dapur (Application Server & Process Manager)

* **Uvicorn**:  
  Ibarat **Koki Kilat untuk Python (FastAPI)**. Mampu memproses pesanan masakan Python berbasis *asynchronous* (bisa mengerjakan banyak hal tanpa menunggu satu tugas selesai).
* **Gunicorn**:  
  Ibarat **Tim Koki Spesialis Python (Flask / Django)**. Mengatur beberapa koki sekaligus di dapur agar aplikasi Python berjalan lancar saat banyak pesanan.
* **PM2**:  
  Ibarat **Pengawas Dapur khusus Node.js**. Jika aplikasi Node.js-mu mendadak *error* atau mati (*crash*), PM2 akan otomatis menyalakannya kembali dalam hitungan milidetik tanpa disadari oleh pengguna.

---

### Mengapa Nginx Ditaruh di Depan Koki? (Konsep *Reverse Proxy*)

Mungkin kamu bertanya: *"Kenapa aplikasi Python/Node.js tidak langsung saja disuruh melayani pengunjung tanpa Nginx?"*

Jawabannya adalah **Keamanan dan Efisiensi**.

1. **Satpam & Penyaring**: Nginx mengecek apakah pesanan pengunjung aman atau berbahaya sebelum diteruskan ke koki (aplikasi).
2. **Pemasang Sertifikat SSL (HTTPS)**: Nginx yang mengurus kunci gembok hijau (HTTPS) agar komunikasi data aman.
3. **Pembagi Beban (*Load Balancer*)**: Jika pengunjung terlalu banyak, Nginx bisa membagi pesanan ke beberapa koki dapur sekaligus agar server tidak *overload*.

## 3. Security Group AWS: Satpam Gerbang Server

Sebelum kita memasang Nginx, kita harus memberi izin dulu di AWS. 

Di AWS, terdapat fitur bernama **Security Group**. Ibarat **Satpam Gerbang Ruko**, Security Group bertugas menentukan pintu mana saja (*Port*) yang boleh dimasuki oleh orang luar.

![Secuirty Group](/images/security.png)

* **Port 22 (SSH)**: Pintu rahasia khusus untuk kamu (pemilik server) masuk dan mengelola server.
* **Port 80 (HTTP)**: Pintu utama agar orang bisa membuka website-mu biasa (`http://...`).
* **Port 443 (HTTPS)**: Pintu utama ber-enkripsi gembok aman (`https://...`).

### Cara Membuka Pintu (Port 80 & 443) di AWS:

1. Buka **AWS Management Console** > masuk ke **EC2 Dashboard**.
2. Pada bagian Instance Aktif, klik **Security**.
3. Pilih Security Group yang dipakai oleh EC2 Instance-mu.
4. Klik tab **Inbound rules** -> klik **Edit inbound rules**.
5. Tambahkan 2 aturan baru:
   * **Rule 1**: Type `HTTP` | Port `80` | Source `0.0.0.0/0` (Artinya siapa saja boleh masuk).
   * **Rule 2**: Type `HTTPS` | Port `443` | Source `0.0.0.0/0`.
6. Klik **Save rules**.

![Secuirty Group 1](/images/security-group.png)
![Secuirty Group 2](/images/edit-inbound.png)
![Secuirty Group 3](/images/add-port.png)

## 4. Langkah Praktis: Install Nginx di Server

Sekarang, buka terminal SSH tempat kamu terhubung ke EC2 Instance. Masukkan perintah berikut satu per satu:

### Langkah 1: Perbarui Sistem
Gunakan perintah ini untuk memperbarui daftar aplikasi di Linux:
```bash
sudo apt update && sudo apt upgrade -y
```

### Langkah 2: Install Nginx
Jalankan perintah ini untuk mengunduh dan memasang Nginx:
```bash
sudo apt install nginx -y
```

### Langkah 3: Cek Apakah Nginx Sudah Aktif
Jalankan perintah ini untuk melihat status Nginx:
```bash
sudo systemctl status nginx
```
Jika muncul tulisan hijau **`active (running)`**, selamat! Pelayan web server-mu sudah bekerja.

![Status nginx](/images/status-nginx.png)

## 5. Uji Coba di Browser

1. Buka halaman EC2 di AWS Console, lalu salin **Public IPv4 Address** milik servermu (contoh: `13.212.45.88`).
2. Buka Chrome atau browser lain di HP/Laptopmu.
3. Ketikkan IP Address tersebut lalu tekan Enter:
   ```text
   http://13.212.45.88
   ```
4. Jika muncul tulisan **"Welcome to nginx!"**, berarti servermu sudah berhasil terhubung dan diakses dari seluruh dunia!

![Cek nginx](/images/nginx.png)

## 6. Mengubah Isi Tampilan Halaman Web

Nginx menyimpan file tampilan web di folder `/var/www/html/index.html`.

Mari kita ubah tampilannya agar menjadi tulisan buatan sendiri:

1. Ketik perintah ini di terminal:
   ```bash
   sudo nano /var/www/html/index.html
   ```

   > atau jika menggunakan nginx versi terbaru:

   ```bash
   sudo nano /var/www/html/index.nginx-debian.html 
   ```
2. Hapus semua teks di dalamnya, lalu ganti dengan kode HTML sederhana ini:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <title>Website Pertama Saya</title>
       <style>
           body { font-family: sans-serif; text-align: center; margin-top: 50px; }
           h1 { color: #2b6cb0; }
       </style>
   </head>
   <body>
       <h1>Selamat Datang di Server Cloud Saya!</h1>
       <p>Web server Nginx berhasil dikonfigurasi!</p>
   </body>
   </html>
   ```
3. Tekan `Ctrl + S` lalu `Enter` untuk menyimpan. Tekan `Ctrl + X` untuk keluar.
4. *Refresh* halaman di browsermu, dan lihat hasilnya!

![Tampilan Custom HTML di Browser](/images/nginx-web.png)
