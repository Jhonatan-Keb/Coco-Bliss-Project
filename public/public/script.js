const hamburgerBtn = document.getElementById("hamburger-btn");
const sideMenu = document.getElementById("side-menu");
const menuOverlay = document.getElementById("menu-overlay");
const closeMenuBtn = document.getElementById("close-menu");
const themeToggle = document.getElementById("theme-toggle");
const aboutBtn = document.getElementById("about-btn");
const modalOverlay = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");

function openMenu() {
  sideMenu.classList.add("active");
  menuOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  sideMenu.classList.remove("active");
  menuOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    if (themeToggle) themeToggle.checked = true;
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    if (themeToggle) themeToggle.checked = false;
  }
}

function detectSystemTheme() {
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

function loadSavedTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") {
    applyTheme(saved);
  } else {
    applyTheme(detectSystemTheme());
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
}

function showModal() {
  modalOverlay.classList.add("active");
  closeMenu();
  document.body.style.overflow = "hidden";
}

function hideModal() {
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

function openIngredientModal(id) {
  const modal = document.getElementById(id);
  modal.classList.add("active");

  // Si es el modal del video, reinicia el video y lo reproduce
  if (id === "modal-video") {
    const video = modal.querySelector("video");
    if (video) {
      video.currentTime = 0;
      video.play().catch(error => {
        console.log("Autoplay bloqueado:", error);
      });
    }
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  modal.classList.remove("active");

  // Si es el modal del video, pausa el video
  if (id === "modal-video") {
    const video = modal.querySelector("video");
    if (video) {
      video.pause();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadSavedTheme();
  hamburgerBtn.addEventListener("click", openMenu);
  closeMenuBtn.addEventListener("click", closeMenu);
  menuOverlay.addEventListener("click", closeMenu);
  themeToggle.addEventListener("change", toggleTheme);
  aboutBtn.addEventListener("click", showModal);
  modalClose.addEventListener("click", hideModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) hideModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
      hideModal();
    }
  });
});