// ===========================================================
// Kira Creator Hub — script.js (Halaman Login)
// ===========================================================

const namaInput = document.getElementById("namaInput");
const modeSelect = document.getElementById("modeSelect");
const submitBtn = document.getElementById("submitBtn");
const loginForm = document.getElementById("loginForm");

// Aktifkan tombol "Masuk" hanya jika nama tidak kosong
function updateSubmitState() {
  submitBtn.disabled = namaInput.value.trim().length === 0;
}

namaInput.addEventListener("input", updateSubmitState);

// Saat form disubmit: simpan data ke LocalStorage lalu redirect
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const nama = namaInput.value.trim();
  if (nama.length === 0) return;

  localStorage.setItem("kiraNama", nama);
  localStorage.setItem("kiraProfessionalMode", modeSelect.value);

  window.location.href = "unlock.html";
});

// Pastikan state tombol benar saat halaman pertama kali dimuat
updateSubmitState();
