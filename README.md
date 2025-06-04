# Panduan Menjalankan Aplikasi Ijazah Digital Web3 – Verifikasi Ijazah Berbasis Blockchain

Proyek ini adalah implementasi sistem verifikasi ijazah berbasis blockchain menggunakan smart contract (Solidity), REST API (Express.js), dan frontend React.js. Data ijazah diterbitkan sebagai NFT dan disimpan di Ethereum testnet (Goerli/Sepolia).

## Fitur Utama dalam project ini :
- 🎓 Terbitkan ijazah sebagai NFT
- 🔍 Verifikasi ijazah berdasarkan token ID atau nomor ijazah
- 🔗 Terhubung dengan wallet MetaMask
- 🌐 Integrasi on-chain dan off-chain melalui REST API
- 📂 Data disimpan secara permanen di blockchain (testnet)

## Arsitektur Sistem ini :
Frontend (React.js) <--> REST API (Express.js) <--> Smart Contract (Solidity)

## Cara menjalankan sistem ini :

## 🧱 Smart Contract
1. `cd ijazah-project`
2. Install dependency: `npm install`
3. Deploy smart contract: `npx hardhat run scripts/deploy.js --network sepolia`

ETHEREUM_RPC_URL=https://goerli.infura.io/v3/8f1d9d8c3f244e04bfae123456789abc
PRIVATE_KEY=4f3edf983ac636a65a842ce7c78d9aa706d3b113b37aeee7e1e2b8ebf1b3e7b0
CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3

## 🔌 Backend API
1. `cd backend`
2. Install: `npm install`
3. Buat file `.env` dan isi:
4. jalankan server: `node server.js`

## 💻 Frontend
1. `cd frontend`
2. Install: `npm install`
3. Jalankan: `npm start`

## Testing dengan Postman
- Endpoint `POST /issue`
- Endpoint `GET /verify/:tokenId`

## Testing dan Evaluasi Performa

- Tes input data melalui Postman: berhasil tersimpan di smart contract
- Verifikasi menggunakan nomor ijazah: sukses 
- Semua proses diuji di jaringan Sepolia menggunakan MetaMask test account
- Limitasi: Oracle belum diimplementasi, hanya simulasi

## Instruksi Pengujian (Testing Instructions)
🔁 A. Menggunakan Postman (API)
➕ Terbitkan Ijazah (POST)

    Endpoint: http://localhost:3001/api/ijazah

    Method: POST

    Body:

{
  "recipient": "0x742d35Cc6634C0532925a3b8D454B8D9303E6C8E",
  "name": "Desi D Simamora",
  "institution": "Universitas Gadjah Mada",
  "major": "Teknologi Informasi",
  "graduationYear": "2024",
  "certificateNumber": "TI-2024-001"
}

🔍 Verifikasi Ijazah (GET)

    Endpoint: http://localhost:3001/api/verify/TI-2024-001

    Method: GET

🖥️ B. Menggunakan Frontend

    Connect Wallet ke MetaMask

    Masuk ke tab “Issue Certificate” → isi form → klik “Issue”

    Verifikasi ijazah di tab “Verify Certificate”

    Lihat riwayat ijazah di tab “My Certificates”

📊 Evaluasi & Performa

    Smart contract berjalan stabil di testnet

    Backend & frontend responsif dalam uji lokal

    Verifikasi ijazah valid berhasil diuji di Postman dan browser

    Kelebihan: transparansi, permanen, tidak bisa dipalsukan

    Keterbatasan: belum ada integrasi oracle real-time (masih simulasi)

## Penggunaan AI dalam pengembangan
- Menggunakan GPT mengarahkan penugasan
- Menggunakan Claude AI, Deepseek, dan Bolt AI dalam generate code
  Semua kode ditinjau dan disesuaikan manual sebelum digunakan

📎 Kontak

    Nama: Desi D Simamora

    NIM: 23/514990/TK/56564

    Universitas Gadjah Mada – Teknologi Informasi




