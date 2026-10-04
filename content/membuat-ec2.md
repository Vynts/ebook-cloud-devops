---
title: "2. Mencoba membuat EC2 Instance"
description: "Ikuti langkah membuat AWS EC2, menyiapkan SSH Key Pair dan Security Group, lalu menghubungkan virtual server ke terminal."
order: 6
author: "vynts"
github: "https://github.com/vynts"
---

# Mencoba Membuat Instance EC2 dan Koneksi SSH

Panduan ini membahas langkah demi langkah pembuatan virtual server (EC2 instance) pada AWS Management Console, pembuatan SSH Key Pair, konfigurasi Security Group, hingga cara terhubung ke server menggunakan terminal via SSH.

## Prasyarat

Sebelum memulai tutorial ini, pastikan Anda telah menyiapkan:
1. Akun AWS yang aktif.
2. Terminal (macOS/Linux) atau PowerShell/Command Prompt (Windows).
3. Koneksi internet yang stabil.

## Langkah 1: Masuk ke AWS Management Console

1. Buka browser dan akses [AWS Management Console](https://aws.amazon.com/console/)
2. Masuk menggunakan akun AWS Anda (Root user atau IAM user).
3. Pilih AWS Region yang diinginkan di pojok kanan atas, misalnya **US East (N. Virginia) us-east-1** atau **Asia Pacific (Singapore) ap-southeast-1**.

![AWS Console Dashboard](/images/dashboard-aws.png)

## Langkah 2: Membuka Layanan EC2

1. Pada kolom pencarian di bagian atas, ketik **EC2**.
2. Klik layanan **EC2** dari hasil pencarian untuk masuk ke **EC2 Dashboard**.
3. Di halaman dashboard, klik tombol **Launch Instance**.

![EC2 Dashboard Instance](/images/ec2.png)

![EC2 Dashboard Launch Instance](/images/launch-instance.png)

## Langkah 3: Konfigurasi Instance EC2

### 1. Name and Tags
Isi nama instance pada kolom **Name**, misalnya `Server-Web-Pemula`.

![Configure Name and Tags](/images/name-server.png)

### 2. Application and OS Images (Amazon Machine Image - AMI)
Pilih sistem operasi yang akan digunakan pada instance:
* Pilih tab **Ubuntu**.
* Pilih versi **Ubuntu Server 24.04 LTS (HVM), SSD Volume Type** (disertai label *Free tier eligible*).

![Select AMI](/images/os.png)

### 3. Instance Type
Pilih spesifikasi hardware server:
* Pilih **t2.micro** (atau **t3.micro** tergantung region yang bertanda *Free tier eligible*). Spesifikasi ini mencakup 1 vCPU dan 1 GiB Memory.

![Select Instance Type](/images/type.png)

### 4. Key Pair (Login)
Key Pair digunakan untuk autentikasi keamanan saat login melalui SSH.

1. Klik **Create new key pair**.
2. Masukkan nama key pair, contoh: `my-ec2-key`.
3. Pilih **Key pair type**: `RSA`.
4. Pilih **Private key file format**:
   * `.pem` jika menggunakan Linux, macOS, atau Windows OpenSSH (PowerShell).
   * `.ppk` jika menggunakan aplikasi PuTTY lama.
5. Klik **Create key pair**. File berkas key pair (`.pem`) akan otomatis terunduh ke komputer Anda. Simpan file ini di lokasi yang aman.

![Create Key Pair](/images/keypair.png)

### 5. Network Settings
Pengaturan ini menentukan aturan firewall (Security Group) untuk mengontrol lalu lintas jaringan.

1. Pilih **Create security group**.
2. Centang **Allow SSH traffic from**.
3. Ubah dropdown menjadi **My IP** untuk alasan keamanan (hanya IP komputer Anda yang diizinkan mengakses SSH), atau **Anywhere (0.0.0.0/0)** untuk pengujian sementara.

![Network Settings](/images/network.png)

### 6. Configure Storage
Atur kapasitas penyimpanan internal (EBS Volume):
* Biarkan secara default pada **8 GiB gp3** atau **gp2** (Free Tier mengizinkan hingga 30 GB SSD Storage).

![Configure Storage](/images/storage.png)

## Langkah 4: Peluncuran Instance (Launch Instance)

1. Tinjau kembali ringkasan konfigurasi di panel sebelah kanan.
2. Klik tombol **Launch Instance**.
3. Tunggu hingga muncul notifikasi sukses, lalu klik **View all instances**.
4. Tunggu hingga kolom **Instance state** berubah menjadi `Running` dan **Status check** menampilkan `2/2 checks passed`.

![Instance Running Status](/images/status.png)

## Langkah 5: Menghubungkan ke EC2 via SSH

### 1. Salin Public IP Server
1. Klik pada instance yang telah dibuat dari daftar.
2. Pada panel detail di bagian bawah, salin nilai **Public IPv4 address** (contoh: `54.210.12.34`).

![Copy Public IP](/images/copy.png)

### 2. Buka Terminal
Buka Terminal (macOS/Linux) atau PowerShell (Windows), lalu berpindah ke direktori tempat Anda menyimpan file `.pem` yang diunduh tadi.

```bash
cd ~/Downloads
```

### 3. Ubah Hak Akses File Key (Khusus Linux/macOS)
Ubah izin akses file `.pem` agar hanya dapat dibaca oleh pemilik file:

```bash
chmod 400 my-ec2-key.pem
```

*(Catatan: Jika langkah ini dilewati pada Linux/macOS, SSH akan menolak koneksi karena alasan keamanan).*

### 4. Eksekusi Perintah SSH
Jalankan perintah SSH dengan format berikut:

```bash
ssh -i "my-ec2-key.pem" ubuntu@<PUBLIC_IP_ADDRESS>
```

Gantikan `<PUBLIC_IP_ADDRESS>` dengan Public IP server Anda. Contoh:

```bash
ssh -i "my-ec2-key.pem" ubuntu@54.210.12.34
```

Jika muncul konfirmasi fingerprint seperti:
`Are you sure you want to continue connecting (yes/no/[fingerprint])?`
Ketik `yes` lalu tekan **Enter**.

Jika berhasil, prompt terminal akan berubah menjadi prompt server Ubuntu:

```bash
ubuntu@ip-172-31-0-1:~$
```

![SSH Success Terminal](/images/ubuntu.png)

---

## Langkah 6: Menghentikan atau Menghapus Instance

Untuk menghindari penggunaan kuota Free Tier yang berlebihan setelah selesai belajar:

1. Pilih instance di EC2 Dashboard.
2. Klik dropdown **Instance state** di pojok kanan atas.
3. Pilih:
   * **Stop instance**: Menghentikan server (dapat dinyalakan kembali nanti).
   * **Terminate instance**: Menghapus server secara permanen.

![Stop or Terminate Instance](/images/terminate.png)