// ===========================================================
// Kira Creator Hub — dashboard.js (Halaman Dashboard)
// ===========================================================

const namaDashboard = document.getElementById("namaDashboard");
const progressPercent = document.getElementById("progressPercent");
const progressFill = document.getElementById("progressFill");

// Tampilkan nama dari LocalStorage
function loadNama() {
  const nama = localStorage.getItem("kiraNama") || "Creator";
  namaDashboard.textContent = nama;
}

// Tampilkan progress belajar (saat ini selalu mulai dari 0%,
// disiapkan agar mudah dikembangkan menjadi progress dinamis nanti)
function loadProgress() {
  const progressValue = Number(localStorage.getItem("kiraProgress")) || 0;
  progressPercent.textContent = `${progressValue}%`;
  progressFill.style.width = `${progressValue}%`;
}

loadNama();
loadProgress();
