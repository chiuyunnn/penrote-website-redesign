// Back to top button functionality
document.addEventListener('DOMContentLoaded', function () {
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) { // 當滾動超過 50 像素時顯示按鈕
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function (event) {
        event.preventDefault(); // 防止跳轉
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 平滑滾動
        });
    });
});

// Navbar color change on scroll
document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('header');
    const fontcolor = document.getElementById('nav');
    const search = document.getElementById('search');
    const logoimg = document.getElementById('logoimg');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
            fontcolor.classList.add('scrolled');
            search.classList.add('scrolled');
            logoimg.src = 'img/penrote-logo-white.png';
        } else {
            navbar.classList.remove('scrolled');
            fontcolor.classList.remove('scrolled');
            search.classList.remove('scrolled');
            logoimg.src = 'img/penrote-logo-red.png';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('input');
    const searchButton = document.querySelector('.search-btn');

    // 監聽輸入框的 Enter 鍵事件
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    // 監聽搜尋按鈕的點擊事件
    searchButton.addEventListener('click', () => {
        performSearch();
    });

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // 導向商品頁並傳遞搜尋查詢參數
            window.location.href = `product.html?search=${encodeURIComponent(query)}`;
        }
    }
});