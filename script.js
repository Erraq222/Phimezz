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
        
