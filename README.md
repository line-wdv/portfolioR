# Portofolio Rivaldi

Next.js 15 + TypeScript + Tailwind + Framer Motion + GSAP (ScrollTrigger) + Lenis.

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000

Untuk build production:

```bash
npm run build
npm start
```

> Catatan: build sempat gagal di sandbox saat pengerjaan karena sandbox itu tidak
> punya akses ke fonts.googleapis.com. Ini bukan bug — di komputer kamu atau di
> Vercel (yang punya akses internet penuh) `next/font/google` akan berhasil fetch
> font seperti biasa. `npx tsc --noEmit` sudah dijalankan dan bersih dari error.

## WAJIB diganti sebelum publish

Semua ditandai `[PLACEHOLDER]` di `lib/data.ts`, plus:

1. **Foto profil** — `public/portrait-placeholder.svg` → ganti dengan foto asli
   (JPG/PNG), lalu update path di `components/hero/Hero.tsx` (`src="/portrait-placeholder.svg"`).
2. **Sertifikat** — `lib/data.ts` bagian `certificates` masih berisi satu slot
   kosong. Ganti dengan data sertifikat asli kamu (judul, penerbit, tanggal, dan
   path ke scan/foto asli di `public/certificates/`). Jangan pernah diisi gambar
   buatan — bagian ini secara sengaja dibuat kosong sampai kamu punya filenya.
3. **Screenshot proyek** — `public/projects/*.svg` masih placeholder abu-abu,
   ganti dengan screenshot asli tiap proyek.
4. **Kontak** — email, link GitHub/LinkedIn/Instagram, dan endpoint Formspree
   di `contactContent` (`lib/data.ts`) masih dummy.
5. **Domain** di `metadataBase` (`app/layout.tsx`) untuk SEO/Open Graph.

## Kenapa desainnya begini

Dibangun sebagai "lembar kerja teknis" (blueprint/spec-sheet), bukan tema
"sistem operasi booting" yang generik — lihat penjelasan lengkap di chat.
Palet: graphite `#0D0C0A` + aksen tunggal `#FF5B2E` (bukan cyan). Tipografi:
Space Grotesk (display) / Inter (body) / JetBrains Mono (label teknis saja).

## Struktur

```
app/            layout, page, global styles
components/     satu folder per section (intro, hero, about, journey, dst)
lib/data.ts     SEMUA konten teks — edit di sini, bukan di JSX
public/         aset gambar (placeholder ditandai jelas)
```
