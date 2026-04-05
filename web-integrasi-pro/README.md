# web-integrasi-pro

Project Flask sederhana dengan struktur folder rapi untuk platform integrasi sosial.

## Jalankan Lokal

PowerShell:

```powershell
cd web-integrasi-pro
py -m venv .venv
.\\.venv\\Scripts\\Activate.ps1
python -m pip install -r requirements.txt
python app.py
```

Buka `http://127.0.0.1:5000`.

## Deploy ke Vercel

1. **Push ke GitHub**:

   ```bash
   git add .
   git commit -m "Update for Vercel deployment"
   git push origin main
   ```

2. **Deploy ke Vercel**:
   - Kunjungi [vercel.com](https://vercel.com)
   - Import project dari GitHub
   - Vercel akan otomatis mendeteksi konfigurasi dari `vercel.json`
   - Deploy akan berjalan secara otomatis

3. **Konfigurasi Environment Variables** (opsional):
   - SECRET_KEY: Untuk session security

## Catatan

- Route yang tersedia: `/`, `/materi`, `/video`, `/quiz`, `/chat`
- Fitur chat menggunakan REST API (bukan Socket.IO untuk kompatibilitas Vercel)
- File `database.db` saat ini belum dipakai
- Chat messages disimpan dalam memory (hilang saat restart)
