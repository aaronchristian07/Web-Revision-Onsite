# Konteks untuk AI — Rapiin & Percantik Frontend ESkrim (Fase 1: Tampilan Dulu, Fetch Data Nanti)

Ini konteks buat AI/asisten coding yang bakal bantu kerjain frontend. Backend (Go, monolith-ish, 2 service: `auth-service` + `ice-service`) statusnya udah hampir selesai dikerjain terpisah — **jangan sentuh folder `Backend/`**, fokus di `frontend/` aja.

## Tentang project

"ESkrim" — aplikasi jual-beli es krim online, dibikin buat tugas onsite kampus (bukan production beneran, tapi dinilai pakai rubrik resmi). Ada 2 role: **customer** (browse & beli es krim) dan **admin** (kelola varian es krim & transaksi). Rubrik penilaian & analisis lengkap kondisi project ada di `RUBRIK-DAN-RENCANA.md` di root repo ini — baca itu dulu kalau perlu konteks lebih detail soal fitur apa aja yang dinilai.

## Fase sekarang: TAMPILAN dulu, belum nyambungin data

Prioritasnya urutannya:
1. **Sekarang**: benerin & percantik semua tampilan, struktur komponen, dan navigasi. Data boleh masih dummy/hardcoded/mock — yang penting *bentuknya* udah bener (loading state, empty state, struktur list/grid, modal, pagination control, dst semua ada wadahnya).
2. **Nanti** (fase berikutnya, jangan dikerjain dulu): baru sambungin ke API asli (fetch, axios call, dst) begitu backend-nya udah pasti siap dan dikonfirmasi user.

Jadi kalau ada bagian yang butuh data (misal daftar es krim, riwayat transaksi), **isi dulu pakai data contoh/statis yang masuk akal** (bukan API call beneran), tapi strukturnya harus udah siap buat gampang diganti ke data asli nanti (misal: taruh data contoh di satu variabel/array di atas komponen, bukan di-hardcode manual di JSX berulang-ulang seperti sekarang).

## Stack (jangan diganti tanpa alasan kuat)

- Vite + React 19 + TypeScript
- React Router v7 (`createBrowserRouter`, pola nested route + `<Outlet/>`)
- Zustand buat state global (`lib/authStore.ts`)
- Axios buat API layer (`api/`) — tapi lihat poin fase di atas, belum dipakai aktif dulu
- Tailwind CSS v4 (lewat `@tailwindcss/vite`, bukan `tailwind.config.js` — di v4 konfigurasi custom theme ditulis di `src/index.css` pakai blok `@theme`)
- `@iconify/react` buat icon

## Kondisi kode sekarang yang perlu diketahui

Ini bukan project rapi yang tinggal dipoles dikit — banyak yang harus dibenerin strukturnya:

1. **`src/index.css` isinya cuma `@import "tailwindcss";`** — nggak ada `@theme` sama sekali. Akibatnya class-class kayak `bg-primary`, `text-primary`, `shadow-glow`, `glass` yang dipakai di kode (terutama di `components/Layout.tsx`) **nggak menghasilkan style apapun** karena token-nya nggak pernah didefinisikan. Ini salah satu hal utama yang bikin tampilan sekarang kelihatan "kosong"/polos padahal className-nya udah kayak ada desainnya.
2. **Duplikasi berat**: `pages/Dashboard.tsx`, `pages/Cart.tsx`, `pages/History.tsx` masing-masing nulis ulang sendiri sidebar + header yang PERSIS SAMA, padahal `components/Layout.tsx` udah nyediain itu dan udah dipasang sebagai pembungkus di `router.tsx`. Ini harus di-refactor: halaman-halaman itu cukup isi konten utamanya aja, biar `Layout` yang render sidebar/header sekali.
3. **Sidebar belum benar-benar navigasi**: klik menu di `Layout.tsx` cuma ganti `useState` lokal (warna tab doang), bukan pindah halaman beneran. Harus diganti pakai `<Link>` atau `useNavigate()` dari React Router, dan warna "active" tab-nya ikutin route yang lagi aktif (`useLocation()`), bukan state manual.
4. **Belum ada Footer sama sekali** — perlu komponen baru, muncul di semua halaman kecuali halaman auth (login/register).
5. **Kartu es krim** di Dashboard/Cart/History pakai efek 3D-flip on hover (perspective + `transform-3d` + `backface-hidden` + `group-hover`) — efek ini oke dan boleh dipertahankan konsepnya, tapi ada bug kecil: class gradient `from-350` dan `to-350` itu **bukan class Tailwind yang valid** (nggak ada warna bernama "350"), jadi gradiennya nggak keluar sesuai niatnya. Perlu diganti ke nama warna+shade yang valid.
6. **Halaman yang isinya masih 8 kartu identik "Caramel Pecan" copy-paste** (Dashboard, Cart, History) perlu dirombak jadi struktur yang benar sesuai fungsinya masing-masing (lihat daftar di bawah), bukan sekadar kartu es krim yang sama di mana-mana.
7. **Ada beberapa halaman yang rubriknya minta tapi belum ada route/filenya sama sekali**: Order Page (beda dari History — ini soal riwayat TRANSAKSI, bukan galeri es krim), Admin Dashboard, Ice Cream Management (form admin bikin varian es krim + upload gambar), Transaction Management (tabel transaksi buat admin, dengan filter). Ini semua perlu dibikin halaman/route baru (boleh masih pakai data dummy dulu sesuai fase sekarang).
8. **Profile page**: form edit (username, email) ada di JSX tapi `value`/`onChange`/`onClick`-nya di-comment out semua — perlu diaktifkan lagi (isinya masih boleh nyambung ke state lokal dummy dulu, belum ke API).
9. **Login page**: input password pakai `type="text"`, harusnya `type="password"`.
10. **`ProtectedRoute.tsx`** cuma `return <Outlet/>` tanpa cek apapun — nanti pas fase auth-nya diaktifkan perlu bener-bener ngecek status login, tapi untuk fase tampilan sekarang boleh dibiarin dulu atau dikasih pola pengecekan yang gampang di-toggle nanti.

## Yang diminta user buat fase ini

- **Simple tapi rapi/cakep** — bukan diminta jadi flashy/ramai. Fokus ke: hierarki visual yang jelas, spacing konsisten, komponen yang reusable (nggak ada copy-paste markup lagi), dan warna yang KONSISTEN (definisikan token warnanya di `index.css` pakai `@theme`, jangan pakai nama warna yang nggak pernah didefinisikan).
- Boleh pertahankan identitas yang udah ada kalau emang bagus (misal efek flip-card, nuansa ungu/pink yang udah muncul di beberapa tempat kayak `#7747ff`), tapi rapiin supaya konsisten dipakai di semua halaman, bukan cuma nempel di sana-sini.
- Perbaiki struktur komponen: pisahin bagian yang berulang (kartu es krim, sidebar, header, badge status, dst) jadi komponen sendiri di `components/`, biar halaman-halaman tinggal pakai, bukan tulis ulang.
- Semua halaman yang diminta rubrik (lihat `RUBRIK-DAN-RENCANA.md` bagian "Customer Dashboard", "Order Page", "Cart Page", "Profile Page", "Admin Dashboard", "Ice Cream Management", "Transaction Management") perlu ADA strukturnya secara visual — search bar, loading skeleton, pagination control, modal detail, tabel dengan filter, dst — walau datanya masih dummy.

## Yang JANGAN dilakukan dulu di fase ini

- Jangan bikin/betulin pemanggilan API asli (`axios.get/post` ke backend) — biarin data pakai contoh statis dulu.
- Jangan ubah apapun di folder `Backend/`.
- Jangan ubah `router.tsx` struktur besar tanpa perlu — cukup tambahin route baru yang emang belum ada, dan rapiin yang duplikatif.
- Jangan ganti stack (misalnya nambahin library UI kayak Material UI/Ant Design) — soal ini pernah ditegasin casemaker: nggak boleh pakai UI library, cuma boleh Tailwind/SCSS/SASS.
