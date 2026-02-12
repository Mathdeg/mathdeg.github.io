<script>
document.addEventListener("DOMContentLoaded", function () {

  /* ===========================
     1) ELEMENTS
     =========================== */
  const header = document.getElementById("site-header");
  const tree = document.getElementById("tree");
  const themeBtn = document.getElementById("theme-toggle");

  const sleepyButton = document.getElementById("show-sleepy");
  const sleepySection = document.getElementById("sleepy-research");

  /* ===========================
     2) TREE ANIMATION (on load, on hover, when back to top)
     =========================== */
  const leaves = tree ? tree.querySelectorAll(".leaf") : [];

  function triggerTreeAnimation() {
    if (!tree) return;

    // reset
    tree.classList.remove("animate-on-load", "berries-visible");
    leaves.forEach((leaf) => { leaf.style.transform = "scale(0)"; });

    // force reflow
    void tree.offsetWidth;

    // replay
    tree.classList.add("animate-on-load");

    setTimeout(() => {
      leaves.forEach((leaf, i) => {
        setTimeout(() => { leaf.style.transform = "scale(1)"; }, i * 160);
      });
      setTimeout(() => tree.classList.add("berries-visible"), leaves.length * 160 + 260);
    }, 80);
  }

  triggerTreeAnimation();
  if (tree) tree.addEventListener("mouseenter", triggerTreeAnimation);

  /* ===========================
     3) HEADER BEHAVIOR ON SCROLL
        - on scroll down: keep only menu
        - back to top: show full header + replay tree
     =========================== */
  let lastScrolledState = null;
  let lastAtTopState = null;

  function updateHeaderOnScroll() {
    const y = window.scrollY || 0;
    const scrolled = y > 30;
    const atTop = y === 0;

    if (header && scrolled !== lastScrolledState) {
      header.classList.toggle("is-scrolled", scrolled);
      lastScrolledState = scrolled;
    }

    if (atTop !== lastAtTopState) {
      if (atTop) triggerTreeAnimation();
      lastAtTopState = atTop;
    }
  }

  /* ===========================
     4) MOBILE ONLY: HIDE THEME ICON ON SCROLL
     =========================== */
  function updateThemeVisibilityMobile() {
    const isMobile = window.innerWidth <= 860;
    const scrolled = (window.scrollY || 0) > 30;

    // only on mobile + only when scrolled
    if (isMobile && scrolled) {
      document.body.classList.add("hide-theme");
    } else {
      document.body.classList.remove("hide-theme");
    }
  }

  /* ===========================
     5) ABSTRACT TOGGLES
        Works for normal abstracts and the deforestation full-width abstract
     =========================== */
  document.querySelectorAll(".abstract-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const paper = btn.closest(".paper");
      if (!paper) return;

      // prefer the full-width abstract if it exists; else normal
      const abs = paper.querySelector(".abstract");
      if (!abs) return;

      const willOpen = abs.hasAttribute("hidden");

      if (willOpen) {
        abs.removeAttribute("hidden");
        btn.setAttribute("aria-expanded", "true");
        paper.classList.add("open");
      } else {
        abs.setAttribute("hidden", "");
        btn.setAttribute("aria-expanded", "false");
        paper.classList.remove("open");
      }
    });
  });

  /* ===========================
     6) SLEEPY RESEARCH TOGGLE
     =========================== */
  if (sleepyButton && sleepySection) {
    sleepyButton.addEventListener("click", () => {
      const hidden = sleepySection.hasAttribute("hidden");
      if (hidden) {
        sleepySection.removeAttribute("hidden");
        sleepyButton.textContent = "Hide Sleepy Research 🐑";
      } else {
        sleepySection.setAttribute("hidden", "");
        sleepyButton.textContent = "Show Sleepy Research 💤";
      }
    });
  }

  /* ===========================
     7) THEME (DARK/LIGHT) — ICON ONLY
     =========================== */
  function applyTheme(mode) {
    const isDark = mode === "dark";
    document.body.classList.toggle("dark-mode", isDark);
    localStorage.setItem("theme", mode);

    if (themeBtn) {
      themeBtn.textContent = isDark ? "☀️" : "🌙";
      themeBtn.setAttribute("aria-pressed", String(isDark));
    }
  }

  const savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme === "dark" ? "dark" : "light");

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const turningDark = !document.body.classList.contains("dark-mode");
      applyTheme(turningDark ? "dark" : "light");
    });
  }

  /* ===========================
     8) SCROLL/RESIZE LISTENERS
     =========================== */
  function onScroll() {
    updateHeaderOnScroll();
    updateThemeVisibilityMobile();
  }

  function onResize() {
    updateThemeVisibilityMobile();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);

  // initial state
  onScroll();
});
</script>