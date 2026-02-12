<script>
document.addEventListener("DOMContentLoaded", function () {

  /* ===========================
     1) OPTIONAL: Slideshow helper
     =========================== */
  function changeSlide(slideIndex) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === slideIndex);
    });
  }
  window.changeSlide = changeSlide;


  /* ===========================================
     2) Abstract toggles (NEW HTML: .abstract-toggle)
     =========================================== */
  const abstractToggles = document.querySelectorAll('.abstract-toggle');

  abstractToggles.forEach(btn => {
    btn.addEventListener('click', function () {
      const paper = btn.closest('.paper');
      if (!paper) return;

      const abstract = paper.querySelector('.abstract');
      if (!abstract) return;

      const isHidden = abstract.hasAttribute('hidden');

      if (isHidden) {
        abstract.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
        paper.classList.add('open');
      } else {
        abstract.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
        paper.classList.remove('open');
      }
    });
  });


  /* ==================================
     3) "Sleepy research" show / hide
     (NEW HTML uses hidden attribute)
     ================================== */
  const sleepyButton = document.getElementById('show-sleepy');
  const sleepySection = document.getElementById('sleepy-research');

  if (sleepyButton && sleepySection) {
    sleepyButton.addEventListener('click', function () {
      const isHidden = sleepySection.hasAttribute('hidden');

      if (isHidden) {
        sleepySection.removeAttribute('hidden');
        sleepyButton.textContent = 'Hide Sleepy Research 🐑';
      } else {
        sleepySection.setAttribute('hidden', '');
        sleepyButton.textContent = 'Show Sleepy Research 💤';
      }
    });
  }


  /* ==========================
     4) 🌑 DARK MODE TOGGLE
     ========================== */
  const themeToggleBtn = document.getElementById('theme-toggle');

  function updateDarkModeLabel(isDark) {
    if (!themeToggleBtn) return;
    if (isDark) {
      themeToggleBtn.innerHTML = '☀️ Light';
      themeToggleBtn.setAttribute('aria-pressed', 'true');
    } else {
      themeToggleBtn.innerHTML = '🌙 Night';
      themeToggleBtn.setAttribute('aria-pressed', 'false');
    }
  }

  // Load stored theme
  const savedTheme = localStorage.getItem('theme');
  const startDark = savedTheme === 'dark';

  if (startDark) {
    document.body.classList.add('dark-mode');
    updateDarkModeLabel(true);
  } else {
    document.body.classList.remove('dark-mode');
    updateDarkModeLabel(false);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      const turningDark = !document.body.classList.contains('dark-mode');

      if (turningDark) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }

      updateDarkModeLabel(turningDark);
    });
  }

});
</script>