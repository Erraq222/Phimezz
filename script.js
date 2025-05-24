// Function để bật/tắt dropdown menu chính
function toggleDropdown() {
    const dropdownMenu = document.getElementById("dropdownMenu");
    // Nếu menu đang hiển thị (block), thì ẩn đi (none), ngược lại thì hiển thị (block)
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";

    // Đảm bảo thanh tìm kiếm ẩn đi khi mở menu
    const searchBox = document.getElementById("searchBox");
    if (searchBox.style.display === "flex") {
        searchBox.style.display = "none";
    }
}

// Function để bật/tắt thanh tìm kiếm
function toggleSearch() {
    const searchBox = document.getElementById("searchBox");
    // Nếu thanh tìm kiếm đang hiển thị (flex), thì ẩn đi (none), ngược lại thì hiển thị (flex)
    searchBox.style.display = searchBox.style.display === "flex" ? "none" : "flex";

    // Đảm bảo dropdown menu ẩn đi khi mở thanh tìm kiếm
    const dropdownMenu = document.getElementById("dropdownMenu");
    if (dropdownMenu.style.display === "block") {
        dropdownMenu.style.display = "none";
        // Đóng tất cả các mục con khi đóng menu chính
        const allContents = document.querySelectorAll('.dropdown-section-content');
        allContents.forEach(content => {
            content.classList.remove('show');
            content.previousElementSibling.querySelector('.toggle-icon').textContent = '+';
            content.previousElementSibling.classList.remove('active');
        });
    }
}

// Function để bật/tắt bộ lọc nâng cao (cho trang tinhcam.html)
function toggleFilters() {
    const filterSection = document.getElementById("filterSection");
    // Nếu bộ lọc đang hiển thị (flex), thì ẩn đi (none), ngược lại thì hiển thị (flex)
    filterSection.style.display = filterSection.style.display === "flex" ? "none" : "flex";
}

// Function xử lý khi áp dụng bộ lọc (hiện tại chỉ là alert)
function applyFilter() {
    // Lấy giá trị từ các ô chọn (select box)
    const country = document.querySelector('.filters select:nth-of-type(1)').value;
    const type = document.querySelector('.filters select:nth-of-type(2)').value;
    const genre = document.querySelector('.filters select:nth-of-type(3)').value;
    const year = document.querySelector('.filters select:nth-of-type(4)').value;
    const sort = document.querySelector('.filters select:nth-of-type(5)').value;

    let filterMessage = "Đã áp dụng bộ lọc:\n";
    filterMessage += `Quốc gia: ${country || 'Tất cả'}\n`;
    filterMessage += `Loại phim: ${type || 'Tất cả'}\n`;
    filterMessage += `Thể loại: ${genre || 'Tất cả'}\n`;
    filterMessage += `Năm sản xuất: ${year || 'Tất cả'}\n`;
    filterMessage += `Sắp xếp: ${sort || 'Mặc định'}\n`;

    alert(filterMessage + "\n(Tính năng demo, cần thêm code backend để lọc thực tế)");
}

// Function để bật/tắt các mục trong dropdown menu
function toggleDropdownSection(element) {
    const sectionContent = element.nextElementSibling; // Lấy phần tử nội dung ngay sau tiêu đề
    const toggleIcon = element.querySelector('.toggle-icon'); // Lấy icon dấu cộng

    if (sectionContent.classList.contains('show')) {
        sectionContent.classList.remove('show');
        toggleIcon.textContent = '+'; // Đổi lại thành dấu cộng
        element.classList.remove('active');
    } else {
        // Đóng tất cả các section khác trước khi mở section hiện tại
        const allContents = document.querySelectorAll('.dropdown-section-content');
        allContents.forEach(content => {
            if (content !== sectionContent && content.classList.contains('show')) {
                content.classList.remove('show');
                content.previousElementSibling.querySelector('.toggle-icon').textContent = '+';
                content.previousElementSibling.classList.remove('active');
            }
        });

        sectionContent.classList.add('show');
        toggleIcon.textContent = 'x'; // Đổi thành dấu X khi mở
        element.classList.add('active');
    }
}


// Ẩn dropdown và search box khi click ra ngoài
window.onclick = function(event) {
    // Kiểm tra nếu click không phải vào menu icon, search icon, dropdown hoặc search box
    if (
        !event.target.closest(".menu-icon") &&
        !event.target.closest(".search-icon") &&
        !event.target.closest("#dropdownMenu") &&
        !event.target.closest("#searchBox")
    ) {
        const dropdown = document.getElementById("dropdownMenu");
        const search = document.getElementById("searchBox");
        if (dropdown && dropdown.style.display === "block") {
            dropdown.style.display = "none";
            // Đóng tất cả các mục con khi đóng menu chính
            const allContents = document.querySelectorAll('.dropdown-section-content');
            allContents.forEach(content => {
                content.classList.remove('show');
                content.previousElementSibling.querySelector('.toggle-icon').textContent = '+';
                content.previousElementSibling.classList.remove('active');
            });
        }
        if (search && search.style.display === "flex") {
            search.style.display = "none";
        }
    }
    // Giữ bộ lọc mở nếu click bên trong bộ lọc hoặc nút toggle của nó
    if (
        !event.target.closest(".filter-toggle") &&
        !event.target.closest("#filterSection")
    ) {
        const filters = document.getElementById("filterSection");
        if (filters && filters.style.display === "flex") {
            filters.style.display = "none";
        }
    }
};

// *** Thêm sự kiện click cho site-title để ẩn menu và search box ***
document.addEventListener('DOMContentLoaded', () => {
    const siteTitle = document.querySelector('.site-title');
    if (siteTitle) {
        siteTitle.addEventListener('click', (event) => {
            // Ngăn chặn hành vi mặc định của link để JavaScript xử lý
            event.preventDefault();

            // Ẩn dropdown menu nếu đang mở
            const dropdown = document.getElementById("dropdownMenu");
            if (dropdown && dropdown.style.display === "block") {
                dropdown.style.display = "none";
                // Đóng tất cả các mục con khi đóng menu chính
                const allContents = document.querySelectorAll('.dropdown-section-content');
                allContents.forEach(content => {
                    content.classList.remove('show');
                    content.previousElementSibling.querySelector('.toggle-icon').textContent = '+';
                    content.previousElementSibling.classList.remove('active');
                });
            }

            // Ẩn thanh tìm kiếm nếu đang mở
            const search = document.getElementById("searchBox");
            if (search && search.style.display === "flex") {
                search.style.display = "none";
            }

            // Chuyển về trang chủ sau khi ẩn các thành phần
            window.location.href = 'index.html';
        });
    }
});

// *** NEW: Function để chuyển đổi tab bảng xếp hạng ***
function showRanking(period) {
    // Ẩn tất cả các nội dung bảng xếp hạng
    document.querySelectorAll('.ranking-content').forEach(content => {
        content.classList.remove('active');
    });

    // Bỏ trạng thái active của tất cả các nút tab
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });

    // Hiển thị nội dung tương ứng với tab được chọn
    document.getElementById(`${period}Ranking`).classList.add('active');

    // Thêm trạng thái active cho nút tab được chọn
    event.currentTarget.classList.add('active');
}

// NEW: Carousel functionality for Banner
let slideIndex = 0;
let carouselInterval;

function showSlides() {
    const slides = document.querySelectorAll('.banner-item');
    const dots = document.querySelectorAll('.dot');

    if (!slides.length || !dots.length) return; // Đảm bảo các phần tử tồn tại

    // Ẩn tất cả các slide
    slides.forEach(slide => slide.classList.remove('active'));
    // Bỏ trạng thái active của tất cả các dot
    dots.forEach(dot => dot.classList.remove('active'));

    // Reset slideIndex nếu vượt quá giới hạn
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }

    // Hiển thị slide hiện tại và dot tương ứng
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');

    // Cập nhật vị trí của carousel-inner để tạo hiệu ứng trượt
    const carouselInner = document.getElementById('bannerCarouselInner');
    if (carouselInner) {
        carouselInner.style.transform = `translateX(-${slideIndex * 100}%)`;
    }
}

function moveCarousel(n) {
    slideIndex += n;
    showSlides();
    resetInterval();
}

function currentSlide(n) {
    slideIndex = n;
    showSlides();
    resetInterval();
}

function startCarousel() {
    carouselInterval = setInterval(() => {
        slideIndex++;
        showSlides();
    }, 5000); // Tự động chuyển slide mỗi 5 giây
}

function resetInterval() {
    clearInterval(carouselInterval);
    startCarousel();
}

// Bắt đầu carousel khi DOM đã tải xong
document.addEventListener('DOMContentLoaded', () => {
    showSlides();
    startCarousel();

    // Thêm sự kiện cho nút tìm kiếm để chuyển hướng sang trang search_results.html
    const searchButton = document.querySelector('#searchBox button');
    const searchInput = document.querySelector('#searchBox input[type="text"]');

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value;
            if (query) {
                window.location.href = `search_results.html?q=${encodeURIComponent(query)}`;
            } else {
                alert('Vui lòng nhập từ khóa tìm kiếm.');
            }
        });

        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                searchButton.click(); // Kích hoạt nút tìm kiếm khi nhấn Enter
            }
        });
    }

    // Thêm sự kiện click cho các nút "Xem ngay" trong banner
    const watchNowButtons = document.querySelectorAll('.watch-now-button');
    watchNowButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Chức năng "Xem ngay" chưa được triển khai. Vui lòng thử lại sau!');
        });
    });

    // Thêm sự kiện click cho các nút "Xem chi tiết" trong movie-item overlay
    const viewDetailsButtons = document.querySelectorAll('.view-details-button');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Ngăn chặn sự kiện click lan ra movie-item cha
            event.stopPropagation();
            alert('Chức năng "Xem chi tiết" chưa được triển khai. Vui lòng thử lại sau!');
        });
    });

    // Thêm sự kiện click cho toàn bộ movie-item (nếu không phải là nút view-details-button)
    const movieItems = document.querySelectorAll('.movie-item');
    movieItems.forEach(item => {
        item.addEventListener('click', (event) => {
            // Nếu click không phải vào nút view-details-button, thì xử lý tổng quát
            if (!event.target.classList.contains('view-details-button')) {
                 alert('Chức năng click vào phim để xem chi tiết chưa được triển khai.');
            }
        });
    });
});
    
