<script>
document.addEventListener("DOMContentLoaded", function () {

    /* ===========================
       1. OPTIONAL: Slideshow helper
       =========================== */

    function changeSlide(slideIndex) {
        const slides = document.querySelectorAll('.slide');
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === slideIndex) {
                slide.classList.add('active');
            }
        });
    }

    window.changeSlide = changeSlide; // expose if needed



    /* ===========================================
       2. Dropdown toggles for abstracts + arrows
       =========================================== */

    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const parentItem = toggle.closest('.research-item, .research-item2');
            if (!parentItem) return;

            const abstract = parentItem.querySelector('.abstract');
            const arrow = parentItem.querySelector('.arrow2');

            const isOpen = parentItem.classList.contains('open');

            if (isOpen) {
                parentItem.classList.remove('open');
                if (abstract) {
                    abstract.style.visibility = 'hidden';
                    abstract.style.opacity = '0';
                }
                if (arrow) {
                    arrow.classList.remove('open');
                }
            } else {
                parentItem.classList.add('open');
                if (abstract) {
                    abstract.style.visibility = 'visible';
                    abstract.style.opacity = '1';
                }
                if (arrow) {
                    arrow.classList.add('open');
                }
            }
        });
    });



    /* ==================================
       3. "Sleepy research" show / hide
       ================================== */

    const sleepyButton = document.getElementById('show-sleepy');
    const sleepySection = document.getElementById('sleepy-research');

    if (sleepyButton && sleepySection) {
        sleepyButton.addEventListener('click', function () {
            const isHidden = sleepySection.style.display === 'none' || sleepySection.style.display === '';
            if (isHidden) {
                sleepySection.style.display = 'block';
                sleepyButton.textContent = 'Hide Sleepy Research 🐑';
            } else {
                sleepySection.style.display = 'none';
                sleepyButton.textContent = 'Show Sleepy Research 💤';
            }
        });
    }



    /* ==========================
       4. 🌑 DARK MODE TOGGLE
       ========================== */

    const themeToggleBtn = document.getElementById('theme-toggle');

    function updateDarkModeLabel(isDark) {
        if (!themeToggleBtn) return;
        if (isDark) {
            themeToggleBtn.innerHTML = '☀️ Light Mode';
            themeToggleBtn.setAttribute('aria-pressed', 'true');
        } else {
            themeToggleBtn.innerHTML = '🌙 Night';
            themeToggleBtn.setAttribute('aria-pressed', 'false');
        }
    }

    // Load stored theme
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
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