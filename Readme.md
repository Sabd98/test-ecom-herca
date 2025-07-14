1. Buka link : https://github.com/Sabd98/test-ecom-herca
2. Kemudian unduh repository atau git clone repo diatas
3. Buka IDE masing-masing (VSCode,sublime,dll) 
4. Redirect ke folder backend dahulu untuk menyalakan server. 
5. Install package dependency: npm install|npm i | bun i | yarn install| yarn add 
6. Kemudian buat database di postgre, konfigurasi isi data sesuai dengan isi .env dibawah ini:
DB_USER=namauser
DB_PASSWORD=passwordanda
DB_NAME=db_commisions
DB_HOST=localhost
7. Jalankan migrasi dengan ketik ‘npx/bunx sequelize-cli db:migrate’ bagi yang ada command url sequelize-cli.
8. Jalankan seeder data dengan ketik ‘npx/bunx sequelize-cli db:seed:all.
9. Kemudian jalankan server dengan ketik npm run dev | bun run dev | npm start | bun start 
10. Jika sudah lihat info port jalan dimana, query inisiasi, dan ‘Database Synced’ di log server, berarti server berhasil dijalankan dan sudah connect database postgre.
11. Jika ingin test api langsung, import file 'commision-api.postman_collection.json' ke postman/thunderlient.
12. Untuk frontend redirect ke folder frontend
13. Install package dengan cara seperti nomor 5.
14. Build aplikasi jika ingin lebih cepat prosesnya dengan dengan npm run build | bun run build | yarn run build (opsional) 
15. Run dengan cara no.9
16. Website berhasil dijalankan, Untuk dokumentasi lebih lengkap bisa cek folder Sabda Avicenna - Dokumentasi Technical Test Herca Fullstack.pdf
17. Alternatif running frontend, langsung akses webhosting saya di: https://ecom-payment-weld.vercel.app/
Jadi tinggal inisiasi server di lokal dari cara 1 sampai 10.
