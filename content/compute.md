---
title: "1. Compute"
description: "Panduan lengkap memahami Cloud Infrastructure (AWS) dan Perintah Dasar Linux untuk Awam & Pemula."
order: 5
author: "vynts"
github: "https://github.com/vynts"
---

# Memahami Cloud Compute, EC2, Virtual Machine dan SSH

Mempelajari *cloud computing* sering kali membingungkan karena terlalu banyak istilah teknis. Di panduan ini, kita akan membongkar semuanya dengan analogi dunia nyata yang simpel!

## 1. Apa itu "Compute" pada Cloud Computing?

Bayangkan Kita butuh laptop canggih untuk mengedit video berat, tapi Kita tidak punya uang untuk membelinya. Lalu ada layanan yang bilang:  
*"Sewa saja laptop kami dari jarak jauh lewat internet, bayar sesuai jam pemakaian."*

**Compute** pada *cloud computing* pada dasarnya adalah **"laptop/komputer rental"** yang ada di tempat jauh (di *Data Center*), yang Kita sewa lewat internet.

* **Fungsi Compute:** Mengolah data, menjalankan program, dan berpikir (seperti fungsi otak/prosesor pada komputer Kita).

## 2. Apa itu Virtual Machine (VM) & AWS EC2?

Untuk memahami dua istilah ini, mari gunakan **Analogi Gedung Apartemen**:

### A. Virtual Machine (VM) - *Unit Apartemen*
Bayangkan ada satu **Gedung Raksasa** (Komputer Fisik besar). Di dalam gedung ini, ruangan-ruangannya disekat menjadi puluhan **Unit Apartemen kecil**.
* Setiap unit punya pintu kunci sendiri, kamar mandi sendiri, dan listrik sendiri.
* Penghuni Kamar 101 tidak bisa mengintip atau mengganggu isi Kamar 102.

**Virtual Machine (VM)** adalah unit apartemen tersebut. VM adalah **komputer buatan (komputer dalam komputer)** yang terisolasi aman dan punya sistem operasinya sendiri (seperti Windows atau Linux).

### B. AWS EC2 - *Layanan Rental Apartemen Fleksibel*
**EC2 (Elastic Compute Cloud)** adalah nama produk buatan Amazon (AWS). Ini adalah layanan tempat Kita bisa menyewa unit VM tadi secara online.

Kenapa dinamakan **"Elastic" (Elastis)**?
* Hari ini Kita sewa kamar kecil (1 CPU, RAM 1 GB) untuk coba-coba.
* Besok website Kita ramai pengunjung, dalam 2 menit Kita bisa mengubah kamar kecil itu menjadi **Penthouse** (16 CPU, RAM 64 GB) tanpa harus membeli komputer baru!

## 3. Gimana Cara Kerjanya di Belakang Layar?

Di belakang layar, ada yang namanya **Hypervisor**.

> **Analogi:** Hypervisor itu seperti **Manajer Gedung Apartemen**.

Tugas Manajer Gedung (Hypervisor) ini adalah:
1. Membagi-bagi sumber daya gedung fisik (listrik, air, ruangan) secara adil ke tiap unit apartemen (VM).
2. Memastikan jika unit kamar A mati lampu/rusak, unit kamar B **tidak ikut terkena dampaknya**.

## 4. Gimana Website Bisa Ada di EC2 / VM?

Bayangkan Kita mau membuka **Toko Baju Online** di dalam unit apartemen yang sudah disewa. Supaya pembeli dari luar bisa belanja, Kita butuh 3 hal:

![Diagram cara kerja website di EC2 atau VM](/images/cara-kerja-web.png)

1. **Gudang / Rak (Storage AWS EBS):** Tempat Kita menyimpan file website Kita (file HTML, foto produk, kode program). Ini seperti Harddisk virtual.
2. **Penjaga Toko (Web Server seperti Nginx/Apache):** Program yang bertugas menyambut pengunjung. Saat ada yang mengetik alamat website Kita, si penjaga toko ini yang akan mengambilkan file foto/halaman web dan menampilkannya di layar HP/komputer pengunjung.
3. **Alamat Rumah (IP Address / Domain):** Angka unik (contoh: `54.12.34.56`) atau nama domain (`tokosaya.com`) supaya orang tahu harus berkunjung ke mana di internet.

## 5. Gimana Website Bisa Berjalan (Running) 24/7 Non-stop?

Kalau di laptop pribadi, begitu laptop dimatikan, website Kita pasti mati. Di Cloud (EC2), ada 2 rahasia kenapa websitenya selalu menyala 24 jam:

1. **Komputer Server AWS Tidak Pernah Dimatikan:** Komputer fisik AWS berada di gedung khusus (*Data Center*) yang listrik dan pendinginnya dijaga ketat agar menyala terus.
2. **Ada Robot Penjaga (Process Manager / Systemd):**
   * Di dalam Linux, aplikasi web diatur agar berjalan di *background* (di balik layar).
   * Jika aplikasi web Kita mendadak *crash* atau eror, si "Robot Penjaga" ini akan otomatis **menyalakan ulang (auto-restart)** aplikasi tersebut dalam hitungan detik tanpa perlu Kita campur tangan.

## 6. Gimana Cara Mengaksesnya Lewat SSH?

Karena komputer EC2 ini ada di data center AWS (misal di Singapura atau Jakarta), Kita tidak bisa mencolokkan monitor atau keyboard langsung ke sana. 

Untuk mengontrolnya, kita menggunakan **SSH (Secure Shell)**.

> **Analogi SSH:** SSH itu seperti **Gembok Rahasia & Kunci Duplikat** yang sangat canggih.

### Cara Kerja Kunci SSH:
AWS membuat sepasang kunci saat Kita membuat EC2:
* **Public Key (Gembok):** Dipasang di pintu apartemen server Kita.
* **Private Key (Kunci Rahasia / File `.pem`):** Disimpan di laptop lokal Kita. Jangan sampai hilang atau dicuri orang!

![Diagram cara kerja SSH di EC2 atau VM](/images/cara-kerja-ssh.png)

### Langkah Praktis Menggunakan SSH (Step-by-Step):

#### Langkah 1: Buka Terminal / Command Prompt
Buka aplikasi **Terminal** (di Mac/Linux) atau **Command Prompt / Git Bash** (di Windows).

#### Langkah 2: Amankan Kunci Rahasia Kita (Izin Akses)
*(Khusus Mac/Linux)* Jalankan perintah ini agar komputer Kita tahu kunci ini rahasia:
```bash
chmod 400 kunci-rahasia-saya.pem
```

#### Langkah 3: Ketik Perintah Panggil (Connect)
Gunakan perintah dengan format sederhana ini:
```bash
ssh -i "nama-file-kunci.pem" nama_user@alamat_ip_server
```

**Contoh Nyata:**
```bash
ssh -i "kunci-aws.pem" ubuntu@54.210.12.34
```

#### Langkah 4: Kita Sudah Berhasil Masuk!
Jika sukses, tampilan terminal Kita akan berubah. Sekarang layar terminal Kita adalah **"layar kontrol"** komputer server AWS tersebut. 

Kita bisa mengetik perintah untuk menginstall aplikasi, meng-copy kode website, atau mengecek kondisi server dari mana saja di seluruh dunia!

---

## 7. Bagaimana Semua Ini Saling Terhubung? (Big Picture)

Untuk melihat gambaran utuhnya, mari gabungkan semua komponen di atas dalam **satu alur cerita perjalanan dari awal sampai akhir**:

![Diagram cara kerja Big Picture di EC2 atau VM](/images/cara-kerja-internet.png)

### Skenario Lengkap:

1. **Konsep Dasar (Cloud Compute):** Kita membutuhkan server untuk menaruh aplikasi web. Alih-alih membeli server fisik sendiri yang mahal, Kita memilih menggunakan konsep **Cloud Compute** (menyewa server jarak jauh).
2. **Penyedia & Pengatur (Hypervisor):** Di *Data Center* AWS, komputer raksasa dikelola oleh **Hypervisor** untuk membagi-bagi sumber daya hardware menjadi komputer-komputer kecil yang terisolasi (**Virtual Machine / VM**).
3. **Produk Sewa (AWS EC2):** Kita masuk ke konsol AWS dan menyewa VM tersebut. AWS menamai layanan sewa VM ini sebagai **AWS EC2**.
4. **Masuk ke Server (SSH):** Karena server EC2 berada di lokasi fisik jauh (misal Singapura), Kita terhubung dari laptop pribadi menggunakan **SSH** dan kunci rahasia (`.pem`) untuk mulai mengonfigurasi server.
5. **Menyiapkan Website (Storage & Web Server):** Lewat SSH, Kita meng-upload kode website ke **EBS Storage** dan menginstall **Web Server (Nginx)** yang bertugas menyambut pengunjung.
6. **Menjaga Server Tetap Menyala (Systemd):** Kita mengaktifkan **Systemd** di Linux agar aplikasi web Kita berjalan terus-menerus di *background* dan otomatis menyala kembali jika terjadi eror.
7. **Pengunjung Datang:** Ketika seseorang mengetik **IP Address / Domain** website Kita di browser HP mereka, request tersebut akan diteruskan ke **AWS EC2** -> disambut oleh **Nginx** -> dikirimkan file dari **Storage** -> dan website muncul di layar pengunjung!

---

## Rangkuman Singkat (Tabel Analogi)

| Istilah Teknis | Analogi Sederhana | Fungsi Utamanya |
| :--- | :--- | :--- |
| **Cloud Compute** | Rental Komputer Jarak Jauh | Tempat memproses data & menjalankan program. |
| **Virtual Machine (VM)** | Unit Kamar Apartemen | Komputer virtual yang terisolasi dan punya OS sendiri. |
| **AWS EC2** | Layanan Rental Kamar Fleksibel | Tempat menyewa VM yang ukurannya bisa diubah kapan saja. |
| **Hypervisor** | Manajer Gedung Apartemen | Pengatur & pembagi daya listrik/sumber daya komputer fisik ke VM. |
| **Web Server (Nginx)** | Penjaga Toko | Melayani pengunjung internet yang datang ke website Kita. |
| **SSH** | Kunci Rahasia Remote | Cara aman mengetik perintah ke server dari jarak jauh. |