# 🎵 VIBE — Rekomendasi Musik Sesuai Suasana Hatimu

> *"Temukan musik yang sesuai dengan suasana hatimu."*

**VIBE** adalah website rekomendasi musik interaktif modern berbahasa Indonesia yang dirancang untuk merekomendasikan lagu berdasarkan suasana hati (*mood*), tingkat energi (1–5), dan kebutuhan emosional pengguna. Dilengkapi dengan pemutar **YouTube IFrame resmi** yang memungkinkan pengguna benar-benar memutar musik dan video langsung di website tanpa pelanggaran hak cipta.

---

## ✨ Fitur Utama

1. **Alur Kuesioner Suasana Hati Interaktif (3 Langkah):**
   - **Langkah 1: Suasana Hati** (*Senang, Sedih, Tenang, Lelah, Marah, Bersemangat, Romantis, Santai*) lengkap dengan ikon emoji dan palet ambient dinamis.
   - **Langkah 2: Slider Tingkat Energi 1–5** (dari sangat santai/akustik hingga maksimal/adrenalin).
   - **Langkah 3: Pilihan Kebutuhan Emosional** (*Ingin bersantai, Ingin semangat, Ingin fokus, Ingin ditemani, Ingin menghibur diri, Ingin bernostalgia*).
2. **Algoritma Rekomendasi:** Menghitung skor kecocokan persentase (*% Cocok*) berdasarkan bobot suasana hati, kedekatan energi, dan kategori kebutuhan.
3. **Pemutar YouTube Resmi (Embedded Player):**
   - Bar pemutar melayang (*Dock Player*) di bagian bawah layar.
   - Tombol Putar / Jeda, Lagu Berikutnya (*Next*), dan Lagu Sebelumnya (*Previous*).
   - Fitur *Autoplay Next Track* saat lagu selesai diputar.
   - Mode Tonton Video YouTube layar penuh dalam bingkai kaca (*glassmorphism*).
4. **Koleksi Favorit (❤️):** Simpan lagu yang disukai ke penyimpanan lokal browser (*localStorage*).
5. **Riwayat Terakhir (🕒):** Otomatis mencatat daftar lagu yang pernah diputar.
6. **Pencarian Cepat (🔍):** Cari lagu berdasarkan judul, nama artis, atau suasana hati secara langsung.
7. **Mode Gelap / Terang:** Beralih antara tema gelap (*deep ambient*) dan tema terang.
8. **Responsif & Visual Modern:** Tampilan fleksibel untuk layar ponsel, tablet, dan laptop dengan efek *glassmorphism* dan gradasi pendaran cahaya (*glow*).

---

## 🚀 Cara Menjalankan Project

### Cara 1: Menggunakan File Batch (Paling Praktis)
Cukup **klik dua kali** file `start.bat` di folder `c:\VIBENDO`. Server akan otomatis berjalan dan membuka browser di `http://localhost:5173`.

### Cara 2: Melalui Terminal / Command Prompt
Buka terminal di folder `c:\VIBENDO` dan jalankan:
```bash
# Menjalankan server pengembangan
npm run dev
```
Buka browser dan akses alamat yang ditampilkan: `http://localhost:5173`.

---

## 📂 Struktur Folder Project

```
c:\VIBENDO\
├── public/                     # Aset publik statis
├── src/
│   ├── components/             # Komponen antarmuka modular
│   │   ├── common/             # Navbar, Favorit, Riwayat
│   │   ├── mood/               # MoodSelector, EnergySlider, NeedSelector
│   │   ├── player/             # YouTubePlayer, PlayerDock
│   │   ├── search/             # SearchBar
│   │   └── tracks/             # TrackCard, TrackList
│   ├── context/                # Pengelola state global
│   │   ├── PlayerContext.tsx   # Status pemutaran, antrean, favorit, riwayat
│   │   └── ThemeContext.tsx    # Mode Gelap/Terang & warna ambient
│   ├── data/
│   │   └── songsData.ts        # Katalog data lagu K-Pop YouTube resmi
│   ├── types/
│   │   └── index.ts            # Definisi tipe data TypeScript
│   ├── utils/
│   │   └── recommendationEngine.ts # Algoritma skoring rekomendasi
│   ├── App.tsx                 # Halaman utama aplikasi
│   ├── main.tsx                # Titik masuk React
│   └── index.css               # Styling Tailwind CSS & Glassmorphism
├── index.html                  # Template HTML5 utama
├── package.json                # Daftar paket & dependensi
├── tailwind.config.js          # Konfigurasi Tailwind CSS
├── tsconfig.json               # Konfigurasi TypeScript
├── vite.config.ts              # Konfigurasi bundler Vite
└── start.bat                   # Pintasan peluncur 1-klik untuk Windows
```

---

## 🎶 Cara Menambahkan Lagu Baru

Untuk menambahkan lagu baru, buka file [songsData.ts](file:///c:/VIBENDO/src/data/songsData.ts) dan tambahkan objek baru ke array `SAMPLE_SONGS`:

```typescript
{
  id: 'lagu-unik-1',
  title: 'Judul Lagu',
  artist: 'Nama Artis / Grup',
  mood: 'Senang', // 'Senang' | 'Sedih' | 'Tenang' | 'Lelah' | 'Marah' | 'Bersemangat' | 'Romantis' | 'Santai'
  energyLevel: 4, // Angka 1 sampai 5
  category: 'Ingin semangat', // Salah satu dari 6 kategori kebutuhan
  youtubeId: 'ID_VIDEO_YOUTUBE', // Contoh: jika link https://www.youtube.com/watch?v=gdZLi9oWNZg, ID adalah 'gdZLi9oWNZg'
  thumbnailUrl: 'https://img.youtube.com/vi/ID_VIDEO_YOUTUBE/mqdefault.jpg',
  duration: '3:45',
  genre: 'Pop',
  description: 'Deskripsi singkat suasana lagu ini.'
}
```

---

## 🛡️ Kepatuhan Hak Cipta
Website ini tidak menyimpan, mengunggah, atau mendistribusikan file MP3 berhak cipta. Seluruh pemutaran musik dan video menggunakan **YouTube IFrame Player API resmi** langsung dari kanal resmi pemilik karya.
