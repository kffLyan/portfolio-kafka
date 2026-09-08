-- ==========================================================
-- SCRIPT SQL BUKU TAMU (GUESTBOOK) PORTOFOLIO KAFKA
-- Jalankan query ini di SQL Editor dashboard Supabase Anda:
-- https://supabase.com/dashboard/project/_/sql
-- ==========================================================

-- 1. Buat tabel guestbook
CREATE TABLE IF NOT EXISTS public.guestbook (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'Visitor / Collaborator',
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE public.guestbook ENABLE ROW LEVEL SECURITY;

-- 3. Beri izin publik untuk membaca pesan (SELECT)
CREATE POLICY "Semua orang dapat membaca buku tamu" 
  ON public.guestbook 
  FOR SELECT 
  USING (true);

-- 4. Beri izin publik untuk mengirim pesan (INSERT)
CREATE POLICY "Semua orang dapat mengirim pesan ke buku tamu" 
  ON public.guestbook 
  FOR INSERT 
  WITH CHECK (true);

-- 5. Aktifkan Realtime Replication untuk tabel guestbook (opsional, agar live update aktif)
ALTER PUBLICATION supabase_realtime ADD TABLE public.guestbook;

-- 6. Insert data awal (opsional)
INSERT INTO public.guestbook (name, role, message) VALUES
  ('Rifqi Pratama', 'Lead Developer, Tim Sangkuriang', 'Implementasi token kadaluarsa 1x pakai di OSIS Voting v2 sangat solid dan berhasil mengeliminasi potensi double-vote di sekolah.'),
  ('Guru Pembimbing RPL', 'Staff Pengajar, SMK Budi Bakti Ciwidey', 'Arsitektur SI REMED v2 menunjukkan pemahaman mendalam tentang keamanan backend, mitigasi IDOR, dan validasi server-side yang matang.'),
  ('Ketua OSIS SMK BBC', 'Mitra Pengguna, E-Voting BBC', 'Sistem e-voting yang dikembangkan sangat membantu transparansi dan kecepatan rekapitulasi suara pemilihan ketua OSIS!');
