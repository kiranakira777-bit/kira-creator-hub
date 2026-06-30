// ===========================================================
// Kira Creator Hub — unlock.js (Halaman Buka Akses)
// ===========================================================

const FACEBOOK_URL = "https://www.facebook.com/share/18oU8n3zNE/?mibextid=wwXIfr";
const COUNTDOWN_SECONDS = 15;
const RING_CIRCUMFERENCE = 326.7; // 2 * PI * radius(52), harus sama dengan CSS

const namaGreeting = document.getElementById("namaGreeting");
const followBtn = document.getElementById("followBtn");
const countdownRing = document.getElementById("countdownRing");
const countdownNumber = document.getElementById("countdownNumber");
const ringProgress = document.getElementById("ringProgress");
const waitingText = document.getElementById("waitingText");
const thanksBlock = document.getElementById("thanksBlock");
const enterBtn = document.getElementById("enterBtn");

let countdownInterval = null;

// Tampilkan nama dari LocalStorage
function loadNama() {
  const nama = localStorage.getItem("kiraNama") || "Creator";
  namaGreeting.textContent = nama;
}

// Mulai countdown setelah tombol follow ditekan
function startCountdown() {
  let secondsLeft = COUNTDOWN_SECONDS;

  followBtn.disabled = true;
  countdownRing.classList.remove("hidden");
  waitingText.classList.remove("hidden");
  countdownNumber.textContent = secondsLeft;

  countdownInterval = setInterval(() => {
    secondsLeft -= 1;
    countdownNumber.textContent = secondsLeft;

    // Update cincin progress (visual)
    const progressRatio = secondsLeft / COUNTDOWN_SECONDS;
    ringProgress.style.strokeDashoffset = RING_CIRCUMFERENCE * (1 - progressRatio);

    if (secondsLeft <= 0) {
      clearInterval(countdownInterval);
      finishCountdown();
    }
  }, 1000);
}

// Setelah countdown selesai: tampilkan ucapan terima kasih + tombol hijau
function finishCountdown() {
  countdownRing.classList.add("hidden");
  waitingText.classList.add("hidden");
  thanksBlock.classList.remove("hidden");
}

// Event: klik tombol follow
followBtn.addEventListener("click", () => {
  window.open(FACEBOOK_URL, "_blank");
  startCountdown();
});

// Event: klik tombol masuk ke dashboard
enterBtn.addEventListener("click", () => {
  window.location.href = "dashboard.html";
});

loadNama();
