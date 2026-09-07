# Product Requirement Document (PRD)

**Nama Produk:** Minimal Editorial Portfolio Website  
**Inspirasi Desain:** Dymas Alfin — Editorial Portfolio & Micro-Animations  
**Target Platform:** Web (Desktop & Mobile Responsive)  
**Tumpukan Teknologi:** Vite, React, Tailwind CSS, Framer Motion, Lenis Scroll  
**Tujuan:** Membangun website portofolio developer yang berfokus pada tipografi berskala besar, hierarki editorial yang kuat, navigasi tanpa friksi, serta animasi mikro berbobot tinggi (anti-AI slop).

---

### 1. Filosofi & Identitas Visual

* **Prinsip Utama:** *"Clear space to showcase selected work without distractions."* Mengedepankan ruang putih (*generous whitespace*), ketenangan visual, dan keterbacaan tinggi.
* **Palet Warna (Earthy Editorial):**
  * Canvas: `#F7F5F0` (Warm Sand / Alabaster)
  * Ink / Text: `#1A2421` (Deep Forest Slate pekat)
  * Muted Label: `#6B726E` (Stone Neutral)
  * Divider / Hairline: `#E3DEC3` (Raw Linen)
  * Subtle Card Background: `#EFECE3` (Soft Bone)
  * Interactive Hover Accent: `#C85A32` (Burnt Terracotta)
* **Tipografi:**
  * Headline Utama: Large Display Typography (Serif elegan atau Sans humanis dengan tracking rapat).
  * Metadata & Tag: Crisp Monospace (JetBrains Mono) berukuran 12–13px kapital.

---

### 2. Arsitektur Komponen & Gerak (Motion)

#### A. Initial Loader (Seamless Intro)
* Layar pembuka monokrom minimalis.
* Counter persentase numerik cepat (`00` ke `100`) di sudut bawah / tengah.
* Mask-slide reveal ke atas yang mulus tanpa flash layout, langsung menyajikan Hero text.

#### B. Floating Minimal Navbar
* Baris navigasi mengambang berbentuk pil tipis dengan blur latar.
* Brand nama di sisi kiri, jam digital lokal real-time (WIB), dan anchor links (`Works`, `About`, `Contact`).
* Magnetic effect halus pada tautan navigasi.

#### C. Hero Section (Large Type & Statement)
* Typography statement berukuran raksasa dengan word-by-word mask reveal saat masuk viewport.
* Status ketersediaan kolaborasi aktif (*pulsing status dot*).
* Tombol CTA langsung menuju karya pilihan (*Selected Works*).

#### D. About & Metric Ribbon
* Paragraf pengantar filosofi kerja: ringkas, percaya diri, tanpa basa-basi.
* Strip metrik ringkas (jumlah proyek terkurasi, sertifikasi, tahun aktif) dengan efek count-up halus.
* Pembatas horizontal berbasis SVG yang terisi seiring kedalaman scroll.

#### E. Selected Works Showcase (Core Focus)
* **Format Daftar Editorial:** Bukan grid kartu tebal generik, melainkan baris tipografis terstruktur rapi (Nomor Proyek, Judul, Kategori, Tahun).
* **Interactive Mouse Follower Image:**
  * Hover pada baris proyek memunculkan pratinjau gambar yang melayang mengikuti kursor.
  * Dilengkapi fisika inersia (*velocity-based tilt*): sudut kartu miring dinamis sesuai kecepatan dan arah geser mouse.
* **Tab Switcher:** Navigasi 3 tab (Selected Works, Credentials/Certs, Tech Stack) dengan spring line transition (`layoutId`).

#### F. Contact & Guestbook
* Tautan kontak langsung (Surel, GitHub, LinkedIn, Instagram) dengan hover underline animasi.
* Formulir buku tamu minimalis dengan optimistic UI dan penyimpanan lokal (`localStorage`).

---

### 3. Standar Teknis Animasi

* **Lenis Smooth Scroll:** Memberi bobot inersia pada tiap guliran roda mouse.
* **Framer Motion Springs:** Menggunakan konfigurasi pegas fisik (`stiffness: 150`, `damping: 20`) alih-alih kurva easing linier standar.
* **Zero Layout Thrashing:** Semua animasi posisi memanfaatkan `transform` GPU (`translate3d`, `scale`) demi performa konstan 60 FPS.
* **Adaptive Mobile Fallback:** Efek hover kursor otomatis dinonaktifkan di layar sentuh, berganti menjadi tampilan kartu statis yang tetap bersih.