# 🌱 GreenImpact - Platform Aktivitas SDG

Aplikasi web full-stack yang komprehensif untuk melacak dan mempromosikan aktivitas Sustainable Development Goals (SDG), memberdayakan individu untuk membuat dampak positif terhadap lingkungan dan sosial.

## 📖 Deskripsi

GreenImpact adalah platform interaktif yang memungkinkan pengguna untuk menemukan, berpartisipasi, dan melacak kontribusi mereka terhadap 17 Tujuan Pembangunan Berkelanjutan PBB. Platform ini menampilkan kontrol akses berbasis peran, pelacakan progres real-time, keterlibatan komunitas, dan manajemen aktivitas yang komprehensif.

## 🔧 Teknologi yang Digunakan

### Frontend
- **React 18** - Library JavaScript modern untuk membangun user interface
- **Tailwind CSS** - Framework CSS utility-first untuk pengembangan UI yang cepat
- **React Router v6** - Routing deklaratif untuk aplikasi React
- **Context API + useReducer** - Solusi manajemen state
- **Axios** - HTTP client untuk komunikasi API

### Backend
- **Node.js** - Runtime environment JavaScript
- **Express.js** - Framework web yang cepat dan tidak berpendapat
- **JWT (JSON Web Tokens)** - Mekanisme autentikasi yang aman
- **bcryptjs** - Library hashing password
- **Express Validator** - Validasi dan sanitasi input
- **Helmet** - Middleware keamanan
- **CORS** - Cross-origin resource sharing

### Tools Pengembangan
- **Nodemon** - Development server dengan auto-restart
- **ESLint** - Code linting dan formatting
- **Git** - Sistem version control

## ✨ Fitur

### 🔐 Autentikasi & Otorisasi
- Registrasi dan login pengguna yang aman
- Kontrol akses berbasis peran (Admin/User)
- Autentikasi berbasis token JWT
- Enkripsi password dengan bcrypt

### 👥 Manajemen Pengguna
- **Dashboard Admin** - Manajemen platform lengkap
- **Pelacakan Progres Pengguna** - Perjalanan SDG personal
- **Navigasi Berbasis Peran** - Interface berbeda per tipe pengguna

### 🎯 Manajemen Aktivitas
- **Operasi CRUD** - Create, read, update, delete aktivitas
- **Kategorisasi SDG** - Aktivitas dipetakan ke 17 tujuan SDG
- **Level Kesulitan** - Klasifikasi Easy, Medium, Hard
- **Sistem Poin** - Keterlibatan yang gamified

### 📊 Progres & Analitik
- **Dashboard Personal** - Pelacakan progres individual
- **Sistem Achievement** - Pengakuan milestone
- **Leaderboard** - Keterlibatan komunitas
- **Visualisasi Dampak** - Metrik kontribusi SDG

### 🌐 Fitur Komunitas
- **Statistik Global** - Metrik dampak platform-wide
- **Ranking Pengguna** - Keterlibatan kompetitif
- **Badge Achievement** - Sistem pengakuan

### 🎨 Pengalaman Pengguna
- **Desain Responsif** - Pendekatan mobile-first
- **UI/UX Modern** - Desain glassmorphism dan gradient
- **Elemen Interaktif** - Efek hover dan animasi
- **Modal Konfirmasi** - Konfirmasi aksi yang user-friendly

## 🚀 Instruksi Setup

### Prasyarat
- Node.js (v14 atau lebih tinggi)
- npm atau yarn package manager
- MongoDB (Instalasi lokal atau MongoDB Atlas)
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd GreenImpact-fullstack
```

### 2. Setup Database
**Opsi A: MongoDB Lokal**
- Install MongoDB Community Server
- Start MongoDB service

**Opsi B: MongoDB Atlas (Direkomendasikan)**
- Buat akun gratis di mongodb.com/atlas
- Buat cluster dan dapatkan connection string

### 3. Setup Backend
```bash
cd backend
npm install
npm run seed    # Inisialisasi database dengan sample data
npm run dev     # Start development server
```
Backend akan berjalan di `http://localhost:5000`

### 4. Setup Frontend
```bash
cd frontend
npm install
npm start
```
Frontend akan berjalan di `http://localhost:3000`

### 5. Environment Variables
Buat file `.env` di direktori frontend dan backend:

**Backend (.env):**
```
PORT=5000
JWT_SECRET=greenimpact-secret-key-2024
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/greenimpact
# Atau untuk MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/greenimpact
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🌐 Live Demo

**🚀 Aplikasi Live**: [https://green-impact.vercel.app](https://green-impact.vercel.app)

### 🔑 Akun Demo
- **Admin**: `admin@greenimpact.com` / `admin123`
- **User**: `user@greenimpact.com` / `user123`
- **Demo**: `demo@example.com` / `123456`

*Gunakan akun demo untuk mengeksplorasi fitur platform tanpa registrasi.*

## 🤖 Penjelasan Dukungan AI

Proyek ini dikembangkan dengan bantuan AI yang komprehensif menggunakan IBM Granite Model, yang menyediakan:

### 🛠️ Dukungan Pengembangan
- **Generasi Kode** - Pembuatan komponen React dan pengembangan API Express.js secara otomatis
- **Desain Arsitektur** - Struktur aplikasi full-stack mengikuti praktik terbaik industri
- **Pemecahan Masalah** - Bantuan debugging real-time dan strategi penyelesaian error
- **Optimasi Kode** - Peningkatan performa dan pola kode yang dapat dipelihara

### 📚 Panduan Teknis
- **Pemilihan Teknologi** - Rekomendasi tech stack optimal untuk aplikasi web yang scalable
- **Implementasi Keamanan** - Autentikasi JWT, hashing password bcrypt, dan middleware keamanan
- **Manajemen State** - Context API dengan pola useReducer untuk penanganan state kompleks
- **Desain API** - Struktur RESTful API dengan HTTP methods dan status codes yang tepat

### 🎨 Peningkatan UI/UX
- **Desain Fully Responsive** - Pendekatan mobile-first dengan hamburger navigation
- **UI/UX Modern** - Efek glassmorphism, gradient backgrounds, dan animasi smooth
- **Elemen Interaktif** - Hover effects, scale transforms, dan micro-interactions
- **Modal Responsif** - Dialog konfirmasi dengan layout mobile yang proper
- **Card Design Enhanced** - Spacing, padding, dan grid layout yang lebih baik
- **Footer Professional** - Newsletter signup, social links, dan featured SDGs

### 🔧 Alur Kerja Pengembangan
- **Struktur Proyek** - Hierarki file terorganisir dengan pemisahan concern yang jelas
- **Integrasi Database** - MongoDB dengan Mongoose ODM untuk persistensi data
- **Penanganan Error** - Manajemen error komprehensif dengan feedback yang user-friendly
- **Pengembangan Responsif** - Pendekatan mobile-first dengan Tailwind CSS breakpoints
- **Arsitektur Komponen** - Komponen reusable dengan spacing dan design yang konsisten
- **Dokumentasi** - README detail, komentar kode, dan dokumentasi API

### 🧠 Kemampuan IBM Granite Model
- **Pemahaman Kode** - Pemahaman mendalam terhadap ekosistem JavaScript, React, dan Node.js
- **Praktik Terbaik** - Implementasi pola pengembangan standar industri
- **Kesadaran Keamanan** - Rekomendasi keamanan proaktif dan pencegahan kerentanan
- **Optimasi Performa** - Saran algoritma efisien dan manajemen resource

Kemampuan pemahaman bahasa tingkat lanjut dan generasi kode IBM Granite Model memungkinkan pengembangan yang cepat sambil mempertahankan kualitas kode enterprise-grade, standar keamanan, dan praktik pengembangan modern sepanjang siklus hidup proyek.

## 📁 Struktur Proyek

```
GreenImpact-fullstack/
├── frontend/                 # Aplikasi React
│   ├── src/
│   │   ├── components/      # Komponen UI yang dapat digunakan ulang
│   │   ├── pages/          # Komponen route
│   │   ├── context/        # Manajemen state
│   │   ├── utils/          # Fungsi utility
│   │   └── hooks/          # Custom React hooks
│   └── public/             # Asset statis
├── backend/                 # Server API Express
│   ├── routes/             # Handler route API
│   ├── middleware/         # Custom middleware
│   └── models/             # Model data
└── README.md               # Dokumentasi proyek
```

## 🌍 Kategori SDG yang Didukung

1. **Tanpa Kemiskinan** - Aktivitas pemberdayaan ekonomi
2. **Tanpa Kelaparan** - Keamanan pangan dan nutrisi
3. **Kesehatan yang Baik** - Kesehatan dan wellness
4. **Pendidikan Berkualitas** - Pembelajaran dan pengembangan skill
5. **Kesetaraan Gender** - Inisiatif kesempatan yang setara
6. **Air Bersih** - Konservasi dan akses air
7. **Energi Bersih** - Adopsi energi terbarukan
8. **Pekerjaan Layak** - Ketenagakerjaan dan pertumbuhan ekonomi
9. **Inovasi** - Teknologi dan infrastruktur
10. **Mengurangi Ketimpangan** - Inklusi sosial
11. **Kota Berkelanjutan** - Pembangunan perkotaan
12. **Konsumsi Bertanggung Jawab** - Praktik berkelanjutan
13. **Aksi Iklim** - Perlindungan lingkungan
14. **Kehidupan di Bawah Air** - Konservasi laut
15. **Kehidupan di Darat** - Perlindungan ekosistem terestrial
16. **Perdamaian & Keadilan** - Institusi yang kuat
17. **Kemitraan** - Kerjasama global

## 🚀 Deployment

### 🌐 Production URLs
- **Frontend**: [https://green-impact.vercel.app](https://green-impact.vercel.app)
- **Backend API**: [https://greenimpact-api-production.up.railway.app](https://greenimpact-api-production.up.railway.app)
- **Database**: MongoDB Atlas (Cloud)

### 📋 Arsitektur Deployment
- **Frontend**: Vercel (Static hosting dengan CDN global)
- **Backend**: Railway (Container deployment dengan auto-scaling)
- **Database**: MongoDB Atlas (Managed database service)

### 🔧 Frontend Deployment (Vercel)
```bash
# 1. Push ke GitHub
git add .
git commit -m "Frontend deployment"
git push origin main

# 2. Vercel Dashboard
# - Import dari GitHub
# - Framework: Create React App
# - Environment Variables:
#   REACT_APP_API_URL=https://greenimpact-api-production.up.railway.app/api
```

### 🖥️ Backend Deployment (Railway)
```bash
# 1. Push ke GitHub
git add .
git commit -m "Backend deployment"
git push origin main

# 2. Railway Dashboard
# - Deploy dari GitHub
# - Environment Variables:
#   MONGODB_URI=mongodb+srv://...
#   JWT_SECRET=greenimpact-secret-key-2024
#   FRONTEND_URL=https://green-impact.vercel.app
#   NODE_ENV=production
```

### 🗄️ Database Setup (MongoDB Atlas)
1. Create free cluster di mongodb.com/atlas
2. Setup database user dan network access
3. Get connection string untuk MONGODB_URI
4. Database akan auto-seed saat pertama kali dijalankan

## 📄 Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file LICENSE untuk detail.

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan submit Pull Request.

## 📞 Dukungan

Untuk dukungan dan pertanyaan, silakan buka issue di GitHub repository.

---

**Dibuat dengan 💚 untuk masa depan yang berkelanjutan**