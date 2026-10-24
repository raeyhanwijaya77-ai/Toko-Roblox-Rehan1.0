# Toko Akun Rehan v1.0

Stack: Next.js 15, React 19, Neon Postgres, Framer Motion, QRIS Pakasir, deploy GitHub + Vercel.

Isi di Vercel (Environment Variables), semua opsional kecuali database:
- DATABASE_URL (otomatis dari Neon)
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SITE_URL (login Google)
- GMAIL_USER, GMAIL_APP_PASSWORD (OTP email dan lupa password lewat email)
- BLOB_READ_WRITE_TOKEN (opsional, foto tetap bisa disimpan tanpa Blob)

Slug dan API Key Pakasir diisi dari Admin, menu Pembayaran. Webhook: https://DOMAIN/api/webhook
Login admin: username admin_rehan atau Gmail admin. Ganti password di Admin, menu Pengaturan.
