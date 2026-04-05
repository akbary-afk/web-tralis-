const quizData = [
  {
    question: "Apa definisi integritas dalam organisasi?",
    options: {
      A: "Kemampuan mencari uang",
      B: "Kesesuaian antara nilai yang dianut dengan tindakan nyata",
      C: "Jumlah anggota organisasi",
      D: "Ukuran gedung kantor",
    },
    answer: "B",
  },
  {
    question: "Apa kepanjangan dari NU?",
    options: {
      A: "Nusa Utama",
      B: "Nahdlatul Ulama",
      C: "Negara Umat",
      D: "Nasional Unified",
    },
    answer: "B",
  },
  {
    question: "Prinsip yang dipegang oleh NU adalah?",
    options: {
      A: "Pembaruan penuh",
      B: "Ahlussunnah wal Jamaah",
      C: "Modernisasi total",
      D: "Reformasi radikal",
    },
    answer: "B",
  },
  {
    question: "NU dikenal mempertahankan apa dalam Islam?",
    options: {
      A: "Tradisi barat",
      B: "Tradisi lokal Indonesia",
      C: "Hanya ajaran Quran",
      D: "Ajaran modern saja",
    },
    answer: "B",
  },
  {
    question: "Fokus utama Muhammadiyah adalah?",
    options: {
      A: "Menjaga tradisi saja",
      B: "Pembaruan & pemurnian Islam",
      C: "Kegiatan hiburan",
      D: "Perdagangan internasional",
    },
    answer: "B",
  },
  {
    question:
      "Bidang apa yang dikembangkan Muhammadiyah untuk integrasi sosial?",
    options: {
      A: "Hanya bisnis",
      B: "Pendidikan, sekolah, rumah sakit, sosial",
      C: "Hanya olahraga",
      D: "Hanya hiburan musik",
    },
    answer: "B",
  },
  {
    question: "Apa itu integrasi sosial?",
    options: {
      A: "Perpecahan masyarakat",
      B: "Menyatukan perbedaan menjadi kesatuan harmonis",
      C: "Keterpisahan budaya",
      D: "Dominasi satu kelompok",
    },
    answer: "B",
  },
  {
    question: "Perbedaan NU dan Muhammadiyah lebih pada?",
    options: {
      A: "Tujuan akhir",
      B: "Cara dan pendekatan menjalankan organisasi",
      C: "Ajaran Islam yang dipelajari",
      D: "Jumlah kekayaan organisasi",
    },
    answer: "B",
  },
  {
    question: "Peran NU dalam masyarakat adalah?",
    options: {
      A: "Hanya mengajar agama",
      B: "Menjaga tradisi, penengah konflik, menjaga persatuan",
      C: "Hanya mengumpulkan dana",
      D: "Hanya mengurus acara peribadatan",
    },
    answer: "B",
  },
  {
    question: "Bagaimana Muhammadiyah berkontribusi pada integrasi sosial?",
    options: {
      A: "Dengan menolak perbedaan",
      B: "Melalui pendidikan profesional dan pelayanan sosial",
      C: "Dengan memihak satu kelompok",
      D: "Dengan menghindari masyarakat umum",
    },
    answer: "B",
  },
  {
    question:
      "Perbedaan antara NU dan Muhammadiyah seharusnya dipandang sebagai?",
    options: {
      A: "Sumber perpecahan",
      B: "Kekuatan untuk keberagaman harmonis",
      C: "Alasan untuk bermusuhan",
      D: "Kelemahan bersama",
    },
    answer: "B",
  },
  {
    question: "Mengapa integritas sangat penting dalam organisasi?",
    options: {
      A: "Untuk mengumpulkan banyak uang",
      B: "Membangun kepercayaan & menjaga nama baik organisasi",
      C: "Agar anggota tidak keluar",
      D: "Untuk menghindari pajak",
    },
    answer: "B",
  },
  {
    question: "Apa yang menunjukkan integritas NU?",
    options: {
      A: "Memiliki gedung terbesar",
      B: "Konsistensi dalam menjaga tradisi & persatuan masyarakat",
      C: "Memiliki anggota paling banyak",
      D: "Memiliki TV station sendiri",
    },
    answer: "B",
  },
  {
    question: "Integritas Muhammadiyah ditunjukkan melalui?",
    options: {
      A: "Bicara saja tanpa aksi",
      B: "Konsistensi mengembangkan pendidikan & sosial profesional",
      C: "Mengikuti semua tren",
      D: "Mengadakan pesta besar-besaran",
    },
    answer: "B",
  },
  {
    question:
      "Nilai apa yang dapat dipelajari dari NU dan Muhammadiyah untuk generasi muda?",
    options: {
      A: "Hanya belajar agama",
      B: "Nilai integritas untuk lingkungan harmonis & saling menghargai",
      C: "Mengikuti salah satu organisasi saja",
      D: "Memilih organisasi yang memiliki uang terbanyak",
    },
    answer: "B",
  },
];

const quizContainer = document.getElementById("quiz-container");

quizData.forEach((q, index) => {
  let html = `<div class="question">
      <h3>${index + 1}. ${q.question}</h3>`;

  Object.keys(q.options).forEach((key) => {
    html += `
      <label class="option-label">
        <input type="radio" name="q${index}" value="${key}">
        <span><strong>${key}.</strong> ${q.options[key]}</span>
      </label><br>`;
  });

  html += `</div>`;
  quizContainer.innerHTML += html;
});

function submitQuiz() {
  let score = 0;

  quizData.forEach((q, index) => {
    const answer = document.querySelector(`input[name="q${index}"]:checked`);
    if (answer && answer.value === q.answer) {
      score++;
    }
  });

  const resultDiv = document.getElementById("result");
  const percentage = Math.round((score / quizData.length) * 100);

  let rank = "";
  if (percentage >= 80) {
    rank = "🏆 EXCELLENT - Pemahaman sangat baik!";
  } else if (percentage >= 60) {
    rank = "🥈 GOOD - Pemahaman cukup baik!";
  } else if (percentage >= 40) {
    rank = "📚 FAIR - Perlu belajar lebih banyak";
  } else {
    rank = "☕ NEED IMPROVEMENT - Belajar lebih giat ya!";
  }

  resultDiv.innerHTML = `
    <div class="result-box">
      <h2>Skor Kamu</h2>
      <p class="score">${score} / ${quizData.length}</p>
      <p class="percentage">(${percentage}%)</p>
      <p class="rank">${rank}</p>
    </div>
  `;

  document.getElementById("submit-btn").style.display = "none";
}
