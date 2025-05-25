document.addEventListener('DOMContentLoaded', function() {
    // Dropdown menu functionality
    const dropdownToggle = document.querySelector('.dropdown .dropbtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const dropdownSections = document.querySelectorAll('.dropdown-section-title');

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            event.stopPropagation(); // Prevent event from bubbling up to document
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.opacity = '1';
                dropdownMenu.style.visibility = 'visible';
            } else {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                // Reset all dropdown section contents when main dropdown closes
                dropdownSections.forEach(title => {
                    title.nextElementSibling.classList.remove('show');
                    title.querySelector('.toggle-icon').textContent = '+';
                    title.classList.remove('active');
                });
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!dropdownMenu.contains(event.target) && !dropdownToggle.contains(event.target)) {
                dropdownMenu.style.display = 'none';
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                // Reset all dropdown section contents when main dropdown closes
                dropdownSections.forEach(title => {
                    title.nextElementSibling.classList.remove('show');
                    title.querySelector('.toggle-icon').textContent = '+';
                    title.classList.remove('active');
                });
            }
        });
    }

    // Toggle dropdown sections for mobile
    dropdownSections.forEach(title => {
        title.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const toggleIcon = this.querySelector('.toggle-icon');

            // Close other open sections
            dropdownSections.forEach(otherTitle => {
                if (otherTitle !== this && otherTitle.classList.contains('active')) {
                    otherTitle.nextElementSibling.classList.remove('show');
                    otherTitle.querySelector('.toggle-icon').textContent = '+';
                    otherTitle.classList.remove('active');
                }
            });

            // Toggle current section
            content.classList.toggle('show');
            this.classList.toggle('active');
            if (content.classList.contains('show')) {
                toggleIcon.textContent = '\u2715'; // Change to X
            } else {
                toggleIcon.textContent = '+';
            }
        });
    });


    // Search box toggle functionality for mobile
    const searchToggleBtn = document.querySelector('.search-toggle-btn');
    const searchBox = document.getElementById('searchBox');

    if (searchToggleBtn && searchBox) {
        searchToggleBtn.addEventListener('click', function() {
            searchBox.classList.toggle('active');
        });

        // Close search box when clicking outside (if active)
        document.addEventListener('click', function(event) {
            if (!searchBox.contains(event.target) && !searchToggleBtn.contains(event.target)) {
                searchBox.classList.remove('active');
            }
        });

        // Prevent closing when clicking inside search box
        searchBox.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }

    // Smooth scroll for quick navigation links
    document.querySelectorAll('.quick-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của link

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate offset considering fixed header and quick-links
                const headerOffset = document.querySelector('header').offsetHeight || 0;
                const quickLinksOffset = document.querySelector('.quick-links') ? document.querySelector('.quick-links').offsetHeight : 0;
                const totalOffset = headerOffset + quickLinksOffset;

                window.scrollTo({
                    top: targetElement.offsetTop - totalOffset - 20, // Add a little extra padding
                    behavior: 'smooth'
                });
            }

            // Close dropdown menu and search box if open
            if (dropdownMenu && dropdownMenu.style.display === "block") {
                dropdownMenu.style.display = "none";
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                dropdownSections.forEach(title => {
                    title.nextElementSibling.classList.remove('show');
                    title.querySelector('.toggle-icon').textContent = '+';
                    title.classList.remove('active');
                });
            }
            if (searchBox && searchBox.classList.contains('active')) {
                searchBox.classList.remove('active');
            }
        });
    });

    // Carousel functionality for all .movie-carousel-section elements
    document.querySelectorAll('.movie-carousel-section').forEach(section => {
        const movieCardWrapper = section.querySelector('.movie-card-wrapper');
        const leftArrow = section.querySelector('.left-arrow');
        const rightArrow = section.querySelector('.right-arrow');

        if (movieCardWrapper && leftArrow && rightArrow) {
            // Adjust scrollAmount based on movie card width + gap (200px + 20px = 220px per card)
            // Or calculate dynamically:
            const firstCard = movieCardWrapper.querySelector('.movie-card');
            const scrollAmount = firstCard ? firstCard.offsetWidth + 20 : 220; // 200px (width) + 20px (gap)

            leftArrow.addEventListener('click', () => {
                movieCardWrapper.scrollBy({
                    left: -scrollAmount * 3, // Scroll by 3 cards at a time
                    behavior: 'smooth'
                });
            });

            rightArrow.addEventListener('click', () => {
                movieCardWrapper.scrollBy({
                    left: scrollAmount * 3, // Scroll by 3 cards at a time
                    behavior: 'smooth'
                });
            });

            // Optional: Hide/show arrows based on scroll position
            const checkScrollArrows = () => {
                const canScrollLeft = movieCardWrapper.scrollLeft > 0;
                const canScrollRight = movieCardWrapper.scrollLeft + movieCardWrapper.clientWidth < movieCardWrapper.scrollWidth - 1; // Subtract 1 for floating point precision

                leftArrow.style.display = canScrollLeft ? 'flex' : 'none';
                rightArrow.style.display = canScrollRight ? 'flex' : 'none';
            };

            // Initial check and re-check on scroll/resize
            movieCardWrapper.addEventListener('scroll', checkScrollArrows);
            window.addEventListener('resize', checkScrollArrows);
            checkScrollArrows(); // Initial call
        }
    });
});
                                        
