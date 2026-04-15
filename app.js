const express = require("express");
const path = require("path");

function createApp() {
  const app = express();

  // Serve semua file statis (CSS/JS/gambar) dari folder "static"
  app.use("/static", express.static(path.join(__dirname, "static")));

  // Kompatibilitas: kalau ada file gambar di folder "img"
  app.use("/img", express.static(path.join(__dirname, "img")));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  // Ini contoh halaman produk UMKM
  app.get("/produk", (req, res) => {
    res.json({
      item: "Tralis Jendela Minimalis",
      harga: "Rp 500.000",
      status: "Tersedia",
    });
  });

  app.use((req, res) => {
    res.status(404).send("404 - Halaman tidak ditemukan");
  });

  return app;
}

module.exports = { createApp };

