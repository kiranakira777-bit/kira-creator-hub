// ===========================================================
// Kira Creator Hub — dashboard.js (Halaman Dashboard)
// ===========================================================

const STORAGE_KEY_COMPLETED = "kiraCompletedModules"; // array of module id

// ---------- Elemen umum ----------
const namaDashboard = document.getElementById("namaDashboard");
const progressPercent = document.getElementById("progressPercent");
const progressFill = document.getElementById("progressFill");

// ---------- Elemen home / course view ----------
const homeView = document.getElementById("homeView");
const courseView = document.getElementById("courseView");
const fbMonetizationCard = document.getElementById("fbMonetizationCard");
const backToDashboard = document.getElementById("backToDashboard");

// ---------- Elemen sidebar ----------
const sidebarList = document.getElementById("sidebarList");
const sidebarProgressFill = document.getElementById("sidebarProgressFill");
const sidebarProgressText = document.getElementById("sidebarProgressText");

// ---------- Elemen konten materi ----------
const courseContent = document.getElementById("courseContent");

let currentModuleIndex = 0;

// =========================================================
// LocalStorage helper — modul yang sudah dibaca
// =========================================================

function getCompletedModules() {
  const raw = localStorage.getItem(STORAGE_KEY_COMPLETED);
  return raw ? JSON.parse(raw) : [];
}

function markModuleCompleted(moduleId) {
  const completed = getCompletedModules();
  if (!completed.includes(moduleId)) {
    completed.push(moduleId);
    localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(completed));
  }
}

// =========================================================
// Progress (dipakai di home view & sidebar)
// =========================================================

function calculateProgressPercent() {
  const totalModules = facebookCourse.length;
  const completedCount = getCompletedModules().length;
  return totalModules === 0 ? 0 : Math.round((completedCount / totalModules) * 100);
}

function refreshProgressUI() {
  const percent = calculateProgressPercent();
  const completedCount = getCompletedModules().length;
  const totalModules = facebookCourse.length;

  // Progress di home view
  progressPercent.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;

  // Progress di sidebar
  sidebarProgressFill.style.width = `${percent}%`;
  sidebarProgressText.textContent = `${completedCount} / ${totalModules} modul`;
}

// =========================================================
// Sidebar
// =========================================================

function renderSidebar() {
  sidebarList.innerHTML = "";
  const completed = getCompletedModules();

  facebookCourse.forEach((module, index) => {
    const isCompleted = completed.includes(module.id);

    const item = document.createElement("li");
    item.className = "sidebar-item";
    item.dataset.index = index;
    item.innerHTML = `
      <span class="sidebar-item-check">${isCompleted ? "✅" : "⬜"}</span>
      <span class="sidebar-item-number">${index + 1}.</span>
      <span>${module.title}</span>
    `;

    item.addEventListener("click", () => openModule(index));
    sidebarList.appendChild(item);
  });

  highlightActiveSidebarItem();
}

function highlightActiveSidebarItem() {
  const items = sidebarList.querySelectorAll(".sidebar-item");
  items.forEach((item) => {
    const isActive = Number(item.dataset.index) === currentModuleIndex;
    item.classList.toggle("active", isActive);
  });
}

// =========================================================
// Konten materi + navigasi sebelumnya/selanjutnya
// =========================================================

function openModule(index) {
  if (index < 0 || index >= facebookCourse.length) return;

  currentModuleIndex = index;
  const module = facebookCourse[index];

  // Modul yang dibuka otomatis dianggap "selesai dibaca"
  markModuleCompleted(module.id);

  renderModuleContent(module);
  refreshProgressUI();
  renderSidebar(); // re-render agar checkmark & item aktif ikut update

  // Scroll konten ke atas setiap ganti modul
  courseContent.scrollTop = 0;
}

function renderModuleContent(module) {
  const isFirst = currentModuleIndex === 0;
  const isLast = currentModuleIndex === facebookCourse.length - 1;

  courseContent.innerHTML = `
    <div class="module-fade">
      <h2 class="module-title">${module.title}</h2>
      <p class="module-meta">📖 Estimasi baca: ${module.readingTime}</p>
      <div class="module-body">${module.content}</div>

      <div class="module-nav">
        <button id="prevModuleBtn" class="nav-btn nav-btn-prev" ${isFirst ? "disabled" : ""}>
          ← Sebelumnya
        </button>
        <button id="nextModuleBtn" class="nav-btn nav-btn-next" ${isLast ? "disabled" : ""}>
          Selanjutnya →
        </button>
      </div>
    </div>
  `;

  document.getElementById("prevModuleBtn").addEventListener("click", () => {
    openModule(currentModuleIndex - 1);
  });

  document.getElementById("nextModuleBtn").addEventListener("click", () => {
    openModule(currentModuleIndex + 1);
  });
}

// =========================================================
// Berpindah antara Home View <-> Course View
// =========================================================

function showCourseView() {
  homeView.classList.add("hidden");
  courseView.classList.remove("hidden");
  openModule(currentModuleIndex);
}

function showHomeView() {
  courseView.classList.add("hidden");
  homeView.classList.remove("hidden");
  refreshProgressUI();
}

// =========================================================
// Inisialisasi
// =========================================================

function loadNama() {
  const nama = localStorage.getItem("kiraNama") || "Creator";
  namaDashboard.textContent = nama;
}

fbMonetizationCard.addEventListener("click", showCourseView);
backToDashboard.addEventListener("click", showHomeView);

loadNama();
refreshProgressUI();
