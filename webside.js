document.addEventListener("DOMContentLoaded", function () {

    // JavaScript to handle image slideshow functionality
    function changeSlide(slideIndex) {
        let slides = document.querySelectorAll('.slide');
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === slideIndex) {
                slide.classList.add('active');
            }
        });
    }

    // Handle dropdown toggle for abstract visibility
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            // Find the closest research item
            const parentItem = toggle.closest('.research-item, .research-item2');
            const abstract = parentItem.querySelector('.abstract');
            const arrow = parentItem.querySelector('.arrow2');
            
            // Toggle abstract visibility and arrow rotation
            if (parentItem.classList.contains('open')) {
                parentItem.classList.remove('open');
                abstract.style.visibility = 'hidden';
                abstract.style.opacity = '0';
                arrow.classList.remove('open');
            } else {
                parentItem.classList.add('open');
                abstract.style.visibility = 'visible';
                abstract.style.opacity = '1';
                arrow.classList.add('open');
            }
        });
    });

});

