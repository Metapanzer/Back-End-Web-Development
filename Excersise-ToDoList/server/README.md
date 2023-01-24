1. bikin folder baru untuk backend ex. my-api
2. buka terminal ketik "npm init" untuk create package.json
3. install express lewat terminal "npm install express"
4. install cors jika dibutuhkan, nantinya menyambungkan backend ke frontend "npm i cors"
5. buat file index.js, routers, dan controllers di dalam folder my-api
6. dalam folder routers dan controllers masing-masing buat 1 file index.js
7. jika menggunakan database mysql, install mysql dependencies "npm i mysql2"
8. buat folder connection pada folder my-api berisi file conn.js (isi dan keterangan lihat pada file di github)
9. buat business logic di folder controller ex. toDoControllers.js (isi dan keterangan lihat pada file di github)
10. import dan export controller yang telah dibuat di index.js dalam folder controller (isi dan keterangan lihat pada file di github)
11. buat file router dalam folder router ex. toDoRouters.js (isi dan keterangan lihat pada file di github)
12. import dan export router yang telah dibuat di index.js dalam folder router (isi dan keterangan lihat pada file di github)
13. buat set up pada file index.js utama yang dibuat pada step ke 5 (isi dan keterangan lihat pada file di github)
14. jangan lupa buat database dan table yang diperlukan di mysql workbench.
15. jika seluruh step sudah selesai dibuat, jalankan server melalui terminal dengan command "nodemon start" dan server siap di test melalui postman.
