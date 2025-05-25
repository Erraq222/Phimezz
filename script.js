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
});
