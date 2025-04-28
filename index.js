// server.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Gunakan CORS middleware
app.use(cors());

// Konfigurasi static file serving
app.use(express.static(__dirname)); // Ini akan melayani file statis dari direktori yang sama dengan server.js
// Atau lebih spesifik:
app.use('/public', (req, res, next) => {
  if (req.headers.referer) {
    // Kalau file public dipanggil dari dalam website (ada referer), izinkan
    express.static(path.join(__dirname, 'public'))(req, res, next);
  } else {
    // Kalau langsung akses public/xxx di browser, kasih 404
    res.status(404).send('404 Not Found');
  }
});

// Route untuk index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'payment.html'));
});
app.get('/pterodactyl', (req, res) => {
  res.sendFile(path.join(__dirname, 'pterodactyl.html'));
});

app.get('/virtualprivateserver', (req, res) => {
  res.sendFile(path.join(__dirname, 'produkvps.html'));
});

// Di file app.js atau server.js
// 404 handler
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});