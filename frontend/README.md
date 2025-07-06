# EcoTracker - SDGs Platform

Platform web untuk tracking dan edukasi Sustainable Development Goals (SDGs).

## Fitur

✅ **Authentication**: Login/Register dengan Firebase Auth
✅ **Dynamic Routing**: React Router dengan protected routes
✅ **Complex State Management**: Context API dengan useReducer
✅ **Backend API**: Firebase Firestore
✅ **Deployable**: Siap deploy ke Netlify

## Fitur Utama

- **Home**: Dashboard dengan overview SDGs dan statistik user
- **Activities**: Daftar aktivitas SDGs dengan filtering dan tracking
- **Progress**: Halaman progress dengan achievements dan impact tracking
- **Authentication**: Sistem login/register yang aman

## Setup

1. Install dependencies:
```bash
npm install
```

2. Setup Firebase:
   - Buat project di Firebase Console
   - Enable Authentication dan Firestore
   - Update konfigurasi di `src/utils/firebase.js`

3. Jalankan aplikasi:
```bash
npm start
```

4. Deploy ke Netlify:
   - Build: `npm run build`
   - Upload folder `build` ke Netlify
   - Atau connect repository untuk auto-deploy

## Teknologi

- React 18
- React Router v6
- Firebase (Auth + Firestore)
- Context API + useReducer
- CSS-in-JS styling

## SDGs yang Difokuskan

- SDG 2: Zero Hunger
- SDG 6: Clean Water and Sanitation
- SDG 7: Affordable and Clean Energy
- SDG 13: Climate Action
- Dan lainnya...